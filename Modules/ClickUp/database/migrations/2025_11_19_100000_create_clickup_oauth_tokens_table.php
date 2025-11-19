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
        Schema::create('clickup_oauth_tokens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id')->unique(); // One token per organisation
            $table->text('access_token'); // Encrypted via model
            $table->text('refresh_token')->nullable(); // Encrypted via model (not currently used by ClickUp)
            $table->string('token_type', 50)->default('Bearer');
            $table->text('scope')->nullable();
            $table->timestamp('access_token_expires_at')->nullable(); // Currently NULL (tokens don't expire)
            $table->string('clickup_team_id', 255)->nullable(); // Primary ClickUp workspace/team ID
            $table->string('clickup_team_name', 255)->nullable();
            $table->string('clickup_account_email', 255)->nullable();
            $table->timestamps();

            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            $table->index('organisation_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clickup_oauth_tokens');
    }
};
