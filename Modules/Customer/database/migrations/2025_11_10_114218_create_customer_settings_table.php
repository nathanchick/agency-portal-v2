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
        Schema::create('customer_settings', function (Blueprint $table) {
            $table->id();
            $table->uuid('customer_id');
            $table->string('module'); // e.g., 'Xero', 'Harvest'
            $table->string('key'); // e.g., 'override_tenant_id'
            $table->text('value')->nullable(); // encrypted or plain value
            $table->string('type')->default('text'); // yes_no, encrypted, text, textarea, number
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->unique(['customer_id', 'module', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_settings');
    }
};
