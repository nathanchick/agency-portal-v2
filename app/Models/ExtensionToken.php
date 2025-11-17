<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ExtensionToken extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'token_hash',
        'name',
        'last_used_at',
        'expires_at',
    ];

    protected $casts = [
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected $hidden = [
        'token_hash',
    ];

    /**
     * User relationship
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Generate a new token
     */
    public static function generate(User $user, string $name = 'Chrome Extension'): array
    {
        $plainToken = Str::random(64);
        $tokenHash = hash('sha256', $plainToken);

        $token = self::create([
            'user_id' => $user->id,
            'token_hash' => $tokenHash,
            'name' => $name,
            'expires_at' => now()->addDays(90),
        ]);

        return [
            'token' => $plainToken,
            'model' => $token,
        ];
    }

    /**
     * Validate a plain token and return the associated model
     */
    public static function validateToken(string $plainToken): ?self
    {
        $tokenHash = hash('sha256', $plainToken);

        $token = self::where('token_hash', $tokenHash)
            ->where('expires_at', '>', now())
            ->first();

        if ($token) {
            $token->last_used_at = now();
            $token->save();
        }

        return $token;
    }

    /**
     * Check if token is expired
     */
    public function isExpired(): bool
    {
        return $this->expires_at < now();
    }

    /**
     * Scope: Only non-expired tokens
     */
    public function scopeValid($query)
    {
        return $query->where('expires_at', '>', now());
    }
}
