<?php

namespace Coderflex\LaravelTicket\Database\Factories;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        $tableName = config('laravel_ticket.table_names.messages', 'messages');

        Schema::create($tableName['table'], function (Blueprint $table) use ($tableName) {
            $table->uuid('id')->primary();
            $table->foreignUuid($tableName['columns']['user_foreign_id'])->constrained('users')->onDelete('cascade');
            $table->foreignUuid($tableName['columns']['ticket_foreign_id'])->constrained('tickets')->onDelete('cascade');
            $table->text('message');
            $table->timestamps();
        });
    }
};
