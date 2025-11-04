<?php

namespace Modules\Harvest\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Modules\Customer\Models\Customer;
use Modules\Harvest\Models\IntegrationMapping;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\Role;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\Task;
use Modules\Timesheet\Models\TimeEntry;

class ImportHarvestData extends Command
{
    protected $signature = 'harvest:import-data {organisation_id} {harvest_account_id} {harvest_token}';

    protected $description = 'Import clients, projects, tasks and time entries from Harvest';

    private string $organisationId;

    private string $harvestAccountId;

    private string $harvestToken;

    private string $baseUrl = 'https://api.harvestapp.com/v2';

    private int $usersImported = 0;

    private int $tasksImported = 0;

    private int $clientsImported = 0;

    private int $projectsImported = 0;

    private int $taskAssignmentsCreated = 0;

    private int $timeEntriesImported = 0;

    public function handle(): int
    {
        $this->organisationId = $this->argument('organisation_id');
        $this->harvestAccountId = $this->argument('harvest_account_id');
        $this->harvestToken = $this->argument('harvest_token');

        // Validate organisation exists
        $organisation = Organisation::find($this->organisationId);
        if (! $organisation) {
            $this->error("Organisation with ID {$this->organisationId} not found.");

            return 1;
        }

        $this->info("Starting Harvest import for organisation: {$organisation->name}");

        try {
            $this->importUsers();
            $this->importTasks();
            $this->importClients();
            $this->importProjects();
            $this->importTimeEntries();

            // Create missing budget periods and update hours used
            $this->info("\nCreating/updating budget periods...");
            $this->call('timesheet:create-missing-budget-periods', [
                'organisation_id' => $this->organisationId
            ]);

            $this->info("\n=== Import Complete ===");
            $this->info("Users: {$this->usersImported}");
            $this->info("Tasks: {$this->tasksImported}");
            $this->info("Clients: {$this->clientsImported}");
            $this->info("Projects: {$this->projectsImported}");
            $this->info("Task Assignments: {$this->taskAssignmentsCreated}");
            $this->info("Time Entries: {$this->timeEntriesImported}");

            return 0;
        } catch (\Exception $e) {
            $this->error("Import failed: {$e->getMessage()}");

            return 1;
        }
    }

