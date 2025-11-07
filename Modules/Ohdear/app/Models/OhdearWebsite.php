<?php

namespace Modules\Ohdear\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Website\Models\Website;

class OhdearWebsite extends Model
{
    use HasUuids;

    protected $fillable = [
        'website_id',
        'ohdear_site_id',
        'team_id',
        'urls',
    ];

    protected $casts = [
        'urls' => 'array',
    ];

    /**
     * Get the website that this Oh Dear monitoring is for
     */
    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }
}
