<?php

namespace Modules\DashboardWidgets\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;

/**
 * UserDashboardWidget Model
 *
 * Represents a dashboard widget configured for a specific user.
 * Stores widget preferences including position, visibility, size, and custom settings.
 * Scoped to either organisation or customer context (one will be null).
 *
 * @property string $id
 * @property string $user_id
 * @property string|null $organisation_id
 * @property string|null $customer_id
 * @property string $widget_key
 * @property int $position
 * @property int $width
 * @property array|null $settings
 * @property bool $is_visible
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read User $user
 * @property-read Organisation|null $organisation
 * @property-read Customer|null $customer
 */
class UserDashboardWidget extends Model
{
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
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
     * @param  string|null  $organisationId
     * @param  string|null  $customerId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForUserContext($query, User $user, ?string $organisationId = null, ?string $customerId = null)
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
