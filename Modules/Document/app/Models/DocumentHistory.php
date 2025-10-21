<?php

namespace Modules\Document\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentHistory extends Model
{
    use HasUuids;

    protected $table = 'document_history';

    protected $fillable = [
        'document_request_id',
        'action',
        'user_id',
        'user_name',
        'user_email',
        'ip_address',
        'user_agent',
        'meta_data',
    ];

    protected $casts = [
        'meta_data' => 'array',
    ];

    public function documentRequest(): BelongsTo
    {
        return $this->belongsTo(DocumentRequest::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
