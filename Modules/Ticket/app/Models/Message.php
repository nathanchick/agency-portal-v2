<?php

namespace Modules\Ticket\Models;

use Coderflex\LaravelTicket\Models\Message as BaseMessage;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Message extends BaseMessage
{
    use HasUuids;

    protected $table = 'ticket_messages';

    protected $fillable = [
        'user_id',
        'ticket_id',
        'message',
        'is_private',
    ];
}
