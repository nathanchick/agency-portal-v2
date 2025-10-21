<?php

namespace Modules\Organisation\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ApiToken extends Model
{
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'created_by',
        'name',
        'token',
        'abilities',
        'last_used_at',
        'expires_at',
    ];

    protected $casts = [
        'abilities' => 'array',
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected $hidden = [
        'token',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Generate a new API token
     */
    public static function generateToken(): string
    {
        return hash('sha256', Str::random(60));
    }

    /**
     * Get available abilities for API tokens grouped by resource
     */
    public static function getAvailableAbilities(): array
    {
        return [
            'Customers' => [
                'read:customers' => 'Read',
                'write:customers' => 'Create/Update',
                'delete:customers' => 'Delete',
            ],
            'Document Requests' => [
                'read:document-requests' => 'Read',
                'write:document-requests' => 'Create/Update',
                'delete:document-requests' => 'Delete',
            ],
            'Projects' => [
                'read:projects' => 'Read',
                'write:projects' => 'Create/Update',
                'delete:projects' => 'Delete',
            ],
            'Websites' => [
                'read:websites' => 'Read',
                'write:websites' => 'Create/Update',
                'delete:websites' => 'Delete',
            ],
            'Tickets' => [
                'read:tickets' => 'Read',
                'write:tickets' => 'Create/Update',
                'delete:tickets' => 'Delete',
            ],
        ];
    }

    /**
     * Check if token has an ability
     */
    public function can(string $ability): bool
    {
        if (!$this->abilities) {
            return false;
        }

        return in_array('*', $this->abilities) || in_array($ability, $this->abilities);
    }

    /**
     * Mark token as used
     */
    public function markAsUsed(): void
    {
        $this->update(['last_used_at' => now()]);
    }
}