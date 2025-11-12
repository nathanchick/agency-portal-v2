<?php

namespace Modules\Xero\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Crypt;
use Modules\Organisation\Models\Organisation;

/**
 * XeroOAuthToken Model
 *
 * Stores OAuth 2.0 access and refresh tokens for Xero API authentication.
 * Tokens are encrypted at rest for security.
 *
 * @property string $id
 * @property string $organisation_id
 * @property string $access_token
 * @property string $refresh_token
 * @property \Carbon\Carbon $access_token_expires_at
 * @property \Carbon\Carbon $refresh_token_expires_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class XeroOAuthToken extends Model
{
    use HasFactory, HasUuids;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'xero_oauth_tokens';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'organisation_id',
        'access_token',
        'refresh_token',
        'access_token_expires_at',
        'refresh_token_expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'access_token_expires_at' => 'datetime',
        'refresh_token_expires_at' => 'datetime',
    ];

    /**
     * Get the organisation that owns the token.
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Encrypt and decrypt access token.
     *
     * Tokens are stored encrypted in the database for security.
     */
    protected function accessToken(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ? Crypt::decryptString($value) : null,
            set: fn (?string $value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    /**
     * Encrypt and decrypt refresh token.
     *
     * Tokens are stored encrypted in the database for security.
     */
    protected function refreshToken(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ? Crypt::decryptString($value) : null,
            set: fn (?string $value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    /**
     * Check if the access token is expired or will expire soon.
     *
     * @param int $bufferMinutes Buffer time in minutes before expiry (default: 5)
     */
    public function isAccessTokenExpired(int $bufferMinutes = 5): bool
    {
        return $this->access_token_expires_at->subMinutes($bufferMinutes)->isPast();
    }

    /**
     * Check if the refresh token is expired.
     */
    public function isRefreshTokenExpired(): bool
    {
        return $this->refresh_token_expires_at->isPast();
    }

    /**
     * Check if the tokens are valid (both access and refresh tokens not expired).
     */
    public function areTokensValid(): bool
    {
        return ! $this->isRefreshTokenExpired();
    }
}
