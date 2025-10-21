<?php

namespace Modules\Document\Models;

use App\Traits\DispatchesWebhooks;
use Modules\Organisation\Models\Organisation;
use Modules\Document\Models\DocumentRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Document extends Model
{
    use HasUuids, DispatchesWebhooks;

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

                // Try to get from session first (most reliable for this app)
                if (session('current_organisation_id')) {
                    $organisationId = session('current_organisation_id');
                }
                // Fallback to multitenancy current() if available
                elseif ($currentOrg = Organisation::current()) {
                    $organisationId = $currentOrg->id;
                }
                // Last resort: get user's first organisation
                elseif ($user = auth()->user()) {
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
