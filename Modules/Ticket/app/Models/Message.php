<?php

namespace Modules\Ticket\Models;

use Coderflex\LaravelTicket\Models\Message as BaseMessage;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Message extends BaseMessage implements HasMedia
{
    use HasUuids;
    use InteractsWithMedia;

    protected $table = 'ticket_messages';

    protected $fillable = [
        'user_id',
        'ticket_id',
        'message',
        'is_private',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments')
             ->acceptsMimeTypes([
                 'image/jpeg', 'image/png', 'image/gif', 'image/webp',
                 'application/pdf',
                 'application/zip',
                 'text/plain', 'text/csv',
                 'application/vnd.ms-excel',
                 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                 'application/msword',
                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
             ]);
        // Note: File size limit (10MB) is controlled globally in config/media-library.php
    }
}
