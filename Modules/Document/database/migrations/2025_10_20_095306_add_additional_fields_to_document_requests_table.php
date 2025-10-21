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
            $table->string('cc_email')->nullable()->after('user_id');
            $table->string('cc_name')->nullable()->after('cc_email');
            $table->text('notes')->nullable()->after('content');
            $table->string('uploaded_file')->nullable()->after('notes');
            $table->boolean('requires_approval')->default(true)->after('uploaded_file');
            $table->timestamp('scheduled_send_at')->nullable()->after('requires_approval');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('document_requests', function (Blueprint $table) {
            $table->dropColumn(['cc_email', 'cc_name', 'notes', 'uploaded_file', 'requires_approval', 'scheduled_send_at']);
        });
    }
};
