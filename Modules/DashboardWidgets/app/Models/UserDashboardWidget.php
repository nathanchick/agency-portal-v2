<?php

namespace Modules\DashboardWidgets\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;

class UserDashboardWidget extends Model
{
    protected $fillable = [
        'user_id',
        'organisation_id',
        'customer_id',
        'widget_key',
        'position',
        'width',
        'settings',
        'is_visible',
    ];

    protected $casts = [
        'settings' => 'array',
        'is_visible' => 'boolean',
        'position' => 'integer',
        'width' => 'integer',
    ];

    /**
     * Get the user that owns the widget.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the organisation (if organisation-scoped).
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Get the customer (if customer-scoped).
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Scope a query to filter widgets for a specific user context.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  \App\Models\User  $user
     * @param  string  $organisationId
     * @param  string  $customerId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForUserContext($query, User $user, $organisationId = null, $customerId = null)
    {
        return $query->where('user_id', $user->id)
            ->where('organisation_id', $organisationId)
            ->where('customer_id', $customerId);
    }

    /**
     * Scope a query to only include visible widgets.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }
}
