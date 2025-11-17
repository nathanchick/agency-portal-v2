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
        Schema::create('csp_violations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignUuid('website_id')->nullable()->constrained('websites')->onDelete('cascade');

            // Violation details (from CSP report JSON)
            $table->string('directive')->index(); // e.g., 'connect-src', 'frame-src', 'img-src'
            $table->text('blocked_uri');          // The URI that was blocked
            $table->text('document_uri');         // Page where violation occurred
            $table->string('violated_directive'); // Full directive that was violated
            $table->string('effective_directive')->nullable();
            $table->text('source_file')->nullable();
            $table->integer('line_number')->nullable();
            $table->integer('column_number')->nullable();
            $table->string('disposition')->default('enforce'); // 'enforce' or 'report'

            // Status and decision tracking
            $table->enum('status', ['new', 'approved', 'rejected', 'ignored'])->default('new')->index();
            $table->foreignUuid('decided_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('decided_at')->nullable();
            $table->text('decision_notes')->nullable();

            // Aggregation fields
            $table->integer('occurrence_count')->default(1);
            $table->timestamp('first_seen_at')->index();
            $table->timestamp('last_seen_at')->index();

            // Full CSP report JSON for reference
            $table->json('raw_report')->nullable();

            $table->timestamps();

            // Composite index for finding duplicates
            $table->index(['customer_id', 'directive', 'blocked_uri', 'document_uri'], 'csp_dedup_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csp_violations');
    }
};
