<?php

namespace Modules\Harvest\Services;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Modules\Customer\Models\Customer;
use Modules\Harvest\Models\IntegrationMapping;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\Role;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\Task;
use Modules\Timesheet\Models\TimeEntry;

class HarvestImportService
{
    private Organisation $organisation;

    private string $harvestAccountId;

    private string $harvestToken;

    private string $baseUrl = 'https://api.harvestapp.com/v2';

    private array $statistics = [
        'users' => 0,
        'tasks' => 0,
        'clients' => 0,
        'projects' => 0,
        'task_assignments' => 0,
        'user_assignments' => 0,
        'time_entries' => 0,
    ];

    private ?\Closure $outputCallback = null;

    public function __construct(Organisation $organisation, string $harvestAccountId, string $harvestToken)
    {
        $this->organisation = $organisation;
        $this->harvestAccountId = $harvestAccountId;
        $this->harvestToken = $harvestToken;
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
     * Run the import with specified options
     */
    public function run(array $options = []): array
    {
        $defaults = [
            'users' => true,
            'tasks' => true,
            'clients' => true,
            'projects' => true,
            'time_entries' => true,
            'time_entries_since' => null, // Carbon instance or null for all
            'create_budget_periods' => true,
        ];

        $options = array_merge($defaults, $options);

        $this->output("Starting Harvest import for organisation: {$this->organisation->name}");

        if ($options['users']) {
            $this->importUsers();
        }

        if ($options['tasks']) {
            $this->importTasks();
        }

        if ($options['clients']) {
            $this->importClients();
        }

        if ($options['projects']) {
            $this->importProjects();
        }

        if ($options['time_entries']) {
            $this->importTimeEntries($options['time_entries_since']);
        }

        return $this->statistics;
    }

    /**
     * Import users from Harvest
     */
    public function importUsers(): void
    {
        $this->output("\nImporting users...");
        $page = 1;
        $hasMore = true;

        // Get the "User" role for this organisation
        $userRole = Role::where('name', 'User')
            ->where('team_id', $this->organisation->id)
            ->first();

        if (! $userRole) {
            $this->output("'User' role not found for this organisation. Users will be imported without roles.", 'warn');
        }

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/users', ['page' => $page, 'per_page' => 100]);

            foreach ($response['users'] as $harvestUser) {
                // Check if mapping already exists
                if (IntegrationMapping::exists('harvest', (string) $harvestUser['id'], 'User', $this->organisation->id)) {
                    continue;
                }

                // Note: We import both active and inactive users because inactive users
                // may still have historical time entries that need to be preserved

                // Try to find existing user by email
                $user = User::where('email', $harvestUser['email'])->first();

                if ($user) {
                    // User exists - attach to organisation if not already
                    $isNewToOrg = ! $user->organisations()->where('organisations.id', $this->organisation->id)->exists();

                    if ($isNewToOrg) {
                        $user->organisations()->attach($this->organisation->id);

                        // Assign "User" role if available
                        if ($userRole) {
                            setPermissionsTeamId($this->organisation->id);
                            $user->assignRole($userRole);
                        }

                        $this->output("Added existing user {$harvestUser['email']} to organisation");
                    } else {
                        $this->output("User {$harvestUser['email']} already in organisation, creating mapping");
                    }
                } else {
                    // Create new user
                    $user = User::create([
                        'name' => trim($harvestUser['first_name'].' '.$harvestUser['last_name']),
                        'email' => $harvestUser['email'],
                        'password' => Hash::make(str()->random(32)),
                    ]);

                    // Attach to organisation
                    $user->organisations()->attach($this->organisation->id);

                    // Assign "User" role if available
                    if ($userRole) {
                        setPermissionsTeamId($this->organisation->id);
                        $user->assignRole($userRole);
                    }

                    $this->output("Created new user {$harvestUser['email']}");
                }

                // Create mapping
                IntegrationMapping::syncMapping(
                    'harvest',
                    (string) $harvestUser['id'],
                    'User',
                    $user->id,
                    $this->organisation->id
                );

                $this->statistics['users']++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->output("Imported {$this->statistics['users']} users");
    }

    /**
     * Import tasks from Harvest
     */
    public function importTasks(): void
    {
        $this->output("\nImporting tasks...");
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/tasks', ['page' => $page, 'per_page' => 100]);

            foreach ($response['tasks'] as $harvestTask) {
                $task = Task::updateOrCreate(
                    [
                        'name' => $harvestTask['name'],
                        'organisation_id' => $this->organisation->id,
                    ],
                    [
                        'billable' => $harvestTask['billable_by_default'],
                        'hourly_rate_override' => $harvestTask['default_hourly_rate'],
                        'is_active' => $harvestTask['is_active'],
                    ]
                );

                IntegrationMapping::syncMapping(
                    'harvest',
                    (string) $harvestTask['id'],
                    'Task',
                    $task->id,
                    $this->organisation->id
                );

                $this->statistics['tasks']++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->output("Imported {$this->statistics['tasks']} tasks");
    }

    /**
     * Import clients from Harvest
     */
    public function importClients(): void
    {
        $this->output("\nImporting clients...");
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/clients', ['page' => $page, 'per_page' => 100]);

            foreach ($response['clients'] as $harvestClient) {
                $customer = Customer::updateOrCreate(
                    [
                        'name' => $harvestClient['name'],
                        'organisation_id' => $this->organisation->id,
                    ],
                    [
                        'status' => $harvestClient['is_active'] ? 1 : 0,
                    ]
                );

                IntegrationMapping::syncMapping(
                    'harvest',
                    (string) $harvestClient['id'],
                    'Customer',
                    $customer->id,
                    $this->organisation->id
                );

                $this->statistics['clients']++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->output("Imported {$this->statistics['clients']} clients");
    }

    /**
     * Import projects from Harvest
     */
    public function importProjects(): void
    {
        $this->output("\nImporting projects...");
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/projects', ['page' => $page, 'per_page' => 100]);

            foreach ($response['projects'] as $harvestProject) {
                // Look up customer by Harvest client ID
                $customerId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestProject['client']['id'],
                    'Customer',
                    $this->organisation->id
                );

                if (! $customerId) {
                    $this->output("Customer not found for Harvest client ID {$harvestProject['client']['id']}, skipping project {$harvestProject['name']}", 'warn');

                    continue;
                }

                // Determine billing type
                $billingType = 'NonBillable';
                if ($harvestProject['is_billable']) {
                    $billingType = $harvestProject['is_fixed_fee'] ? 'FixedFee' : 'Hourly';
                }

                // Determine status
                $status = $harvestProject['is_active'] ? 'Active' : 'Archived';

                // Use starts_on if available, otherwise use created_at
                $startDate = $harvestProject['starts_on'] ?? substr($harvestProject['created_at'], 0, 10);

                $budgetHours = $this->getBudgetHours($harvestProject);
                $budgetAmount = $this->getBudgetAmount($harvestProject);

                $service = Service::updateOrCreate(
                    [
                        'name' => $harvestProject['name'],
                        'customer_id' => $customerId,
                    ],
                    [
                        'organisation_id' => $this->organisation->id,
                        'description' => $harvestProject['notes'],
                        'status' => $status,
                        'billing_type' => $billingType,
                        'budget_period' => 'Monthly',
                        'current_budget_hours' => $budgetHours,
                        'current_budget_amount' => $budgetAmount,
                        'start_date' => $startDate,
                        'end_date' => $harvestProject['ends_on'],
                        'default_hourly_rate' => $harvestProject['hourly_rate'],
                    ]
                );

                IntegrationMapping::syncMapping(
                    'harvest',
                    (string) $harvestProject['id'],
                    'Service',
                    $service->id,
                    $this->organisation->id
                );

                $this->statistics['projects']++;

                // Import task assignments for this project
                $this->importTaskAssignments($harvestProject['id'], $service->id);

                // Import user assignments for this project
                $this->importUserAssignments($harvestProject['id'], $service->id);
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->output("Imported {$this->statistics['projects']} projects with {$this->statistics['task_assignments']} task assignments and {$this->statistics['user_assignments']} user assignments");
    }

    /**
     * Import task assignments for a specific project
     */
    private function importTaskAssignments(int $harvestProjectId, string $serviceId): void
    {
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest("/projects/{$harvestProjectId}/task_assignments", [
                'page' => $page,
                'per_page' => 100,
            ]);

            $taskIds = [];

            foreach ($response['task_assignments'] as $assignment) {
                if (! $assignment['is_active']) {
                    continue;
                }

                // Look up task by Harvest task ID
                $taskId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $assignment['task']['id'],
                    'Task',
                    $this->organisation->id
                );

                if ($taskId) {
                    $taskIds[] = $taskId;
                    $this->statistics['task_assignments']++;
                }
            }

            // Sync tasks to service
            if (! empty($taskIds)) {
                $service = Service::find($serviceId);
                $service->tasks()->syncWithoutDetaching($taskIds);
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }
    }

    /**
     * Import user assignments from Harvest for a specific project
     */
    private function importUserAssignments(int $harvestProjectId, string $serviceId): void
    {
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest("/projects/{$harvestProjectId}/user_assignments", [
                'page' => $page,
                'per_page' => 100,
            ]);

            foreach ($response['user_assignments'] as $assignment) {
                // Only sync active assignments
                if (! $assignment['is_active']) {
                    continue;
                }

                // Look up user by Harvest user ID
                $userId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $assignment['user']['id'],
                    'User',
                    $this->organisation->id
                );

                if (! $userId) {
                    $this->output("User not found for Harvest user ID {$assignment['user']['id']}, skipping user assignment", 'warn');
                    continue;
                }

                // Sync to pivot table with hourly rate and use_default_rates
                $service = Service::find($serviceId);
                $service->users()->syncWithoutDetaching([
                    $userId => [
                        'use_default_rates' => $assignment['use_default_rates'],
                        'hourly_rate' => $assignment['hourly_rate'],
                    ],
                ]);

                $this->statistics['user_assignments']++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }
    }

    /**
     * Import time entries from Harvest
     *
     * @param  Carbon|null  $since  Only import entries from this date forward
     */
    public function importTimeEntries(?Carbon $since = null): void
    {
        $this->output("\nImporting time entries...");
        $page = 1;
        $hasMore = true;

        $params = ['page' => $page, 'per_page' => 100];

        // Add date filter if provided
        if ($since) {
            $params['from'] = $since->format('Y-m-d');
            $this->output("Filtering time entries from {$params['from']} onwards");
        }

        while ($hasMore) {
            $params['page'] = $page;
            $response = $this->makeHarvestRequest('/time_entries', $params);

            foreach ($response['time_entries'] as $harvestEntry) {
                // Skip if already imported
                if (IntegrationMapping::exists('harvest', (string) $harvestEntry['id'], 'TimeEntry', $this->organisation->id)) {
                    continue;
                }

                // Skip running timers
                if ($harvestEntry['is_running']) {
                    continue;
                }

                // Look up service by Harvest project ID
                $serviceId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestEntry['project']['id'],
                    'Service',
                    $this->organisation->id
                );

                if (! $serviceId) {
                    $this->output("Service not found for Harvest project ID {$harvestEntry['project']['id']}, skipping time entry", 'warn');

                    continue;
                }

                // Look up task by Harvest task ID
                $taskId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestEntry['task']['id'],
                    'Task',
                    $this->organisation->id
                );

                if (! $taskId) {
                    $this->output("Task not found for Harvest task ID {$harvestEntry['task']['id']}, skipping time entry", 'warn');

                    continue;
                }

                // Look up customer
                $customerId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestEntry['client']['id'],
                    'Customer',
                    $this->organisation->id
                );

                if (! $customerId) {
                    continue;
                }

                // Look up user by Harvest user ID first, then by email if available
                $userId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestEntry['user']['id'],
                    'User',
                    $this->organisation->id
                );

                $user = null;
                if ($userId) {
                    $user = User::find($userId);
                }

                // If no mapping exists, try to find by email (if available)
                if (! $user && isset($harvestEntry['user']['email'])) {
                    $user = User::whereHas('organisations', function ($query) {
                        $query->where('organisations.id', $this->organisation->id);
                    })->where('email', $harvestEntry['user']['email'])->first();
                }

                if (! $user) {
                    $this->output("User not found for Harvest user ID {$harvestEntry['user']['id']}, skipping time entry", 'warn');

                    continue;
                }

                // Handle external_reference - Harvest API returns it as an object, so JSON encode it
                $externalReference = null;
                if (isset($harvestEntry['external_reference'])) {
                    if (is_array($harvestEntry['external_reference']) || is_object($harvestEntry['external_reference'])) {
                        $externalReference = json_encode($harvestEntry['external_reference']);
                    } else {
                        $externalReference = (string) $harvestEntry['external_reference'];
                    }
                }

                $timeEntry = TimeEntry::create([
                    'organisation_id' => $this->organisation->id,
                    'user_id' => $user->id,
                    'service_id' => $serviceId,
                    'task_id' => $taskId,
                    'customer_id' => $customerId,
                    'date' => $harvestEntry['spent_date'],
                    'duration_hours' => $harvestEntry['hours'],
                    'description' => $harvestEntry['notes'],
                    'billable' => $harvestEntry['billable'],
                    'hourly_rate' => $harvestEntry['hourly_rate'] ?? 0,
                    'approved' => $harvestEntry['is_closed'],
                    'timer_running' => false,
                    'external_reference' => $externalReference,
                ]);

                IntegrationMapping::syncMapping(
                    'harvest',
                    (string) $harvestEntry['id'],
                    'TimeEntry',
                    $timeEntry->id,
                    $this->organisation->id
                );

                $this->statistics['time_entries']++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->output("Imported {$this->statistics['time_entries']} time entries");
    }

