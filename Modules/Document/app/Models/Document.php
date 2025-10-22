<?php

namespace Modules\Document\Models;

use App\Traits\DispatchesWebhooks;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Organisation\Models\Organisation;

class Document extends Model
{
    use DispatchesWebhooks;
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'name',
        'format',
        'filename',
        'content',
    ];

    protected $casts = [
        'format' => 'string',
    ];

    /**
     * The "booted" method of the model.
     *
     * WARNING: This scope is critical for security - it prevents cross-organization data access
     */
    protected static function booted(): void
    {
        // Only apply scope when there's an authenticated user and current organization
        static::addGlobalScope('organisation', function (Builder $builder) {
            if (auth()->check()) {
                $organisationId = null;
                $user = auth()->user();

                // Try to get from database first (most reliable for this app)
                if ($user && $user->last_organisation_id) {
                    $organisationId = $user->last_organisation_id;
                }
                // Fallback to multitenancy current() if available
                elseif ($currentOrg = Organisation::current()) {
                    $organisationId = $currentOrg->id;
                }
                // Last resort: get user's first organisation
                elseif ($user) {
                    $org = $user->organisations()->first();
                    if ($org) {
                        $organisationId = $org->id;
                    }
                }

                if ($organisationId) {
                    $builder->where('documents.organisation_id', $organisationId);
                }
            }
        });
    }

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    public function documentRequests(): HasMany
    {
        return $this->hasMany(DocumentRequest::class);
    }
}
