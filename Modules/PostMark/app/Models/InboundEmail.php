<?php

namespace Modules\PostMark\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;
use Modules\Ticket\Models\Message;
use Modules\Ticket\Models\Ticket;

class InboundEmail extends Model
{
    use BelongsToTenant;
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'user_id',
        'customer_id',
        'ticket_id',
        'message_id',
        'postmark_message_id',
        'from_email',
        'from_name',
        'to_email',
        'subject',
        'text_body',
        'html_body',
        'stripped_text_reply',
        'is_reply',
        'in_reply_to',
        'references',
        'raw_headers',
        'raw_payload',
        'processing_status',
        'error_message',
        'processed_at',
    ];

    protected $casts = [
        'is_reply' => 'boolean',
        'raw_headers' => 'array',
        'raw_payload' => 'array',
        'processed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Accessor to determine if this is a reply based on StrippedTextReply
     */
    public function getIsReplyAttribute(): bool
    {
        return ! empty($this->stripped_text_reply) || ! empty($this->in_reply_to);
    }

    /**
     * Relationships
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    /**
     * Scopes
     */
    public function scopePending($query)
    {
        return $query->where('processing_status', 'pending');
    }

    public function scopeProcessing($query)
    {
        return $query->where('processing_status', 'processing');
    }

    public function scopeProcessed($query)
    {
        return $query->where('processing_status', 'processed');
    }

    public function scopeFailed($query)
    {
        return $query->where('processing_status', 'failed');
    }

    public function scopeBounced($query)
    {
        return $query->where('processing_status', 'bounced');
    }

    /**
     * Mark as processing
     */
    public function markAsProcessing(): void
    {
        $this->update(['processing_status' => 'processing']);
    }

    /**
     * Mark as processed
     */
    public function markAsProcessed(?Ticket $ticket = null, ?Message $message = null): void
    {
        $this->update([
            'processing_status' => 'processed',
            'ticket_id' => $ticket?->id,
            'message_id' => $message?->id,
            'processed_at' => now(),
        ]);
    }

    /**
     * Mark as failed
     */
    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'processing_status' => 'failed',
            'error_message' => $errorMessage,
        ]);
    }

    /**
     * Mark as bounced
     */
    public function markAsBounced(string $reason): void
    {
        $this->update([
            'processing_status' => 'bounced',
            'error_message' => $reason,
        ]);
    }
}
