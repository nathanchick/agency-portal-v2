<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Track all synchronization operations with Xero API.
     * Provides audit trail and helps diagnose integration issues.
     */
    public function up(): void
    {
        Schema::create('xero_sync_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');

            // Type of sync operation
            $table->string('sync_type')->index(); // fetch_invoices, create_invoice, update_invoice, refresh_token

            // Operation status
            $table->string('status')->index(); // success, failed, partial

            // Human-readable message
            $table->text('message')->nullable();

            // Statistics
            $table->integer('records_processed')->default(0);
            $table->integer('records_succeeded')->default(0);
            $table->integer('records_failed')->default(0);

            // Detailed error information for failed operations
            $table->json('error_details')->nullable();

            // Timing information
            $table->timestamp('started_at');
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            // Indexes for common queries
            $table->index('organisation_id');
            $table->index(['organisation_id', 'sync_type']);
            $table->index(['organisation_id', 'status']);
            $table->index('started_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xero_sync_logs');
    }
};
