<?php

namespace Coderflex\LaravelTicket\Database\Factories;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        $tableName = config('laravel_ticket.table_names.category_ticket', 'category_ticket');
        $categoriesTable = config('laravel_ticket.table_names.categories', 'categories');
        $ticketsTable = config('laravel_ticket.table_names.tickets', 'tickets');

        Schema::create($tableName['table'], function (Blueprint $table) use ($tableName, $categoriesTable, $ticketsTable) {
            // Add foreign key for category
            $table->foreignUuid($tableName['columns']['category_foreign_id'])
                ->constrained($categoriesTable)
                ->onDelete('cascade');

            // Add foreign key for ticket
            $table->foreignUuid($tableName['columns']['ticket_foreign_id'])
                ->constrained($ticketsTable)
                ->onDelete('cascade');

            $table->primary(array_values($tableName['columns']));
        });
    }
};
