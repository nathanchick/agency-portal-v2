<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Coderflex\LaravelTicket\Models\Category as BaseCategory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Category extends BaseCategory
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
