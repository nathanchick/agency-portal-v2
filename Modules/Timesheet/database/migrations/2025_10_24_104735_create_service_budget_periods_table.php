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
        Schema::create('timesheet_service_budget_periods', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('service_id')->constrained('timesheet_services')->cascadeOnDelete();
            $table->date('period_start');
            $table->date('period_end');
            $table->decimal('budget_hours', 10, 2);
            $table->decimal('budget_amount', 10, 2)->nullable();
            $table->decimal('hours_used', 10, 2)->default(0);
            $table->decimal('amount_used', 10, 2)->default(0);
            $table->decimal('hours_rollover_from_previous', 10, 2)->default(0);
            $table->decimal('hours_rollover_to_next', 10, 2)->nullable();
            $table->boolean('reconciled')->default(false);
            $table->foreignUuid('reconciled_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reconciled_at')->nullable();
            $table->enum('reconciliation_action', ['rollover', 'lose', 'invoice_separately', 'deduct_next'])->nullable();
            $table->text('reconciliation_notes')->nullable();
            $table->timestamps();

            $table->index(['service_id', 'period_start']);
            $table->index(['service_id', 'reconciled']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timesheet_service_budget_periods');
    }
};
