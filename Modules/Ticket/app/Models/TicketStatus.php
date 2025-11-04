<?php

namespace Modules\Ticket\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketStatus extends Model
{
    use HasUuids;

    protected $table = 'ticket_statuses';

    protected $fillable = [
        'organisation_id',
        'name',
        'slug',
        'color',
        'is_default',
        'is_closed',
        'is_visible',
        'order',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'is_closed' => 'boolean',
        'is_visible' => 'boolean',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Organisation::class);
    }
}
