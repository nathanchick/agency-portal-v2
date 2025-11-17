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
        Schema::create('github_repositories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->bigInteger('github_repo_id')->unique();
            $table->string('owner', 255);
            $table->string('name', 255);
            $table->string('full_name', 512);
            $table->text('description')->nullable();
            $table->boolean('is_private')->default(false);
            $table->boolean('is_fork')->default(false);
            $table->string('default_branch', 255)->default('main');
            $table->text('html_url')->nullable();
            $table->text('clone_url')->nullable();
            $table->string('language', 100)->nullable();
            $table->integer('stars_count')->default(0);
            $table->integer('forks_count')->default(0);
            $table->integer('open_issues_count')->default(0);
            $table->integer('watchers_count')->default(0);
            $table->integer('size_kb')->default(0);
            $table->timestamp('pushed_at')->nullable();
            $table->timestamp('github_created_at')->nullable();
            $table->timestamp('github_updated_at')->nullable();
            $table->timestamp('last_synced_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            $table->unique(['organisation_id', 'full_name']);
            $table->index('organisation_id');
            $table->index('full_name');
            $table->index('github_repo_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('github_repositories');
    }
};
