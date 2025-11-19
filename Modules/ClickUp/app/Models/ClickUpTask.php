<?php

namespace Modules\ClickUp\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;
use Modules\Ticket\Models\Ticket;

class ClickUpTask extends Model
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'clickup_tasks';

    protected $fillable = [
        'organisation_id',
        'ticket_id',
        'clickup_task_id',
        'clickup_list_id',
        'clickup_space_id',
        'name',
        'description',
        'status',
        'priority',
        'url',
    ];

    protected $casts = [
        'priority' => 'integer',
    ];

    /**
     * Get the organisation that owns the task
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Get the ticket associated with this ClickUp task
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    /**
     * Get the full ClickUp task URL
     */
    public function getClickUpUrlAttribute(): string
    {
        if ($this->url) {
            return $this->url;
        }

        // Construct URL from task ID if not stored
        return "https://app.clickup.com/t/{$this->clickup_task_id}";
    }
}
