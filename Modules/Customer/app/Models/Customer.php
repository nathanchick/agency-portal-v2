<?php

namespace Modules\Customer\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use App\Traits\DispatchesWebhooks;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Customer\Database\Factories\CustomerFactory;
use Modules\Customer\Models\CustomerSetting;
use Modules\Document\Models\DocumentRequest;
use Modules\Organisation\Models\Organisation;
use Modules\Website\Models\Website;

class Customer extends Model
{
    use BelongsToTenant;
    use DispatchesWebhooks;
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'name',
        'status',
        'allow_all_users',
    ];

    protected $casts = [
        'status' => 'integer',
        'allow_all_users' => 'boolean',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function websites(): HasMany
    {
        return $this->hasMany(Website::class);
    }

    public function documentRequests(): HasMany
    {
        return $this->hasMany(DocumentRequest::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('role_id');
    }

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function settings(): HasMany
    {
        return $this->hasMany(CustomerSetting::class);
    }

    /**
     * Get the Xero contact ID from customer settings.
     *
     * This accessor allows $customer->xero_contact_id to retrieve
     * the value from customer_settings table.
     *
     * @return string|null
     */
    public function getXeroContactIdAttribute(): ?string
    {
        return $this->settings()
            ->where('module', 'Xero')
            ->where('key', 'xero_contact_id')
            ->first()?->value;
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): CustomerFactory
    {
        return CustomerFactory::new();
    }
}
