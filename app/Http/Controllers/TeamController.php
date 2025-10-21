<?php

namespace App\Http\Controllers;

use App\Http\Traits\HasCurrentOrganisation;
use Modules\Customer\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\Role;

class TeamController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display a listing of team members
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $userType = 'customer';
        $currentOrganisation = null;
        $currentCustomer = null;
        $teamMembers = [];

        // Determine context (organisation or customer)
        $currentCustomer = $user->customers()->first();

        if ($currentCustomer) {
            // Customer admin viewing customer team
            $userType = 'customer';
            $currentOrganisation = Organisation::find($currentCustomer->organisation_id);

            // Get all users for this customer with their roles
            $teamMembers = DB::table('users')
                ->join('customer_user', 'users.id', '=', 'customer_user.user_id')
                ->leftJoin('roles', 'customer_user.role_id', '=', 'roles.id')
                ->where('customer_user.customer_id', $currentCustomer->id)
                ->select(
                    'users.id',
                    'users.name',
                    'users.email',
                    'users.created_at',
                    'users.last_login_at',
                    'roles.name as role'
                )
                ->get();
        } else {
            // Organisation admin viewing organisation team
            $userType = 'organisation';
            $currentOrganisation = $this->getCurrentOrganisation();

            if ($currentOrganisation) {
                // Get all users for this organisation with their roles
                // Only include users who have a role (exclude customer users)
                $teamMembers = DB::table('users')
                    ->join('organisation_user', 'users.id', '=', 'organisation_user.user_id')
                    ->join('model_has_roles', function ($join) use ($currentOrganisation) {
                        $join->on('users.id', '=', 'model_has_roles.model_id')
                            ->where('model_has_roles.model_type', '=', User::class)
                            ->where('model_has_roles.team_id', '=', $currentOrganisation->id);
                    })
                    ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                    ->where('organisation_user.organisation_id', $currentOrganisation->id)
                    ->select(
                        'users.id',
                        'users.name',
                        'users.email',
                        'users.created_at',
                        'users.last_login_at',
                        'roles.name as role'
                    )
                    ->distinct()
                    ->get();
            }
        }

        // Get available roles
        $roles = $currentOrganisation
            ? Role::where('team_id', $currentOrganisation->id)->get()
            : [];

        return Inertia::render('team/index', [
            'teamMembers' => $teamMembers,
            'roles' => $roles,
            'userType' => $userType,
            'currentOrganisation' => $currentOrganisation,
            'currentCustomer' => $currentCustomer,
        ]);
    }

    /**
     * Show the form for creating a new team member
     */
    public function create(Request $request)
    {
        $user = $request->user();
        $currentCustomer = $user->customers()->first();
        $currentOrganisation = $currentCustomer
            ? Organisation::find($currentCustomer->organisation_id)
            : ($this->getCurrentOrganisation());

        // Get available roles for the team
        $roles = $currentOrganisation
            ? Role::where('team_id', $currentOrganisation->id)->get()
            : [];

        return Inertia::render('team/create', [
            'roles' => $roles,
            'userType' => $currentCustomer ? 'customer' : 'organisation',
        ]);
    }

    /**
     * Store a newly created team member
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        $user = $request->user();
        $currentCustomer = $user->customers()->first();
        $currentOrganisation = $currentCustomer
            ? Organisation::find($currentCustomer->organisation_id)
            : ($this->getCurrentOrganisation());

        // Check if user already exists
        $existingUser = User::where('email', $validated['email'])->first();

        if ($existingUser) {
            // User exists - add to team if not already a member
            if ($currentCustomer) {
                // Check if already in this customer
                if ($existingUser->customers()->where('customer_id', $currentCustomer->id)->exists()) {
                    return back()->with('error', 'This user is already a member of this team.');
                }

                // Add to customer
                $existingUser->customers()->attach($currentCustomer->id, [
                    'role_id' => $validated['role_id'],
                ]);
                $teamName = $currentCustomer->name;
            } else {
                // Check if already in this organisation with a role
                $hasRole = DB::table('model_has_roles')
                    ->where('model_id', $existingUser->id)
                    ->where('model_type', User::class)
                    ->where('team_id', $currentOrganisation->id)
                    ->exists();

                if ($hasRole) {
                    return back()->with('error', 'This user is already a member of this team.');
                }

                // Add to organisation if not already
                if (! $existingUser->organisations()->where('organisations.id', $currentOrganisation->id)->exists()) {
                    $existingUser->organisations()->attach($currentOrganisation->id);
                }

                // Assign role with team context
                $role = Role::find($validated['role_id']);
                if ($role) {
                    setPermissionsTeamId($currentOrganisation->id);
                    $existingUser->assignRole($role);
                }
                $teamName = $currentOrganisation->name;
            }

            // Send notification to existing user
            $existingUser->notify(new \App\Notifications\TeamInvitation($teamName, $user->name));

            return redirect()->route('team.index')
                ->with('success', 'Existing user added to team successfully.');
        }

        // User doesn't exist - create new user
        $newUser = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make(str()->random(32)),
        ]);

        if ($currentCustomer) {
            // Add to customer
            $newUser->customers()->attach($currentCustomer->id, [
                'role_id' => $validated['role_id'],
            ]);
            $teamName = $currentCustomer->name;
        } else {
            // Add to organisation
            $newUser->organisations()->attach($currentOrganisation->id);

            // Assign role with team context
            $role = Role::find($validated['role_id']);
            if ($role) {
                setPermissionsTeamId($currentOrganisation->id);
                $newUser->assignRole($role);
            }
            $teamName = $currentOrganisation->name;
        }

        // Send invitation email
        $newUser->notify(new \App\Notifications\TeamInvitation($teamName, $user->name));

        return redirect()->route('team.index')
            ->with('success', 'Team member added successfully. An invitation email has been sent.');
    }

    /**
     * Show the form for editing a team member
     */
    public function edit(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $currentUser = $request->user();
        $currentCustomer = $currentUser->customers()->first();
        $currentOrganisation = $currentCustomer
            ? Organisation::find($currentCustomer->organisation_id)
            : ($this->getCurrentOrganisation());

        // Get user's current role
        $currentRole = null;
        if ($currentCustomer) {
            $pivot = DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $currentCustomer->id)
                ->first();
            $currentRole = $pivot ? Role::find($pivot->role_id) : null;
        } else {
            $userRole = DB::table('model_has_roles')
                ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->where('model_has_roles.model_id', $user->id)
                ->where('model_has_roles.model_type', User::class)
                ->where('model_has_roles.team_id', $currentOrganisation->id)
                ->first();
            $currentRole = $userRole ? Role::find($userRole->role_id) : null;
        }

        // Get available roles
        $roles = $currentOrganisation
            ? Role::where('team_id', $currentOrganisation->id)->get()
            : [];

        return Inertia::render('team/edit', [
            'teamMember' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $currentRole?->id,
            ],
            'roles' => $roles,
            'userType' => $currentCustomer ? 'customer' : 'organisation',
        ]);
    }

    /**
     * Update the specified team member
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $currentUser = $request->user();
        $currentCustomer = $currentUser->customers()->first();
        $currentOrganisation = $currentCustomer
            ? Organisation::find($currentCustomer->organisation_id)
            : ($this->getCurrentOrganisation());

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        // Update user details
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // Update role
        if ($currentCustomer) {
            // Update customer user role
            DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $currentCustomer->id)
                ->update(['role_id' => $validated['role_id']]);
        } else {
            // Update organisation user role
            setPermissionsTeamId($currentOrganisation->id);
            $user->syncRoles([]);
            $role = Role::find($validated['role_id']);
            if ($role) {
                $user->assignRole($role);
            }
        }

        return redirect()->route('team.index')
            ->with('success', 'Team member updated successfully.');
    }

    /**
     * Update team member role inline
     */
    public function updateRole(Request $request, string $id)
    {
        $validated = $request->validate([
            'role' => ['required', 'string'],
        ]);

        $user = User::findOrFail($id);
        $currentUser = $request->user();
        $currentCustomer = $currentUser->customers()->first();
        $currentOrganisation = $currentCustomer
            ? Organisation::find($currentCustomer->organisation_id)
            : ($this->getCurrentOrganisation());

        // Find the role by name
        $role = Role::where('name', $validated['role'])
            ->where('team_id', $currentOrganisation->id)
            ->first();

        if (! $role) {
            return back()->with('error', 'Role not found.');
        }

        // Check if user is changing FROM Admin role
        $isChangingFromAdmin = false;
        if ($currentCustomer) {
            $currentRoleId = DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $currentCustomer->id)
                ->value('role_id');

            if ($currentRoleId) {
                $currentRole = Role::find($currentRoleId);
                $isChangingFromAdmin = $currentRole && $currentRole->name === 'Admin';
            }
        } else {
            $currentRoles = DB::table('model_has_roles')
                ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->where('model_has_roles.model_id', $user->id)
                ->where('model_has_roles.model_type', User::class)
                ->where('model_has_roles.team_id', $currentOrganisation->id)
                ->pluck('roles.name')
                ->toArray();

            $isChangingFromAdmin = in_array('Admin', $currentRoles);
        }

        // If changing from Admin, check if there's at least one other Admin
        if ($isChangingFromAdmin && $validated['role'] !== 'Admin') {
            $adminCount = $this->countAdminUsers($currentOrganisation, $currentCustomer);

            if ($adminCount <= 1) {
                return back()->with('error', 'Cannot change role. Every team must have at least one Admin user.');
            }
        }

        // Update role
        if ($currentCustomer) {
            // Update customer user role
            DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $currentCustomer->id)
                ->update(['role_id' => $role->id]);
        } else {
            // Update organisation user role
            setPermissionsTeamId($currentOrganisation->id);
            $user->syncRoles([]);
            $user->assignRole($role);
        }

        return back()->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified team member
     */
    public function destroy(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $currentUser = $request->user();

        // Prevent self-deletion
        if ($user->id === $currentUser->id) {
            return redirect()->route('team.index')
                ->with('error', 'You cannot delete yourself.');
        }

        $currentCustomer = $currentUser->customers()->first();
        $currentOrganisation = $currentCustomer
            ? Organisation::find($currentCustomer->organisation_id)
            : ($this->getCurrentOrganisation());

        // Check if user is an Admin
        $isAdmin = false;
        if ($currentCustomer) {
            $roleId = DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $currentCustomer->id)
                ->value('role_id');

            if ($roleId) {
                $role = Role::find($roleId);
                $isAdmin = $role && $role->name === 'Admin';
            }
        } else {
            $roles = DB::table('model_has_roles')
                ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->where('model_has_roles.model_id', $user->id)
                ->where('model_has_roles.model_type', User::class)
                ->where('model_has_roles.team_id', $currentOrganisation->id)
                ->pluck('roles.name')
                ->toArray();

            $isAdmin = in_array('Admin', $roles);
        }

        // If user is Admin, check if there's at least one other Admin
        if ($isAdmin) {
            $adminCount = $this->countAdminUsers($currentOrganisation, $currentCustomer);

            if ($adminCount <= 1) {
                return redirect()->route('team.index')
                    ->with('error', 'Cannot remove user. Every team must have at least one Admin user.');
            }
        }

        if ($currentCustomer) {
            // Remove from customer pivot table
            $user->customers()->detach($currentCustomer->id);
        } else {
            // Remove roles from model_has_roles
            setPermissionsTeamId($currentOrganisation->id);
            $user->syncRoles([]);

            // Remove from organisation pivot table
            $user->organisations()->detach($currentOrganisation->id);
        }

        return redirect()->route('team.index')
            ->with('success', 'Team member removed from team successfully.');
    }

    /**
     * Resend invitation email to a team member
     */
    public function resendInvite(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $currentUser = $request->user();
        $currentCustomer = $currentUser->customers()->first();
        $currentOrganisation = $currentCustomer
            ? Organisation::find($currentCustomer->organisation_id)
            : ($this->getCurrentOrganisation());

        // Check if user has never logged in
        if ($user->last_login_at !== null) {
            return back()->with('error', 'This user has already logged in. Cannot resend invitation.');
        }

        $teamName = $currentCustomer ? $currentCustomer->name : $currentOrganisation->name;

        // Send invitation email
        $user->notify(new \App\Notifications\TeamInvitation($teamName, $currentUser->name));

        return back()->with('success', 'Invitation email has been resent successfully.');
    }

    /**
     * Count the number of Admin users in a team
     */
    protected function countAdminUsers(Organisation $organisation, $customer = null): int
    {
        if ($customer) {
            // Count Admin users in customer
            $adminRole = Role::where('name', 'Admin')
                ->where('team_id', $organisation->id)
                ->first();

            if (! $adminRole) {
                return 0;
            }

            return DB::table('customer_user')
                ->where('customer_id', $customer->id)
                ->where('role_id', $adminRole->id)
                ->count();
        } else {
            // Count Admin users in organisation
            $adminRole = Role::where('name', 'Admin')
                ->where('team_id', $organisation->id)
                ->first();

            if (! $adminRole) {
                return 0;
            }

            return DB::table('model_has_roles')
                ->where('role_id', $adminRole->id)
                ->where('model_type', User::class)
                ->where('team_id', $organisation->id)
                ->count();
        }
    }
}
