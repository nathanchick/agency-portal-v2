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
        Schema::create('csp_violation_analyses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->onDelete('cascade');
            $table->string('host'); // The violated host
            $table->string('directive'); // CSP directive (e.g., 'style-src-elem')
            $table->json('blocked_urls'); // Array of blocked URLs analyzed together
            $table->string('trust_assessment')->nullable(); // 'trusted', 'caution', 'risky', 'unknown'
            $table->string('risk_level')->nullable(); // 'low', 'medium', 'high'
            $table->json('findings')->nullable(); // Detailed analysis from OpenAI
            $table->json('recommendations')->nullable(); // Array of recommendation strings
            $table->integer('tokens_used')->nullable(); // For cost tracking
            $table->decimal('cost', 10, 6)->nullable(); // For cost tracking
            $table->string('model')->nullable(); // Model used for analysis
            $table->timestamps();

            // Indexes for performance
            $table->index('customer_id');
            $table->index('host');
            $table->index('directive');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csp_violation_analyses');
    }
};
