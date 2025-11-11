<?php

namespace Modules\Freshdesk\Services;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Modules\Customer\Models\Customer;
use Modules\Harvest\Models\IntegrationMapping;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\Role;
use Modules\Ticket\Models\Message;
use Modules\Ticket\Models\Ticket;

class FreshdeskSyncService
{
    private Organisation $organisation;

    private string $freshdeskDomain;

    private string $freshdeskApiKey;

    private string $baseUrl;

    private array $statistics = [
        'tickets' => 0,
        'messages' => 0,
        'users' => 0,
    ];

    private ?\Closure $outputCallback = null;

    public function __construct(Organisation $organisation, string $freshdeskDomain, string $freshdeskApiKey)
    {
        $this->organisation = $organisation;
        $this->freshdeskDomain = $freshdeskDomain;
        $this->freshdeskApiKey = $freshdeskApiKey;
        $this->baseUrl = "https://{$freshdeskDomain}/api/v2";
    }

    /**
     * Set a callback for output messages (e.g., from console command)
     */
    public function setOutputCallback(\Closure $callback): void
    {
        $this->outputCallback = $callback;
    }

    /**
     * Output a message using the callback or do nothing
     */
    private function output(string $message, string $type = 'info'): void
    {
        if ($this->outputCallback) {
            ($this->outputCallback)($message, $type);
        }
    }

    /**
     * Run the sync for all customers with Freshdesk company IDs
     */
    public function run(?Carbon $since = null): array
    {
        $since = $since ?? Carbon::now()->subHours(24);

        $this->output("Starting Freshdesk sync for organisation: {$this->organisation->name}");
        $this->output("Syncing data updated since: {$since->toDateTimeString()}");

        // Get all customers with freshdesk_company_id
        $customers = Customer::where('organisation_id', $this->organisation->id)
            ->whereHas('settings', function ($query) {
                $query->where('module', 'Freshdesk')
                    ->where('key', 'freshdesk_company_id')
                    ->whereNotNull('value');
            })
            ->with('settings')
            ->get();

        if ($customers->isEmpty()) {
            $this->output('No customers with Freshdesk company IDs found.');

            return $this->statistics;
        }

        foreach ($customers as $customer) {
            $companyId = $customer->settings()
                ->where('module', 'Freshdesk')
                ->where('key', 'freshdesk_company_id')
                ->first()?->value;

            if ($companyId) {
                $this->output("\nSyncing Freshdesk company {$companyId} for customer: {$customer->name}");
                $this->syncTickets($customer, $companyId, $since);
            }
        }

        return $this->statistics;
    }

    /**
     * Sync tickets for a specific customer
     */
    private function syncTickets(Customer $customer, string $companyId, Carbon $since): void
    {
        $page = 1;
        $hasMore = true;

        while ($hasMore && $page <= 300) { // Freshdesk max 300 pages
            try {
                $response = $this->makeApiRequest('/tickets', [
                    'company_id' => $companyId,
                    'updated_since' => $since->toIso8601String(),
                    'include' => 'description,requester',
                    'page' => $page,
                    'per_page' => 100,
                ]);

                if (empty($response)) {
                    break;
                }

                foreach ($response as $freshdeskTicket) {
                    $this->processTicket($freshdeskTicket, $customer);
                }

                // Check if there are more pages
                $hasMore = count($response) === 100;
                $page++;
            } catch (\Exception $e) {
                $this->output("Failed to sync tickets for company {$companyId}: {$e->getMessage()}", 'error');
                break;
            }
        }

        $this->output("Synced {$this->statistics['tickets']} tickets for {$customer->name}");
    }

