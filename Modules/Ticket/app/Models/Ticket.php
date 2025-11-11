<?php

namespace Modules\Ticket\Models;

use App\Models\Concerns\BelongsToTenant;
use Coderflex\LaravelTicket\Models\Ticket as BaseTicket;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Customer\Models\Customer;
use Modules\Ticket\Events\TicketCreated;
use Modules\Ticket\Events\TicketUpdated;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Ticket extends BaseTicket implements HasMedia
{
    use BelongsToTenant;
    use HasUuids;
    use InteractsWithMedia;

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => TicketCreated::class,
        'updated' => TicketUpdated::class,
    ];

    protected $fillable = [
        'uuid',
        'organisation_id',
        'customer_id',
        'user_id',
        'title',
        'message',
        'priority',
        'status',
        'is_resolved',
        'is_locked',
        'assigned_to',
        'metadata',
    ];

    protected $casts = [
        'is_resolved' => 'boolean',
        'is_locked' => 'boolean',
        'metadata' => 'array',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'assigned_to');
    }

    public function summary(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(TicketSummary::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments')
             ->acceptsMimeTypes([
                 'image/jpeg', 'image/png', 'image/gif', 'image/webp',
                 'application/pdf',
                 'application/zip',
                 'text/plain', 'text/csv',
                 'application/vnd.ms-excel',
                 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                 'application/msword',
                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
             ]);
        // Note: File size limit (10MB) is controlled globally in config/media-library.php
    }
}
