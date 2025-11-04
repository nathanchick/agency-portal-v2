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
        Schema::create('ticket_forms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('organisation_id')->constrained('organisations')->onDelete('cascade');
            $table->string('name');
            $table->longText('content')->nullable(); // JSON form builder content
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        // Add form_id to ticket_categories table
        Schema::table('ticket_categories', function (Blueprint $table) {
            $table->foreignUuid('form_id')->nullable()->after('organisation_id')->constrained('ticket_forms')->onDelete('set null');
        });

        // Add metadata to tickets table
        Schema::table('tickets', function (Blueprint $table) {
            $table->json('metadata')->nullable()->after('assigned_to');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn('metadata');
        });

        Schema::table('ticket_categories', function (Blueprint $table) {
            $table->dropForeign(['form_id']);
            $table->dropColumn('form_id');
        });

        Schema::dropIfExists('ticket_forms');
    }
};