    /**
     * Process a single Freshdesk ticket
     */
    private function processTicket(array $freshdeskTicket, Customer $customer): void
    {
        $freshdeskTicketId = (string) $freshdeskTicket['id'];

        // Check if ticket already exists
        $existingTicketId = IntegrationMapping::lookup(
            'freshdesk',
            $freshdeskTicketId,
            'Ticket',
            $this->organisation->id
        );

        // Map requester to user
        $requester = $freshdeskTicket['requester'] ?? null;
        $requesterId = null;

        if ($requester && isset($requester['email'])) {
            // Clean the name in case it's in "Name <email>" format
            $requesterName = isset($requester['name']) ? $this->extractNameFromEmailString($requester['name']) : null;
            $requesterUser = $this->findOrCreateUserByEmail($requester['email'], $requesterName, $customer);
            if ($requesterUser) {
                $requesterId = $requesterUser->id;

                // Create mapping for Freshdesk contact
                if (isset($requester['id'])) {
                    IntegrationMapping::syncMapping(
                        'freshdesk',
                        (string) $requester['id'],
                        'User',
                        $requesterUser->id,
                        $this->organisation->id
                    );
                }
            }
        }

        // Map responder to user (agent)
        $responderId = null;
        if (isset($freshdeskTicket['responder_id'])) {
            $responderUser = $this->findAgentByFreshdeskId((string) $freshdeskTicket['responder_id']);
            if ($responderUser) {
                $responderId = $responderUser->id;
            }
        }

        // Map Freshdesk status to internal status
        $status = $this->mapStatus($freshdeskTicket['status']);

        // Map Freshdesk priority to internal priority
        $priority = $this->mapPriority($freshdeskTicket['priority']);

        // Create or update ticket
        $ticketData = [
            'organisation_id' => $this->organisation->id,
            'customer_id' => $customer->id,
            'user_id' => $requesterId,
            'title' => $freshdeskTicket['subject'] ?? 'No Subject',
            'message' => $freshdeskTicket['description_text'] ?? $freshdeskTicket['description'] ?? '',
            'priority' => $priority,
            'status' => $status,
            'is_resolved' => in_array($freshdeskTicket['status'], [4, 5]), // 4=resolved, 5=closed
            'assigned_to' => $responderId,
            'metadata' => [
                'freshdesk' => $freshdeskTicket,
            ],
        ];

        // Parse Freshdesk timestamps
        $createdAt = isset($freshdeskTicket['created_at'])
            ? Carbon::parse($freshdeskTicket['created_at'])
            : now();
        $updatedAt = isset($freshdeskTicket['updated_at'])
            ? Carbon::parse($freshdeskTicket['updated_at'])
            : now();

        if ($existingTicketId) {
            $ticket = Ticket::find($existingTicketId);
            if ($ticket) {
                $ticket->fill($ticketData);
                $ticket->created_at = $createdAt;
                $ticket->updated_at = $updatedAt;
                $ticket->save();
            }
        } else {
            $ticket = new Ticket($ticketData);
            $ticket->created_at = $createdAt;
            $ticket->updated_at = $updatedAt;
            $ticket->save();
        }

        // Create mapping
        IntegrationMapping::syncMapping(
            'freshdesk',
            $freshdeskTicketId,
            'Ticket',
            $ticket->id,
            $this->organisation->id
        );

        $this->statistics['tickets']++;

        // Sync conversations for this ticket
        $this->syncConversations($freshdeskTicketId, $ticket->id);
    }