    /**
     * Get budget hours from Harvest project data
     */
    private function getBudgetHours(array $project): ?float
    {
        if (! isset($project['budget']) || ! isset($project['budget_by'])) {
            return null;
        }

        // Return budget if it's hour-based
        // Harvest uses: 'project', 'task', 'person' for hour-based budgets
        if (in_array($project['budget_by'], ['project', 'task', 'person', 'project_hours', 'task_hours'])) {
            return $project['budget'];
        }

        return null;
    }

    /**
     * Get budget amount from Harvest project data
     */
    private function getBudgetAmount(array $project): ?float
    {
        // For fixed fee projects, use the fee
        if ($project['is_fixed_fee'] && isset($project['fee'])) {
            return $project['fee'];
        }

        // For cost budget projects
        if (isset($project['budget_by']) && $project['budget_by'] === 'project_cost' && isset($project['cost_budget'])) {
            return $project['cost_budget'];
        }

        return null;
    }

    /**
     * Make a request to the Harvest API
     */
    private function makeHarvestRequest(string $endpoint, array $params = []): array
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->harvestToken}",
            'Harvest-Account-Id' => $this->harvestAccountId,
            'User-Agent' => config('app.name', 'Laravel'),
        ])->get($this->baseUrl.$endpoint, $params);

        if (! $response->successful()) {
            throw new \Exception("Harvest API request failed: {$response->body()}");
        }

        return $response->json();
    }

    /**
     * Get import statistics
     */
    public function getStatistics(): array
    {
        return $this->statistics;
    }
}
