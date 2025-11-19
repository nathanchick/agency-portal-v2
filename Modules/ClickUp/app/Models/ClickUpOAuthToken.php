<?php

namespace Modules\ClickUp\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;

class ClickUpOAuthToken extends Model
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'clickup_oauth_tokens';

    protected $fillable = [
        'organisation_id',
        'access_token',
        'refresh_token',
        'token_type',
        'scope',
        'access_token_expires_at',
        'clickup_team_id',
        'clickup_team_name',
        'clickup_account_email',
    ];

    protected $casts = [
        'access_token_expires_at' => 'datetime',
    ];

    protected $hidden = [
        'access_token',
        'refresh_token',
    ];

    /**
     * Encrypt access token when setting
     */
    public function setAccessTokenAttribute(?string $value): void
    {
        if ($value) {
            $this->attributes['access_token'] = encrypt($value);
        }
    }

    /**
     * Decrypt access token when getting
     */
    public function getAccessTokenAttribute(?string $value): ?string
    {
        if ($value) {
            return decrypt($value);
        }

        return null;
    }

    /**
     * Encrypt refresh token when setting
     */
    public function setRefreshTokenAttribute(?string $value): void
    {
        if ($value) {
            $this->attributes['refresh_token'] = encrypt($value);
        }
    }

    /**
     * Decrypt refresh token when getting
     */
    public function getRefreshTokenAttribute(?string $value): ?string
    {
        if ($value) {
            return decrypt($value);
        }

        return null;
    }

    /**
     * Check if token is expired
     */
    public function isExpired(): bool
    {
        if (! $this->access_token_expires_at) {
            return false; // ClickUp OAuth tokens don't expire unless revoked
        }

        return $this->access_token_expires_at->isPast();
    }

    /**
     * Get the organisation that owns the token
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }
}
