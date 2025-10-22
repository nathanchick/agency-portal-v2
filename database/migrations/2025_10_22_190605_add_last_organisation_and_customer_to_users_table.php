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
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('last_organisation_id')->nullable()->after('remember_token');
            $table->uuid('last_customer_id')->nullable()->after('last_organisation_id');

            $table->foreign('last_organisation_id')->references('id')->on('organisations')->onDelete('set null');
            $table->foreign('last_customer_id')->references('id')->on('customers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['last_organisation_id']);
            $table->dropForeign(['last_customer_id']);
            $table->dropColumn(['last_organisation_id', 'last_customer_id']);
        });
    }
};
