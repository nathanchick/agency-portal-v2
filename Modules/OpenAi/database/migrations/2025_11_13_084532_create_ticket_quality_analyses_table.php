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
        Schema::create('ticket_quality_analyses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('ticket_id')->nullable()->constrained('tickets')->onDelete('cascade');
            $table->foreignUuid('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignUuid('website_id')->nullable()->constrained('websites')->onDelete('set null');
            $table->json('analysis_data'); // Original ticket data analyzed (PII redacted)
            $table->json('suggestions'); // AI suggestions provided
            $table->json('accepted_suggestions')->nullable(); // Which suggestions user accepted
            $table->json('dismissed_suggestions')->nullable(); // Which suggestions user dismissed
            $table->integer('tokens_used')->nullable(); // For cost tracking
            $table->decimal('estimated_cost', 10, 6)->nullable(); // For cost tracking
            $table->timestamps();

            // Indexes for performance
            $table->index('customer_id');
            $table->index('website_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_quality_analyses');
    }
};
