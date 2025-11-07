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
        Schema::table('ohdear_websites', function (Blueprint $table) {
            // Drop the unique constraint on website_id
            $table->dropUnique(['website_id']);

            // Add a unique constraint on the combination of website_id and ohdear_site_id
            $table->unique(['website_id', 'ohdear_site_id']);

            // Add url column to track which specific URL this monitor is for
            $table->string('url')->after('ohdear_site_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ohdear_websites', function (Blueprint $table) {
            // Reverse the changes
            $table->dropUnique(['website_id', 'ohdear_site_id']);
            $table->unique(['website_id']);
            $table->dropColumn('url');
        });
    }
};
