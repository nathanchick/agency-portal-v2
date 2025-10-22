<?php

namespace Modules\Deployment\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeploymentHistory extends Model
{
    use HasFactory, HasUuids;

    /**
     * The table associated with the model.
     */
    protected $table = 'deployment_history';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'deployment_id',
        'git_tag',
        'git_commit_sha',
        'git_branch',
        'status',
        'payload',
        'deployed_at',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'payload' => 'array',
        'deployed_at' => 'datetime',
    ];

    /**
     * Get the deployment configuration that owns this history record
     */
    public function deployment()
    {
        return $this->belongsTo(Deployment::class);
    }
}
