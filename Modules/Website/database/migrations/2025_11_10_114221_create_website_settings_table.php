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
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();
            $table->uuid('website_id');
            $table->string('module'); // e.g., 'Xero', 'Harvest'
            $table->string('key'); // e.g., 'tracking_enabled'
            $table->text('value')->nullable(); // encrypted or plain value
            $table->string('type')->default('text'); // yes_no, encrypted, text, textarea, number
            $table->timestamps();

            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->unique(['website_id', 'module', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_settings');
    }
};
