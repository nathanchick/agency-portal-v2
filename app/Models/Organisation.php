<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\Multitenancy\Models\Concerns\ImplementsTenant;
use Spatie\Multitenancy\Contracts\IsTenant;

class Organisation extends Model implements IsTenant
{
    use HasUuids, ImplementsTenant;

    protected $fillable = [
        'name',
        'logo',
        'primary_color',
        'secondary_color',
        'billing_email',
        'billing_address1',
        'billing_address2',
        'billing_city',
        'billing_state',
        'billing_zip',
        'billing_country',
        'vat_number',
        'status',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function documentRequests()
    {
        return $this->hasMany(DocumentRequest::class);
    }
}
