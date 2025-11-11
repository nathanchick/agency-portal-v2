<?php

namespace Modules\Ticket\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketSummary extends Model
{
    use HasUuids;

    protected $table = 'ticket_summaries';

    protected $fillable = [
        'ticket_id',
        'summary',
        'message_count',
        'last_message_id',
        'generated_at',
    ];

    protected $casts = [
        'generated_at' => 'datetime',
        'message_count' => 'integer',
    ];

    /**
     * Get the ticket that owns the summary
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    /**
     * Get the last message included in the summary
     */
    public function lastMessage(): BelongsTo
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }
}
