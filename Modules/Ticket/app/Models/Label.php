<?php

namespace Modules\Ticket\Models;

use App\Models\Concerns\BelongsToTenant;
use Coderflex\LaravelTicket\Models\Label as BaseLabel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Label extends BaseLabel
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'ticket_labels';

    protected $fillable = [
        'organisation_id',
        'name',
        'slug',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
    ];
}
