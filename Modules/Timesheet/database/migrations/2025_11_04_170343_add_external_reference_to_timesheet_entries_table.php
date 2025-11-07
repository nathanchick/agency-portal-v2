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
        Schema::table('timesheet_time_entries', function (Blueprint $table) {
            $table->text('external_reference')->nullable()->after('timer_running');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timesheet_time_entries', function (Blueprint $table) {
            $table->dropColumn('external_reference');
        });
    }
};
