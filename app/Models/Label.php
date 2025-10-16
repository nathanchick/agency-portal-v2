<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Coderflex\LaravelTicket\Models\Label as BaseLabel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Label extends BaseLabel
{
    use HasUuids, BelongsToTenant;

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
