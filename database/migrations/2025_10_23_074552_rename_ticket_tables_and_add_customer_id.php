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
        // Step 1: Drop foreign keys on pivot tables
        Schema::table('category_ticket', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['ticket_id']);
        });

        Schema::table('label_ticket', function (Blueprint $table) {
            $table->dropForeign(['label_id']);
            $table->dropForeign(['ticket_id']);
        });

        Schema::table('messages', function (Blueprint $table) {
            $table->dropForeign(['ticket_id']);
        });

        // Step 2: Rename all tables
        Schema::rename('messages', 'ticket_messages');
        Schema::rename('labels', 'ticket_labels');
        Schema::rename('categories', 'ticket_categories');
        Schema::rename('category_ticket', 'ticket_category_ticket');
        Schema::rename('label_ticket', 'ticket_label_ticket');

        // Step 3: Add customer_id to tickets table
        Schema::table('tickets', function (Blueprint $table) {
            $table->foreignUuid('customer_id')->nullable()->after('organisation_id')->constrained()->onDelete('cascade');
        });

        // Step 4: Recreate foreign keys with updated table names
        Schema::table('ticket_category_ticket', function (Blueprint $table) {
            $table->foreign('category_id')->references('id')->on('ticket_categories')->onDelete('cascade');
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });

        Schema::table('ticket_label_ticket', function (Blueprint $table) {
            $table->foreign('label_id')->references('id')->on('ticket_labels')->onDelete('cascade');
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });

        Schema::table('ticket_messages', function (Blueprint $table) {
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop foreign keys
        Schema::table('ticket_category_ticket', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['ticket_id']);
        });

        Schema::table('ticket_label_ticket', function (Blueprint $table) {
            $table->dropForeign(['label_id']);
            $table->dropForeign(['ticket_id']);
        });

        Schema::table('ticket_messages', function (Blueprint $table) {
            $table->dropForeign(['ticket_id']);
        });

        // Remove customer_id from tickets
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropColumn('customer_id');
        });

        // Rename tables back
        Schema::rename('ticket_messages', 'messages');
        Schema::rename('ticket_labels', 'labels');
        Schema::rename('ticket_categories', 'categories');
        Schema::rename('ticket_category_ticket', 'category_ticket');
        Schema::rename('ticket_label_ticket', 'label_ticket');

        // Recreate original foreign keys
        Schema::table('category_ticket', function (Blueprint $table) {
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });

        Schema::table('label_ticket', function (Blueprint $table) {
            $table->foreign('label_id')->references('id')->on('labels')->onDelete('cascade');
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });

        Schema::table('messages', function (Blueprint $table) {
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });
    }
};
