<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use App\Models\User;
use App\Services\ModuleSettingsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Models\Customer;
use Modules\GitHub\Services\GitHubApiService;
use Modules\GitHub\Services\GitHubRepositorySyncService;
use Modules\GitHub\Services\GitHubTokenService;
use Modules\Organisation\Models\Organisation;

class CustomerController extends Controller
{
    use HasCurrentOrganisation;

    public function index()
    {
        $organisationId = $this->getCurrentOrganisationId();
        $user = auth()->user();

        // Check if user is an organisation user
        $isOrganisationUser = \Illuminate\Support\Facades\DB::table('model_has_roles')
            ->where('model_id', $user->id)
            ->where('model_type', User::class)
            ->where('team_id', $organisationId)
            ->exists();

        if ($isOrganisationUser) {
            // Organisation users see all customers for this organisation
            $customers = Customer::with('users')
                ->where('organisation_id', $organisationId)
                ->latest()
                ->get();
        } else {
            // Customer users only see customers they're assigned to
            $customers = $user->customers()
                ->with('users')
                ->where('customers.organisation_id', $organisationId)
                ->latest()
                ->get();
        }

        return Inertia::render('customers/index', [
            'customers' => $customers,
        ]);
    }

    public function create()
    {
        return Inertia::render('customers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|integer|in:0,1',
        ]);

        $organisationId = $this->getCurrentOrganisationId();

        $customer = Customer::create([
            ...$validated,
            'organisation_id' => $organisationId,
        ]);

        // Create default project for the customer
        \Modules\Customer\Models\Project::create([
            'organisation_id' => $organisationId,
            'customer_id' => $customer->id,
            'name' => 'Default',
            'notes' => 'Default project - cannot be deleted',
            'is_default' => true,
        ]);

