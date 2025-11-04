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
        Schema::create('timesheet_service_task', function (Blueprint $table) {
            $table->foreignUuid('service_id')->constrained('timesheet_services')->cascadeOnDelete();
            $table->foreignUuid('task_id')->constrained('timesheet_tasks')->cascadeOnDelete();
            $table->timestamps();

            $table->primary(['service_id', 'task_id']);
            $table->index('task_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timesheet_service_task');
    }
};
