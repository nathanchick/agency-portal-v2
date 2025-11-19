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
        Schema::create('clickup_spaces', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->string('clickup_space_id', 255); // ClickUp's Space ID
            $table->string('clickup_team_id', 255); // Parent workspace ID
            $table->string('name', 255);
            $table->boolean('is_private')->default(false);
            $table->string('color', 50)->nullable();
            $table->text('avatar_url')->nullable();
            $table->json('metadata')->nullable(); // Store additional Space properties
            $table->timestamp('last_synced_at')->nullable();
            $table->timestamps();

            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            $table->unique(['organisation_id', 'clickup_space_id'], 'unique_space_per_org');
            $table->index('organisation_id');
            $table->index('clickup_space_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clickup_spaces');
    }
};
