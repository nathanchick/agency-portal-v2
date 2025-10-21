<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;

trait BelongsToTenant
{
    public static function bootBelongsToTenant(): void
    {
        // Automatically scope all queries to current tenant
        static::addGlobalScope('tenant', function (Builder $builder) {
            if ($tenant = Organisation::current()) {
                $builder->where($builder->getQuery()->from.'.organisation_id', $tenant->id);
            }
        });

        // Automatically set organisation_id when creating
        static::creating(function ($model) {
            if ($tenant = Organisation::current()) {
                $model->organisation_id = $tenant->id;
            }
        });
    }

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }
}
