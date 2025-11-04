<?php

namespace Modules\Ticket\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TicketForm extends Model
{
    use BelongsToTenant, HasUuids;

    protected $fillable = [
        'organisation_id',
        'name',
        'content',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'form_id');
    }
}
