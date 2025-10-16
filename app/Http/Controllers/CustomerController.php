<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Get the current organisation ID for the authenticated user
     */
    private function getCurrentOrganisationId()
    {
        $organisation = auth()->user()->organisations()->first();

        if (!$organisation) {
            abort(403, 'You must belong to an organisation to perform this action.');
        }

        return $organisation->id;
    }

    public function index()
    {
        $customers = Customer::with('users')->latest()->get();

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

        $customer = Customer::create([
            ...$validated,
            'organisation_id' => $this->getCurrentOrganisationId(),
        ]);

        return redirect()->route('customers.edit', $customer)->with('success', 'Customer created successfully');
    }

    public function edit(Customer $customer)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Load users with their customer-specific role from pivot table
        $customer->load(['users' => function ($query) {
            $query->withPivot('role_id');
        }, 'projects', 'websites']);

        // Map users to include role name from the pivot table
        $usersWithRoles = $customer->users->map(function ($user) {
            $roleId = $user->pivot->role_id;
            $roleName = null;

            if ($roleId) {
                $role = \App\Models\Role::find($roleId);
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
        $availableUsers = \App\Models\User::whereHas('organisations', function ($query) use ($organisationId) {
            $query->where('organisations.id', $organisationId);
        })->whereDoesntHave('customers', function ($query) use ($customer) {
            $query->where('customers.id', $customer->id);
        })->get(['id', 'name', 'email']);

        // Get roles for this organisation
        $roles = \App\Models\Role::where('team_id', $organisationId)->get(['id', 'name']);

        return Inertia::render('customers/edit', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'status' => $customer->status,
                'users' => $usersWithRoles,
                'projects' => $customer->projects,
                'websites' => $customer->websites,
            ],
            'availableUsers' => $availableUsers,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|integer|in:0,1',
        ]);

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully');
    }

    public function attachUser(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $organisationId = $this->getCurrentOrganisationId();

        // Check if user is already attached
        if ($customer->users()->where('user_id', $validated['user_id'])->exists()) {
            return back()->with('error', 'User is already assigned to this customer');
        }

        // If no role provided, find default role
        $roleId = $validated['role_id'] ?? null;
        if (!$roleId) {
            // Try 'User' role first
            $defaultRole = \App\Models\Role::where('name', 'User')
                ->where('roles.team_id', $organisationId)
                ->first();

            // Fall back to first available role
            if (!$defaultRole) {
                $defaultRole = \App\Models\Role::where('roles.team_id', $organisationId)->first();
            }

            if (!$defaultRole) {
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
        $customer->users()->detach($userId);

        return back()->with('success', 'User removed successfully');
    }

    public function updateUserRole(Request $request, Customer $customer, $userId)
    {
        $validated = $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        $organisationId = $this->getCurrentOrganisationId();

        // Verify user is assigned to this customer
        if (!$customer->users()->where('users.id', $userId)->exists()) {
            return back()->with('error', 'User is not assigned to this customer');
        }

        // Find the role by name for this organisation
        $role = \App\Models\Role::where('name', $validated['role'])
            ->where('roles.team_id', $organisationId)
            ->first();

        if (!$role) {
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'nullable|exists:roles,name',
        ]);

        // Get the organisation from the authenticated user
        $organisationId = $this->getCurrentOrganisationId();
        $organisation = \App\Models\Organisation::findOrFail($organisationId);

        // Find the role - try provided role, then 'User', then first available role
        $role = null;
        if (!empty($validated['role'])) {
            $role = \App\Models\Role::where('name', $validated['role'])
                ->where('roles.team_id', $organisationId)
                ->first();
        }

        if (!$role) {
            // Try to find 'User' role
            $role = \App\Models\Role::where('name', 'User')
                ->where('roles.team_id', $organisationId)
                ->first();
        }

        if (!$role) {
            // Fall back to first available role for this organisation
            $role = \App\Models\Role::where('roles.team_id', $organisationId)->first();
        }

        if (!$role) {
            return back()->with('error', 'No roles available for this organisation. Please create roles first.');
        }

        // Check if user already exists
        $user = \App\Models\User::where('email', $validated['email'])->first();

        $isNewUser = false;

        if ($user) {
            // User exists - just add relationships

            // Check if already in this organisation
            $addedToOrganisation = false;
            if (!$user->organisations()->where('organisations.id', $organisationId)->exists()) {
                $user->organisations()->attach($organisationId);
                $addedToOrganisation = true;
            }

            // Check if already assigned to this customer
            if ($customer->users()->where('users.id', $user->id)->exists()) {
                return back()->with('error', 'User is already assigned to this customer');
            }

            // Attach user to the customer with role in pivot table
            $customer->users()->attach($user->id, [
                'role_id' => $role->id,
            ]);

            // Send notification to existing user
            if ($addedToOrganisation) {
                $user->notify(new \App\Notifications\UserAddedToOrganisation($organisation->name, $customer->name));
            }

            $message = 'Existing user added to customer successfully';
        } else {
            // User doesn't exist - create new user
            $user = \App\Models\User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt(\Illuminate\Support\Str::random(32)), // Random password, user will reset via email
            ]);

            // Attach user to the organisation
            $user->organisations()->attach($organisationId);

            // Attach user to the customer with role in pivot table
            $customer->users()->attach($user->id, [
                'role_id' => $role->id,
            ]);

            $isNewUser = true;

            // Send invitation email with password setup link
            $user->notify(new \App\Notifications\NewUserInvitation($organisation->name, $customer->name));

            $message = 'New user created and invited successfully';
        }

        return back()->with('success', $message);
    }

    public function storeProject(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $organisationId = $this->getCurrentOrganisationId();

        \App\Models\Project::create([
            'organisation_id' => $organisationId,
            'customer_id' => $customer->id,
            'name' => $validated['name'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return back()->with('success', 'Project created successfully');
    }

    public function destroyProject(Customer $customer, $projectId)
    {
        $project = \App\Models\Project::where('customer_id', $customer->id)
            ->where('id', $projectId)
            ->firstOrFail();

        $project->delete();

        return back()->with('success', 'Project deleted successfully');
    }

    public function storeWebsite(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'type' => 'required|in:production,staging,development',
            'url' => 'required|string|max:255',
            'repo_url' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        \App\Models\Website::create([
            'customer_id' => $customer->id,
            'type' => $validated['type'],
            'url' => $validated['url'],
            'repo_url' => $validated['repo_url'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return back()->with('success', 'Website created successfully');
    }

    public function destroyWebsite(Customer $customer, $websiteId)
    {
        $website = \App\Models\Website::where('customer_id', $customer->id)
            ->where('id', $websiteId)
            ->firstOrFail();

        $website->delete();

        return back()->with('success', 'Website deleted successfully');
    }
}
