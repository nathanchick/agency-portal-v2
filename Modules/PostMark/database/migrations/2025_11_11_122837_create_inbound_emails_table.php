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
        Schema::create('inbound_emails', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // Foreign keys (nullable as they may not be found initially)
            $table->uuid('organisation_id')->nullable()->index();
            $table->uuid('user_id')->nullable()->index();
            $table->uuid('customer_id')->nullable()->index();
            $table->uuid('ticket_id')->nullable()->index();
            $table->uuid('message_id')->nullable()->index();

            // PostMark specific fields
            $table->string('postmark_message_id')->unique()->index();
            $table->string('from_email')->index();
            $table->string('from_name')->nullable();
            $table->string('to_email');
            $table->string('subject', 500)->nullable();
            $table->text('text_body')->nullable();
            $table->longText('html_body')->nullable();
            $table->text('stripped_text_reply')->nullable();
            $table->boolean('is_reply')->default(false)->index();

            // Threading headers
            $table->string('in_reply_to')->nullable();
            $table->text('references')->nullable(); // JSON array

            // Raw data storage
            $table->json('raw_headers')->nullable();
            $table->json('raw_payload');

            // Processing status
            $table->enum('processing_status', ['pending', 'processing', 'processed', 'failed', 'bounced'])
                  ->default('pending')
                  ->index();
            $table->text('error_message')->nullable();
            $table->timestamp('processed_at')->nullable();

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('set null');
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('set null');
            $table->foreign('message_id')->references('id')->on('ticket_messages')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inbound_emails');
    }
};