    private function importUsers(): void
    {
        $this->info("\nImporting users...");
        $page = 1;
        $hasMore = true;

        // Get the "User" role for this organisation
        $userRole = Role::where('name', 'User')
            ->where('team_id', $this->organisationId)
            ->first();

        if (! $userRole) {
            $this->warn("'User' role not found for this organisation. Users will be imported without roles.");
        }

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/users', ['page' => $page, 'per_page' => 100]);

            foreach ($response['users'] as $harvestUser) {
                // Skip inactive users
                if (! $harvestUser['is_active']) {
                    continue;
                }

                // Check if mapping already exists
                if (IntegrationMapping::exists('harvest', (string) $harvestUser['id'], 'User', $this->organisationId)) {
                    continue;
                }

                // Try to find existing user by email
                $user = User::where('email', $harvestUser['email'])->first();

                if ($user) {
                    // User exists - attach to organisation if not already
                    $isNewToOrg = ! $user->organisations()->where('organisations.id', $this->organisationId)->exists();

                    if ($isNewToOrg) {
                        $user->organisations()->attach($this->organisationId);

                        // Assign "User" role if available
                        if ($userRole) {
                            setPermissionsTeamId($this->organisationId);
                            $user->assignRole($userRole);
                        }

                        $this->info("Added existing user {$harvestUser['email']} to organisation");
                    } else {
                        $this->info("User {$harvestUser['email']} already in organisation, creating mapping");
                    }
                } else {
                    // Create new user
                    $user = User::create([
                        'name' => trim($harvestUser['first_name'].' '.$harvestUser['last_name']),
                        'email' => $harvestUser['email'],
                        'password' => Hash::make(str()->random(32)),
                    ]);

                    // Attach to organisation
                    $user->organisations()->attach($this->organisationId);

                    // Assign "User" role if available
                    if ($userRole) {
                        setPermissionsTeamId($this->organisationId);
                        $user->assignRole($userRole);
                    }

                    $this->info("Created new user {$harvestUser['email']}");
                }

                // Create mapping
                IntegrationMapping::syncMapping(
                    'harvest',
                    (string) $harvestUser['id'],
                    'User',
                    $user->id,
                    $this->organisationId
                );

                $this->usersImported++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->info("Imported {$this->usersImported} users");
    }

    private function importTasks(): void
    {
        $this->info("\nImporting tasks...");
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/tasks', ['page' => $page, 'per_page' => 100]);

            foreach ($response['tasks'] as $harvestTask) {
                $task = Task::updateOrCreate(
                    [
                        'name' => $harvestTask['name'],
                        'organisation_id' => $this->organisationId,
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
                    $this->organisationId
                );

                $this->tasksImported++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->info("Imported {$this->tasksImported} tasks");
    }

    private function importClients(): void
    {
        $this->info("\nImporting clients...");
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/clients', ['page' => $page, 'per_page' => 100]);

            foreach ($response['clients'] as $harvestClient) {
                $customer = Customer::updateOrCreate(
                    [
                        'name' => $harvestClient['name'],
                        'organisation_id' => $this->organisationId,
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
                    $this->organisationId
                );

                $this->clientsImported++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->info("Imported {$this->clientsImported} clients");
    }

    private function importProjects(): void
    {
        $this->info("\nImporting projects...");
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
                    $this->organisationId
                );

                if (! $customerId) {
                    $this->warn("Customer not found for Harvest client ID {$harvestProject['client']['id']}, skipping project {$harvestProject['name']}");

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
                        'organisation_id' => $this->organisationId,
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
                    $this->organisationId
                );

                $this->projectsImported++;

                // Import task assignments for this project
                $this->importTaskAssignments($harvestProject['id'], $service->id);
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->info("Imported {$this->projectsImported} projects with {$this->taskAssignmentsCreated} task assignments");
    }

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
                    $this->organisationId
                );

                if ($taskId) {
                    $taskIds[] = $taskId;
                    $this->taskAssignmentsCreated++;
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

    private function importTimeEntries(): void
    {
        $this->info("\nImporting time entries...");
        $page = 1;
        $hasMore = true;

        while ($hasMore) {
            $response = $this->makeHarvestRequest('/time_entries', ['page' => $page, 'per_page' => 100]);

            foreach ($response['time_entries'] as $harvestEntry) {
                // Skip if already imported
                if (IntegrationMapping::exists('harvest', (string) $harvestEntry['id'], 'TimeEntry', $this->organisationId)) {
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
                    $this->organisationId
                );

                if (! $serviceId) {
                    $this->warn("Service not found for Harvest project ID {$harvestEntry['project']['id']}, skipping time entry");

                    continue;
                }

                // Look up task by Harvest task ID
                $taskId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestEntry['task']['id'],
                    'Task',
                    $this->organisationId
                );

                if (! $taskId) {
                    $this->warn("Task not found for Harvest task ID {$harvestEntry['task']['id']}, skipping time entry");

                    continue;
                }

                // Look up customer
                $customerId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestEntry['client']['id'],
                    'Customer',
                    $this->organisationId
                );

                if (! $customerId) {
                    continue;
                }

                // Look up user by Harvest user ID first, then by email if available
                $userId = IntegrationMapping::lookup(
                    'harvest',
                    (string) $harvestEntry['user']['id'],
                    'User',
                    $this->organisationId
                );

                $user = null;
                if ($userId) {
                    $user = User::find($userId);
                }

                // If no mapping exists, try to find by email (if available)
                if (! $user && isset($harvestEntry['user']['email'])) {
                    $user = User::whereHas('organisations', function ($query) {
                        $query->where('organisations.id', $this->organisationId);
                    })->where('email', $harvestEntry['user']['email'])->first();
                }

                if (! $user) {
                    $this->warn("User not found for Harvest user ID {$harvestEntry['user']['id']}, skipping time entry");

                    continue;
                }

                $timeEntry = TimeEntry::create([
                    'organisation_id' => $this->organisationId,
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
                ]);

                IntegrationMapping::syncMapping(
                    'harvest',
                    (string) $harvestEntry['id'],
                    'TimeEntry',
                    $timeEntry->id,
                    $this->organisationId
                );

                $this->timeEntriesImported++;
            }

            $hasMore = $response['page'] < $response['total_pages'];
            $page++;
        }

        $this->info("Imported {$this->timeEntriesImported} time entries");
    }

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
}
