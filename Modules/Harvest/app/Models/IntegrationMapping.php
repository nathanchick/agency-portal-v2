<?php

namespace Modules\Harvest\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;

class IntegrationMapping extends Model
{
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'integration_source',
        'external_id',
        'internal_model',
        'internal_id',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Sync a mapping (create or update)
     */
    public static function syncMapping(
        string $integrationSource,
        string $externalId,
        string $internalModel,
        string $internalId,
        string $organisationId,
        ?array $metadata = null
    ): self {
        return self::updateOrCreate(
            [
                'integration_source' => $integrationSource,
                'external_id' => $externalId,
                'internal_model' => $internalModel,
                'organisation_id' => $organisationId,
            ],
            [
                'internal_id' => $internalId,
                'metadata' => $metadata,
            ]
        );
    }

    /**
     * Lookup an internal ID by external ID
     */
    public static function lookup(
        string $integrationSource,
        string $externalId,
        string $internalModel,
        string $organisationId
    ): ?string {
        return self::where('integration_source', $integrationSource)
            ->where('external_id', $externalId)
            ->where('internal_model', $internalModel)
            ->where('organisation_id', $organisationId)
            ->value('internal_id');
    }

    /**
     * Check if a mapping exists
     */
    public static function exists(
        string $integrationSource,
        string $externalId,
        string $internalModel,
        string $organisationId
    ): bool {
        return self::where('integration_source', $integrationSource)
            ->where('external_id', $externalId)
            ->where('internal_model', $internalModel)
            ->where('organisation_id', $organisationId)
            ->exists();
    }

    /**
     * Get all mappings for a specific integration source and model
     */
    public static function getAll(
        string $integrationSource,
        string $internalModel,
        string $organisationId
    ): \Illuminate\Support\Collection {
        return self::where('integration_source', $integrationSource)
            ->where('internal_model', $internalModel)
            ->where('organisation_id', $organisationId)
            ->get()
            ->pluck('internal_id', 'external_id');
    }
}