    /**
     * Sync conversations for a ticket
     */
    private function syncConversations(string $freshdeskTicketId, string $internalTicketId): void
    {
        try {
            // Get the ticket to access its customer
            $ticket = Ticket::find($internalTicketId);
            if (!$ticket) {
                $this->output("Ticket {$internalTicketId} not found for conversation sync", 'warn');
                return;
            }

            $conversations = $this->makeApiRequest("/tickets/{$freshdeskTicketId}/conversations");

            foreach ($conversations as $conversation) {
                $conversationId = (string) $conversation['id'];

                // Check if conversation already exists
                if (IntegrationMapping::exists('freshdesk', $conversationId, 'Message', $this->organisation->id)) {
                    continue;
                }

                // Find or create user - try IntegrationMapping first, then by email, then create
                $userId = null;

                // Try to find via Freshdesk user_id mapping
                if (isset($conversation['user_id'])) {
                    $userId = IntegrationMapping::lookup(
                        'freshdesk',
                        (string) $conversation['user_id'],
                        'User',
                        $this->organisation->id
                    );
                }

                // If not found via mapping, try by email or create
                if (!$userId && isset($conversation['from_email'])) {
                    $user = User::whereHas('organisations', function ($query) {
                        $query->where('organisations.id', $this->organisation->id);
                    })->where('email', $conversation['from_email'])->first();

                    if (!$user) {
                        // Extract name from conversation or email
                        $name = null;
                        if (isset($conversation['user_name'])) {
                            // Clean the user_name in case it's in "Name <email>" format
                            $name = $this->extractNameFromEmailString($conversation['user_name']);
                        } elseif (isset($conversation['from_email'])) {
                            $name = explode('@', $conversation['from_email'])[0];
                        }

                        // Create the user and link to customer
                        $user = $this->findOrCreateUserByEmail(
                            $conversation['from_email'],
                            $name,
                            $ticket->customer
                        );

                        // Create mapping if we have a Freshdesk user_id
                        if ($user && isset($conversation['user_id'])) {
                            IntegrationMapping::syncMapping(
                                'freshdesk',
                                (string) $conversation['user_id'],
                                'User',
                                $user->id,
                                $this->organisation->id
                            );
                        }
                    }

                    if ($user) {
                        $userId = $user->id;
                    }
                }

                // Skip message if still no user found (shouldn't happen now)
                if (!$userId) {
                    $email = $conversation['from_email'] ?? 'unknown';
                    $this->output("Skipping conversation {$conversationId} - unable to create user for email: {$email}", 'warn');
                    continue;
                }

                // Get message content - prefer body_text, but clean body if needed
                $messageContent = '';
                if (!empty($conversation['body_text'])) {
                    $messageContent = $conversation['body_text'];
                } elseif (!empty($conversation['body'])) {
                    // Body is HTML - strip tags and decode entities
                    $messageContent = html_entity_decode(strip_tags($conversation['body']), ENT_QUOTES | ENT_HTML5, 'UTF-8');
                }

                // Parse Freshdesk timestamps
                $createdAt = isset($conversation['created_at'])
                    ? Carbon::parse($conversation['created_at'])
                    : now();
                $updatedAt = isset($conversation['updated_at'])
                    ? Carbon::parse($conversation['updated_at'])
                    : now();

                // Create message with explicit timestamps
                $message = new Message([
                    'ticket_id' => $internalTicketId,
                    'user_id' => $userId,
                    'message' => $messageContent,
                    'is_private' => $conversation['private'] ?? false,
                ]);
                $message->created_at = $createdAt;
                $message->updated_at = $updatedAt;
                $message->save();

                // Create mapping
                IntegrationMapping::syncMapping(
                    'freshdesk',
                    $conversationId,
                    'Message',
                    $message->id,
                    $this->organisation->id
                );

                $this->statistics['messages']++;
            }
        } catch (\Exception $e) {
            $this->output("Failed to sync conversations for ticket {$freshdeskTicketId}: {$e->getMessage()}", 'warn');
        }
    }

    /**
     * Extract name from email-like strings (e.g., "John Doe <john@example.com>" -> "John Doe")
     */
    private function extractNameFromEmailString(?string $nameOrEmail): ?string
    {
        if (!$nameOrEmail) {
            return null;
        }

        // Check if it's in "Name <email>" format
        if (preg_match('/^(.+?)\s*<[^>]+>$/', $nameOrEmail, $matches)) {
            return trim($matches[1]);
        }

        // Check if it's just an email address
        if (filter_var($nameOrEmail, FILTER_VALIDATE_EMAIL)) {
            return explode('@', $nameOrEmail)[0];
        }

        // Return as is if it doesn't match patterns
        return $nameOrEmail;
    }

