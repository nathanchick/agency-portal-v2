<?php

namespace Modules\Webhook\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;

class Webhook extends Model
{
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'name',
        'url',
        'model',
        'events',
        'secret',
        'active',
        'headers',
    ];

    protected $casts = [
        'events' => 'array',
        'headers' => 'array',
        'active' => 'boolean',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Get available models for webhooks
     */
    public static function getAvailableModels(): array
    {
        return [
            'Customer' => 'Customer',
            'Document' => 'Document',
            'DocumentRequest' => 'Document Request',
            'Project' => 'Project',
            'Website' => 'Website',
            'User' => 'User',
        ];
    }

    /**
     * Get available events
     */
    public static function getAvailableEvents(): array
    {
        return [
            'created' => 'Created',
            'updated' => 'Updated',
            'deleted' => 'Deleted',
        ];
    }
}
