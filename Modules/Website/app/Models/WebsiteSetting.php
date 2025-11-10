<?php

namespace Modules\Website\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Crypt;

class WebsiteSetting extends Model
{
    protected $fillable = [
        'website_id',
        'module',
        'key',
        'value',
        'type',
    ];

    /**
     * Get the website that owns the setting.
     */
    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }

    /**
     * Get the decrypted value if the type is encrypted.
     */
    protected function value(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                if ($this->type === 'encrypted' && $value) {
                    try {
                        return Crypt::decryptString($value);
                    } catch (\Exception $e) {
                        return $value;
                    }
                }
                return $value;
            },
            set: function ($value) {
                if ($this->type === 'encrypted' && $value) {
                    return Crypt::encryptString($value);
                }
                return $value;
            }
        );
    }
}
