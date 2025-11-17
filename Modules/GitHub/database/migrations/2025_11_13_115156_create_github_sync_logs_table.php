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
        Schema::create('github_sync_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('repository_id')->nullable();
            $table->string('sync_type', 100); // e.g., 'fetch_repos', 'sync_metadata'
            $table->string('status', 50); // 'pending', 'success', 'failed'
            $table->text('message')->nullable();
            $table->json('error_details')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            $table->foreign('repository_id')
                ->references('id')
                ->on('github_repositories')
                ->onDelete('cascade');

            $table->index('organisation_id');
            $table->index('repository_id');
            $table->index('sync_type');
            $table->index('status');
            $table->index('started_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('github_sync_logs');
    }
};
