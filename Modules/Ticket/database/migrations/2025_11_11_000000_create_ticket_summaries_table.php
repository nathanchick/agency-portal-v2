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
        Schema::create('ticket_summaries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('ticket_id')->constrained('tickets')->onDelete('cascade');
            $table->text('summary');
            $table->integer('message_count')->default(0);
            $table->uuid('last_message_id')->nullable();
            $table->timestamp('generated_at');
            $table->timestamps();

            // Indexes
            $table->unique('ticket_id');
            $table->index('last_message_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_summaries');
    }
};
