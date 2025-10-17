<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentRequest extends Model
{
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'customer_id',
        'document_id',
        'content',
        'status',
        'signed_at',
        'signed_by',
        'signed_user_name',
        'signed_user_email',
        'signed_ip_address',
        'signed_user_agent',
        'signed_metadata',
    ];

    protected $casts = [
        'status' => 'string',
        'signed_at' => 'datetime',
        'signed_metadata' => 'array',
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

    public function signedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'signed_by');
    }
}
