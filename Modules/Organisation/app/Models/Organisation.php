<?php

namespace Modules\Organisation\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Customer\Models\Customer;
use Modules\Document\Models\Document;
use Modules\Document\Models\DocumentRequest;
use Modules\Organisation\Database\Factories\OrganisationFactory;
use Modules\Organisation\Models\OrganisationSetting;
use Spatie\Multitenancy\Contracts\IsTenant;
use Spatie\Multitenancy\Models\Concerns\ImplementsTenant;

class Organisation extends Model implements IsTenant
{
    use HasFactory;
    use HasUuids;
    use ImplementsTenant;

    protected $fillable = [
        'name',
        'logo',
        'primary_color',
        'secondary_color',
        'billing_email',
        'billing_address1',
        'billing_address2',
        'billing_city',
        'billing_state',
        'billing_zip',
        'billing_country',
        'vat_number',
        'status',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function documentRequests()
    {
        return $this->hasMany(DocumentRequest::class);
    }

    public function settings(): HasMany
    {
        return $this->hasMany(OrganisationSetting::class);
    }

    /**
     * Get the ClickUp OAuth token for this organisation.
     */
    public function clickUpOAuthToken()
    {
        return $this->hasOne(\Modules\ClickUp\Models\ClickUpOAuthToken::class);
    }

    /**
     * Get the GitHub OAuth token for this organisation.
     */
    public function gitHubOAuthToken()
    {
        return $this->hasOne(\Modules\GitHub\Models\GitHubOAuthToken::class);
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): OrganisationFactory
    {
        return OrganisationFactory::new();
    }
}
