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
        Schema::create('integration_mappings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('organisation_id')->constrained()->cascadeOnDelete();
            $table->string('integration_source'); // 'harvest', 'toggl', 'clockify', etc.
            $table->string('external_id'); // The ID from the external system
            $table->string('internal_model'); // 'Customer', 'Service', 'Task', 'TimeEntry'
            $table->uuid('internal_id'); // The UUID in our system
            $table->json('metadata')->nullable(); // Store any extra data
            $table->timestamps();

            $table->unique(['integration_source', 'external_id', 'internal_model', 'organisation_id'], 'integration_mappings_unique');
            $table->index(['organisation_id', 'integration_source', 'internal_model']);
            $table->index('internal_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('integration_mappings');
    }
};
