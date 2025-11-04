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
        Schema::create('timesheet_services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('organisation_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->foreignUuid('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('status', ['Active', 'Archived', 'Completed'])->default('Active');
            $table->enum('billing_type', ['Hourly', 'FixedFee', 'NonBillable'])->default('Hourly');
            $table->enum('budget_period', ['Monthly', 'Quarterly', 'Yearly', 'OneTime'])->default('Monthly');
            $table->decimal('current_budget_hours', 10, 2)->nullable();
            $table->decimal('current_budget_amount', 10, 2)->nullable();
            $table->boolean('budget_include_expenses')->default(false);
            $table->boolean('budget_rollover_enabled')->default(false);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('default_hourly_rate', 10, 2)->nullable();
            $table->foreignUuid('service_manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['organisation_id', 'customer_id']);
            $table->index(['organisation_id', 'status']);
            $table->index('service_manager_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timesheet_services');
    }
};