        return redirect()->route('customers.edit', $customer)->with('success', 'Customer created successfully');
    }

    public function edit(Request $request, Customer $customer, ModuleSettingsService $settingsService, GitHubApiService $githubApiService, GitHubRepositorySyncService $githubSyncService, GitHubTokenService $githubTokenService)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        // Load users with their customer-specific role from pivot table
        $customer->load(['users' => function ($query) {
            $query->withPivot('role_id');
        }, 'projects.githubRepository', 'websites.project']);

        // Map users to include role name from the pivot table
        $usersWithRoles = $customer->users->map(function ($user) {
            $roleId = $user->pivot->role_id;
            $roleName = null;

            if ($roleId) {
                $role = \Modules\Organisation\Models\Role::find($roleId);
                $roleName = $role?->name;
            }

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_name' => $roleName,
            ];
        });

        // Get all users from the same organisation who aren't already assigned
        $availableUsers = User::whereHas('organisations', function ($query) use ($organisationId) {
            $query->where('organisations.id', $organisationId);
        })->whereDoesntHave('customers', function ($query) use ($customer) {
            $query->where('customers.id', $customer->id);
        })->get(['id', 'name', 'email'])->map(function ($user) use ($organisationId) {
            // Check if user has an organisation role
            $hasOrganisationRole = \Illuminate\Support\Facades\DB::table('model_has_roles')
                ->where('model_id', $user->id)
                ->where('model_type', User::class)
                ->where('team_id', $organisationId)
                ->exists();

            return [
                'id' => $user->id,
                'name' => $hasOrganisationRole ? $user->name.' (Organisation)' : $user->name,
                'email' => $user->email,
            ];
        });

        // Get roles for this organisation
        $roles = \Modules\Organisation\Models\Role::where('team_id', $organisationId)->get(['id', 'name']);

        // Get module settings for this customer
        $moduleSettings = $settingsService->getCustomerSettings($customer);

        // Get GitHub repositories if connected
        $githubRepositories = [];
        $organisation = Organisation::find($organisationId);
        if ($githubTokenService->isTokenValid($organisation)) {
            try {
                // Force refresh if requested
                $forceRefresh = $request->boolean('refresh_github', false);

                // Fetch from API
                $apiRepos = $githubApiService->listRepositories($organisation, $forceRefresh);

                // Sync to database
                foreach ($apiRepos as $apiRepo) {
                    $githubSyncService->createOrUpdateRepository($organisation, $apiRepo);
                }

                // Get stored repositories from database
                $githubRepositories = \Modules\GitHub\Models\GitHubRepository::where('organisation_id', $organisationId)
                    ->orderBy('full_name')
                    ->get(['id', 'name', 'full_name', 'owner', 'description', 'html_url', 'is_private'])
                    ->toArray();

                \Illuminate\Support\Facades\Log::info('GitHub repositories loaded', [
                    'organisation_id' => $organisationId,
                    'count' => count($githubRepositories),
                    'force_refresh' => $forceRefresh,
                ]);

            } catch (\Exception $e) {
                // Silently fail if GitHub API is unavailable
                \Illuminate\Support\Facades\Log::warning('Failed to fetch GitHub repositories', [
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return Inertia::render('customers/edit', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'status' => $customer->status,
                'allow_all_users' => $customer->allow_all_users,
                'users' => $usersWithRoles,
                'projects' => $customer->projects,
                'websites' => $customer->websites,
            ],
            'availableUsers' => $availableUsers,
            'roles' => $roles,
            'moduleSettings' => $moduleSettings,
            'githubRepositories' => $githubRepositories,
        ]);
    }

    public function update(Request $request, Customer $customer, ModuleSettingsService $settingsService)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|integer|in:0,1',
            'allow_all_users' => 'required|boolean',
        ]);

        $customer->update($validated);

        // Save module settings if provided
        if ($request->has('module_settings')) {
            $settingsService->saveCustomerSettings($customer, $request->input('module_settings'));
        }

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully');
    }

    public function updateModuleSettings(Request $request, Customer $customer, ModuleSettingsService $settingsService)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'module_name' => 'required|string',
            'settings' => 'required|array',
        ]);

        // Save settings for the specific module
        $settingsService->saveCustomerSettings($customer, [
            $validated['module_name'] => $validated['settings'],
        ]);

        return back()->with('success', 'Module settings updated successfully');
    }

    public function destroy(Customer $customer)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully');
    }

    public function attachUser(Request $request, Customer $customer)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        // Check if user is already attached
        if ($customer->users()->where('user_id', $validated['user_id'])->exists()) {
            return back()->with('error', 'User is already assigned to this customer');
        }

        // If no role provided, find default role
        $roleId = $validated['role_id'] ?? null;
        if (! $roleId) {
            // Try 'User' role first
            $defaultRole = \Modules\Organisation\Models\Role::where('name', 'User')
                ->where('roles.team_id', $organisationId)
                ->first();

            // Fall back to first available role
            if (! $defaultRole) {
                $defaultRole = \Modules\Organisation\Models\Role::where('roles.team_id', $organisationId)->first();
            }

            if (! $defaultRole) {
                return back()->with('error', 'No roles available for this organisation. Please create roles first.');
            }

            $roleId = $defaultRole->id;
        }

        $customer->users()->attach($validated['user_id'], [
            'role_id' => $roleId,
        ]);

        return back()->with('success', 'User added successfully');
    }

    public function detachUser(Customer $customer, $userId)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $customer->users()->detach($userId);

        return back()->with('success', 'User removed successfully');
    }

    public function updateUserRole(Request $request, Customer $customer, $userId)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        // Verify user is assigned to this customer
        if (! $customer->users()->where('users.id', $userId)->exists()) {
            return back()->with('error', 'User is not assigned to this customer');
        }

        // Find the role by name for this organisation
        $role = \Modules\Organisation\Models\Role::where('name', $validated['role'])
            ->where('roles.team_id', $organisationId)
            ->first();

        if (! $role) {
            return back()->with('error', 'Role not found');
        }

        // Update the pivot table with the new role_id
        $customer->users()->updateExistingPivot($userId, [
            'role_id' => $role->id,
        ]);

        return back()->with('success', 'User role updated successfully');
    }

    public function createUser(Request $request, Customer $customer)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'nullable|exists:roles,name',
        ]);

        // Get the organisation from the authenticated user
        $organisation = Organisation::findOrFail($organisationId);

        // Find the role - try provided role, then 'User', then first available role
        $role = null;
        if (! empty($validated['role'])) {
            $role = \Modules\Organisation\Models\Role::where('name', $validated['role'])
                ->where('roles.team_id', $organisationId)
                ->first();
        }

        if (! $role) {
            // Try to find 'User' role
            $role = \Modules\Organisation\Models\Role::where('name', 'User')
                ->where('roles.team_id', $organisationId)
                ->first();
        }

        if (! $role) {
            // Fall back to first available role for this organisation
            $role = \Modules\Organisation\Models\Role::where('roles.team_id', $organisationId)->first();
        }

        if (! $role) {
            return back()->with('error', 'No roles available for this organisation. Please create roles first.');
        }

        // Check if user already exists
        $user = User::where('email', $validated['email'])->first();

        $isNewUser = false;

        if ($user) {
            // User exists - just add relationships

            // Check if already assigned to this customer
            if ($customer->users()->where('users.id', $user->id)->exists()) {
                return back()->with('error', 'User is already assigned to this customer');
            }

            // Attach user to the customer with role in pivot table
            // NOTE: Customer users should ONLY be in customer_user table, NOT organisation_user
            $customer->users()->attach($user->id, [
                'role_id' => $role->id,
            ]);

            // Send notification to existing user
            $user->notify(new \Modules\Organisation\Notifications\UserAddedToOrganisation($organisation->name, $customer->name));

            $message = 'Existing user added to customer successfully';
        } else {
            // User doesn't exist - create new user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt(\Illuminate\Support\Str::random(32)), // Random password, user will reset via email
            ]);

            // Attach user to the customer with role in pivot table
            // NOTE: Customer users should ONLY be in customer_user table, NOT organisation_user
            $customer->users()->attach($user->id, [
                'role_id' => $role->id,
            ]);

            $isNewUser = true;

            // Send invitation email with password setup link
            $user->notify(new \Modules\Organisation\Notifications\NewUserInvitation($organisation->name, $customer->name));

            $message = 'New user created and invited successfully';
        }

        return back()->with('success', $message);
    }

    public function storeProject(Request $request, Customer $customer)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'github_repository_id' => 'nullable|uuid|exists:github_repositories,id',
        ]);

        \Modules\Customer\Models\Project::create([
            'organisation_id' => $organisationId,
            'customer_id' => $customer->id,
            'name' => $validated['name'],
            'notes' => $validated['notes'] ?? null,
            'github_repository_id' => $validated['github_repository_id'] ?? null,
        ]);

        return back()->with('success', 'Project created successfully');
    }

    public function updateProject(Request $request, Customer $customer, $projectId)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'github_repository_id' => 'nullable|uuid|exists:github_repositories,id',
        ]);

        $project = \Modules\Customer\Models\Project::where('customer_id', $customer->id)
            ->where('id', $projectId)
            ->firstOrFail();

        $project->update($validated);

        return back()->with('success', 'Project updated successfully');
    }

    public function destroyProject(Customer $customer, $projectId)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $project = \Modules\Customer\Models\Project::where('customer_id', $customer->id)
            ->where('id', $projectId)
            ->firstOrFail();

        if ($project->is_default) {
            return back()->with('error', 'Cannot delete the default project');
        }

        $project->delete();

        return back()->with('success', 'Project deleted successfully');
    }

    public function storeWebsite(Request $request, Customer $customer)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'type' => 'required|in:production,staging,development',
            'url' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        \Modules\Customer\Models\Website::create([
            'customer_id' => $customer->id,
            'project_id' => $validated['project_id'],
            'type' => $validated['type'],
            'url' => $validated['url'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return back()->with('success', 'Website created successfully');
    }

    public function updateWebsite(Request $request, Customer $customer, $websiteId)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'type' => 'required|in:production,staging,development',
            'url' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $website = \Modules\Customer\Models\Website::where('customer_id', $customer->id)
            ->where('id', $websiteId)
            ->firstOrFail();

        $website->update($validated);

        return back()->with('success', 'Website updated successfully');
    }

    public function destroyWebsite(Customer $customer, $websiteId)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $website = \Modules\Customer\Models\Website::where('customer_id', $customer->id)
            ->where('id', $websiteId)
            ->firstOrFail();

        $website->delete();

        return back()->with('success', 'Website deleted successfully');
    }

    public function updateWebsiteProject(Request $request, Customer $customer, $websiteId)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure customer belongs to the current organisation
        if ($customer->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this customer.');
        }

        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
        ]);

        $website = \Modules\Customer\Models\Website::where('customer_id', $customer->id)
            ->where('id', $websiteId)
            ->firstOrFail();

        $website->update([
            'project_id' => $validated['project_id'],
        ]);

        return back()->with('success', 'Website project updated successfully');
    }
}
