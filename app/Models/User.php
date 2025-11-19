<?php

namespace App\Models;

use Coderflex\LaravelTicket\Concerns\HasTickets;
use Coderflex\LaravelTicket\Contracts\CanUseTickets;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements CanUseTickets
{
    use HasFactory, HasRoles, HasTickets, HasUuids, Notifiable , TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'last_organisation_id',
        'last_customer_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function organisations()
    {
        return $this->belongsToMany(Organisation::class);
    }

    public function customers()
    {
        return $this->belongsToMany(Customer::class);
    }

    public function customerOrganisations()
    {
        return Organisation::query()
              ->whereIn('id', function ($query) {
                  $query->select('organisation_id')
                      ->from('customers')
                      ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
                      ->where('customer_user.user_id', $this->id);
             });
    }

    /**
     * Get the team ID for Spatie Permission team support
     */
    public function getTeamIdAttribute()
    {
        // Return the current organisation ID from the tenant context
        $currentOrganisation = Organisation::current();

        return $currentOrganisation ? $currentOrganisation->id : null;
    }

    /**
     * Get current organisation ID (accessor for API contexts)
     */
    public function getCurrentOrganisationIdAttribute(): ?string
    {
        return Organisation::current()?->id;
    }

    /**
     * Get current organisation relationship
     */
    public function currentOrganisation()
    {
        return Organisation::current();
    }
}