    /**
     * Find or create a user by email
     */
    private function findOrCreateUserByEmail(string $email, ?string $name, Customer $customer): ?User
    {
        // Try to find existing user by email in the organisation
        $user = User::whereHas('organisations', function ($query) {
            $query->where('organisations.id', $this->organisation->id);
        })->where('email', $email)->first();

        if ($user) {
            // Ensure user is linked to the customer
            if (!$user->customers()->where('customers.id', $customer->id)->exists()) {
                $user->customers()->attach($customer->id);
            }
            return $user;
        }

        // Create new user
        try {
            $user = User::create([
                'name' => $name ?? explode('@', $email)[0],
                'email' => $email,
                'password' => Hash::make(str()->random(32)),
            ]);

            // Attach to organisation
            $user->organisations()->attach($this->organisation->id);

            // Attach to customer
            $user->customers()->attach($customer->id);

            // Assign "User" role if available
            $userRole = Role::where('name', 'User')
                ->where('team_id', $this->organisation->id)
                ->first();

            if ($userRole) {
                setPermissionsTeamId($this->organisation->id);
                $user->assignRole($userRole);
            }

            $this->output("Created new user: {$email} (linked to customer: {$customer->name})");
            $this->statistics['users']++;

            return $user;
        } catch (\Exception $e) {
            $this->output("Failed to create user {$email}: {$e->getMessage()}", 'warn');

            return null;
        }
    }

    /**
     * Find agent by Freshdesk ID (via IntegrationMapping or API)
     */
    private function findAgentByFreshdeskId(string $freshdeskAgentId): ?User
    {
        // Try to find via mapping first
        $userId = IntegrationMapping::lookup(
            'freshdesk',
            $freshdeskAgentId,
            'User',
            $this->organisation->id
        );

        if ($userId) {
            return User::find($userId);
        }

        // Fetch agent details from Freshdesk
        try {
            $agent = $this->makeApiRequest("/agents/{$freshdeskAgentId}");

            if (isset($agent['contact']['email'])) {
                $user = User::whereHas('organisations', function ($query) {
                    $query->where('organisations.id', $this->organisation->id);
                })->where('email', $agent['contact']['email'])->first();

                if ($user) {
                    // Create mapping for future lookups
                    IntegrationMapping::syncMapping(
                        'freshdesk',
                        $freshdeskAgentId,
                        'User',
                        $user->id,
                        $this->organisation->id
                    );

                    return $user;
                }
            }
        } catch (\Exception $e) {
            $this->output("Failed to fetch agent {$freshdeskAgentId}: {$e->getMessage()}", 'warn');
        }

        return null;
    }

    /**
     * Map Freshdesk status to internal status
     */
    private function mapStatus(int $freshdeskStatus): string
    {
        return match ($freshdeskStatus) {
            2 => 'open',
            3 => 'pending',
            4 => 'resolved',
            5 => 'closed',
            default => 'open',
        };
    }

    /**
     * Map Freshdesk priority to internal priority
     */
    private function mapPriority(int $freshdeskPriority): string
    {
        return match ($freshdeskPriority) {
            1 => 'low',
            2 => 'medium',
            3 => 'high',
            4 => 'urgent',
            default => 'low',
        };
    }

    /**
     * Make a request to the Freshdesk API
     */
    private function makeApiRequest(string $endpoint, array $params = []): array
    {
        $response = Http::withBasicAuth($this->freshdeskApiKey, 'X')
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->get($this->baseUrl.$endpoint, $params);

        if (! $response->successful()) {
            if ($response->status() === 429) {
                throw new \Exception('Freshdesk API rate limit exceeded');
            }

            throw new \Exception("Freshdesk API request failed ({$response->status()}): {$response->body()}");
        }

        return $response->json() ?? [];
    }

    /**
     * Get sync statistics
     */
    public function getStatistics(): array
    {
        return $this->statistics;
    }
}
