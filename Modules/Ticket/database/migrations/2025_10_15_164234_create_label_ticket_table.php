<?php

namespace Coderflex\LaravelTicket\Database\Factories;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        $tableName = config('laravel_ticket.table_names.label_ticket', 'label_ticket');
        $labelsTable = config('laravel_ticket.table_names.labels', 'labels');
        $ticketsTable = config('laravel_ticket.table_names.tickets', 'tickets');

        Schema::create($tableName['table'], function (Blueprint $table) use ($tableName, $labelsTable, $ticketsTable) {
            // Add foreign key for label
            $table->foreignUuid($tableName['columns']['label_foreign_id'])
                ->constrained($labelsTable)
                ->onDelete('cascade');

            // Add foreign key for ticket
            $table->foreignUuid($tableName['columns']['ticket_foreign_id'])
                ->constrained($ticketsTable)
                ->onDelete('cascade');

            $table->primary(array_values($tableName['columns']));
        });
    }
};
