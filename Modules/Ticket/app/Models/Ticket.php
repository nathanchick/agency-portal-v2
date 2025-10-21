<?php

namespace Modules\Ticket\Models;

use App\Models\Concerns\BelongsToTenant;
use Coderflex\LaravelTicket\Models\Ticket as BaseTicket;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Ticket extends BaseTicket
{
    use HasUuids, BelongsToTenant;

    protected $fillable = [
        'uuid',
        'organisation_id',
        'user_id',
        'title',
        'message',
        'priority',
        'status',
        'is_resolved',
        'is_locked',
        'assigned_to',
    ];

    protected $casts = [
        'is_resolved' => 'boolean',
        'is_locked' => 'boolean',
    ];
}
