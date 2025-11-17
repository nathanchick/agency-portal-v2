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
        Schema::table('projects', function (Blueprint $table) {
            $table->uuid('github_repository_id')->nullable()->after('is_default');

            $table->foreign('github_repository_id')
                ->references('id')
                ->on('github_repositories')
                ->onDelete('set null');

            $table->unique('github_repository_id');
            $table->index('github_repository_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign(['github_repository_id']);
            $table->dropIndex(['github_repository_id']);
            $table->dropUnique(['github_repository_id']);
            $table->dropColumn('github_repository_id');
        });
    }
};
