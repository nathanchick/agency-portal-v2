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
        Schema::create('document_requests', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('organisation_id')->constrained('organisations')->onDelete('cascade');
            $table->foreignUuid('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignUuid('document_id')->constrained('documents')->onDelete('cascade');
            $table->longText('content')->nullable();
            $table->enum('status', ['pending', 'signed', 'rejected'])->default('pending');
            $table->timestamp('signed_at')->nullable();
            $table->foreignUuid('signed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('signed_user_name')->nullable();
            $table->string('signed_user_email')->nullable();
            $table->string('signed_ip_address')->nullable();
            $table->string('signed_user_agent')->nullable();
            $table->json('signed_metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_requests');
    }
};
