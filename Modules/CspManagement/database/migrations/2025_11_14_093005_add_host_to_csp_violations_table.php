<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('csp_violations', function (Blueprint $table) {
            $table->string('host', 255)->nullable()->after('directive');
            $table->index(['customer_id', 'directive', 'host'], 'idx_customer_directive_host');
        });

        // Backfill existing records by extracting host from raw_report or blocked_uri
        DB::statement("
            UPDATE csp_violations
            SET host = COALESCE(
                raw_report->>'host',
                SUBSTRING(blocked_uri FROM '(?:.*://)?(?:www\.)?([^/:]+)')
            )
            WHERE host IS NULL
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('csp_violations', function (Blueprint $table) {
            $table->dropIndex('idx_customer_directive_host');
            $table->dropColumn('host');
        });
    }
};
