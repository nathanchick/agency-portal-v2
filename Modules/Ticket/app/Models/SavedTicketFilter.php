<?php

namespace Modules\Ticket\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedTicketFilter extends Model
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'ticket_saved_filters';

    protected $fillable = [
        'user_id',
        'organisation_id',
        'name',
        'filters',
    ];

    protected $casts = [
        'filters' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
