<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Store OAuth 2.0 tokens for Xero API authentication.
     * Each organisation has one set of tokens that need periodic refresh.
     */
    public function up(): void
    {
        Schema::create('xero_oauth_tokens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id')->unique();

            // OAuth tokens - encrypted at application level in model
            $table->text('access_token');
            $table->text('refresh_token');

            // Token expiry tracking
            $table->timestamp('access_token_expires_at');
            $table->timestamp('refresh_token_expires_at');

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            // Index for quick lookups by organisation
            $table->index('organisation_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xero_oauth_tokens');
    }
};
