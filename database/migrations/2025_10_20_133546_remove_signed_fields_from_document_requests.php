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
            $table->dropForeign(['signed_by']);
            $table->dropColumn([
                'signed_at',
                'signed_by',
                'signed_user_name',
                'signed_user_email',
                'signed_ip_address',
                'signed_user_agent',
                'signed_metadata'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('document_requests', function (Blueprint $table) {
            $table->timestamp('signed_at')->nullable();
            $table->foreignUuid('signed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('signed_user_name')->nullable();
            $table->string('signed_user_email')->nullable();
            $table->string('signed_ip_address')->nullable();
            $table->string('signed_user_agent')->nullable();
            $table->json('signed_metadata')->nullable();
        });
    }
};
