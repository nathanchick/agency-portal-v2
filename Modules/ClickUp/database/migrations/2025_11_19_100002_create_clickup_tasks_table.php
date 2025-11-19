<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clickup_tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('ticket_id'); // Link to portal ticket
            $table->string('clickup_task_id', 255)->unique();
            $table->string('clickup_list_id', 255);
            $table->string('clickup_space_id', 255);
            $table->string('name', 500);
            $table->text('description')->nullable();
            $table->string('status', 100)->nullable();
            $table->integer('priority')->nullable(); // 1=urgent, 2=high, 3=normal, 4=low
            $table->text('url')->nullable(); // ClickUp task URL
            $table->timestamps();

            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            $table->foreign('ticket_id')
                ->references('id')
                ->on('tickets')
                ->onDelete('cascade');

            $table->index('organisation_id');
            $table->index('ticket_id');
            $table->index('clickup_task_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clickup_tasks');
    }
};
