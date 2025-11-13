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
        Schema::table('xero_invoice_line_items', function (Blueprint $table) {
            $table->integer('line_order')->default(1)->after('line_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('xero_invoice_line_items', function (Blueprint $table) {
            $table->dropColumn('line_order');
        });
    }
};
