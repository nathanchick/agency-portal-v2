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
        Schema::table('timesheet_service_user', function (Blueprint $table) {
            $table->boolean('use_default_rates')->default(true)->after('user_id');
            $table->decimal('hourly_rate', 10, 2)->nullable()->after('use_default_rates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timesheet_service_user', function (Blueprint $table) {
            $table->dropColumn(['use_default_rates', 'hourly_rate']);
        });
    }
};
