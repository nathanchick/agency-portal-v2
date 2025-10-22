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
        Schema::create('deployment_history', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('deployment_id'); // References the webhook configuration
            $table->string('git_tag')->nullable();
            $table->string('git_commit_sha')->nullable();
            $table->string('git_branch')->nullable();
            $table->enum('status', ['success', 'failed', 'pending'])->default('pending');
            $table->json('payload')->nullable();
            $table->timestamp('deployed_at')->nullable();
            $table->timestamps();

            $table->foreign('deployment_id')->references('id')->on('deployments')->onDelete('cascade');

            // Index for faster lookups
            $table->index(['deployment_id', 'git_commit_sha', 'git_branch']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deployment_history');
    }
};
