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
        Schema::create('timesheet_scheduled_reports', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('saved_report_id');
            $table->uuid('created_by');
            $table->json('recipients'); // array of email addresses
            $table->enum('schedule_frequency', ['daily', 'weekly', 'monthly']);
            $table->integer('schedule_day')->nullable(); // 0-6 for weekly, 1-31 for monthly
            $table->time('schedule_time'); // HH:MM
            $table->timestamp('last_sent_at')->nullable();
            $table->timestamp('next_run_at');
            $table->boolean('is_active')->default(true);
            $table->enum('format', ['csv', 'pdf'])->default('csv');
            $table->timestamps();

            $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('cascade');
            $table->foreign('saved_report_id')->references('id')->on('timesheet_saved_reports')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');

            $table->index('organisation_id');
            $table->index('next_run_at');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timesheet_scheduled_reports');
    }
};
