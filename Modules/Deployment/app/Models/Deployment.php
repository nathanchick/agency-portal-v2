<?php

namespace Modules\Deployment\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Modules\Customer\Models\Customer;
use Modules\Website\Models\Website;
use Modules\Organisation\Models\Organisation;

class Deployment extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'organisation_id',
        'customer_id',
        'website_id',
        'webhook_token',
        'created_by',
    ];

    /**
     * Generate a unique webhook token
     */
    public static function generateWebhookToken(): string
    {
        do {
            $token = Str::random(64);
        } while (self::where('webhook_token', $token)->exists());

        return $token;
    }

    /**
     * Get the organisation that owns the deployment
     */
    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Get the customer that owns the deployment
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the website that owns the deployment
     */
    public function website()
    {
        return $this->belongsTo(Website::class);
    }

    /**
     * Get the user who created the webhook
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the deployment history for this webhook
     */
    public function history()
    {
        return $this->hasMany(DeploymentHistory::class);
    }

    /**
     * Get the latest deployment from history
     */
    public function latestDeployment()
    {
        return $this->hasOne(DeploymentHistory::class)->latest('deployed_at');
    }
}
