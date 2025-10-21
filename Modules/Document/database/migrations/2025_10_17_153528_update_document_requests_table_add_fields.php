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
        Schema::table('document_requests', function (Blueprint $table) {
            // Add user_id to track who the document was sent to
            $table->foreignUuid('user_id')->nullable()->after('customer_id')->constrained('users')->onDelete('cascade');

            // Update status enum to include new statuses
            $table->dropColumn('status');
        });

        Schema::table('document_requests', function (Blueprint $table) {
            $table->enum('status', ['completed', 'processing', 'not_sent', 'void'])->default('not_sent')->after('content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('document_requests', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });

        Schema::table('document_requests', function (Blueprint $table) {
            $table->enum('status', ['pending', 'signed', 'rejected'])->default('pending')->after('content');
        });
    }
};
