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
        Schema::create('csp_violation_decisions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('csp_violation_id')->constrained('csp_violations')->onDelete('cascade');

            // Action details
            $table->enum('action', ['approved', 'rejected', 'ignored', 'reopened']);
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('user_name');
            $table->string('user_email');

            // Audit trail
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->text('notes')->nullable();
            $table->json('meta_data')->nullable();

            $table->timestamps();

            // Indexes for audit queries
            $table->index('csp_violation_id');
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csp_violation_decisions');
    }
};
