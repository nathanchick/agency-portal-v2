<?php

namespace Modules\Ticket\Models;

use App\Models\Concerns\BelongsToTenant;
use Coderflex\LaravelTicket\Models\Category as BaseCategory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends BaseCategory
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'ticket_categories';

    protected $fillable = [
        'organisation_id',
        'form_id',
        'name',
        'slug',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(TicketForm::class, 'form_id');
    }
}
