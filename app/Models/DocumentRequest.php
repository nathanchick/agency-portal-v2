<?php

namespace App\Models;

use App\Traits\DispatchesWebhooks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DocumentRequest extends Model
{
    use HasUuids, DispatchesWebhooks;

    protected $fillable = [
        'organisation_id',
        'customer_id',
        'user_id',
        'cc_email',
        'cc_name',
        'document_id',
        'content',
        'notes',
        'uploaded_file',
        'requires_approval',
        'scheduled_send_at',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
        'requires_approval' => 'boolean',
        'scheduled_send_at' => 'datetime',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function history(): HasMany
    {
        return $this->hasMany(DocumentHistory::class);
    }
}
