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
        Schema::create('github_oauth_tokens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id')->unique();
            $table->text('access_token'); // Encrypted via model
            $table->text('refresh_token')->nullable(); // Encrypted via model
            $table->string('token_type', 50)->default('bearer');
            $table->text('scope')->nullable();
            $table->timestamp('access_token_expires_at')->nullable();
            $table->bigInteger('github_installation_id')->nullable();
            $table->string('github_account_login', 255)->nullable();
            $table->string('github_account_type', 50)->nullable(); // 'User' or 'Organization'
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
        Schema::dropIfExists('github_oauth_tokens');
    }
};
