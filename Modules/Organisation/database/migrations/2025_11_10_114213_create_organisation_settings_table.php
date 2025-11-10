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
        Schema::create('organisation_settings', function (Blueprint $table) {
            $table->id();
            $table->uuid('organisation_id');
            $table->string('module'); // e.g., 'Xero', 'Harvest'
            $table->string('key'); // e.g., 'XERO_TENANT_ID', 'status'
            $table->text('value')->nullable(); // encrypted or plain value
            $table->string('type')->default('text'); // yes_no, encrypted, text, textarea, number
            $table->timestamps();

            $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('cascade');
            $table->unique(['organisation_id', 'module', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organisation_settings');
    }
};
