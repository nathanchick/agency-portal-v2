<?php

namespace Modules\CspManagement\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CspViolationDecision extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'csp_violation_id',
        'action',
        'user_id',
        'user_name',
        'user_email',
        'ip_address',
        'user_agent',
        'notes',
        'meta_data',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'meta_data' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the violation that this decision belongs to.
     */
    public function violation(): BelongsTo
    {
        return $this->belongsTo(CspViolation::class, 'csp_violation_id');
    }

    /**
     * Get the user who made this decision.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
