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
        Schema::create('timesheet_service_budget_changes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('service_id')->constrained('timesheet_services')->cascadeOnDelete();
            $table->foreignUuid('changed_by')->constrained('users')->cascadeOnDelete();
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->decimal('old_budget_hours', 10, 2)->nullable();
            $table->decimal('new_budget_hours', 10, 2);
            $table->decimal('old_budget_amount', 10, 2)->nullable();
            $table->decimal('new_budget_amount', 10, 2)->nullable();
            $table->text('reason');
            $table->timestamps();

            $table->index(['service_id', 'effective_from']);
            $table->index('changed_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timesheet_service_budget_changes');
    }
};
