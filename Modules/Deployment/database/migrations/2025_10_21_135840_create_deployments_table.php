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
        Schema::create('deployments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('customer_id');
            $table->uuid('website_id');
            $table->string('webhook_token')->unique();
            $table->uuid('created_by')->nullable();
            $table->timestamps();

            $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('cascade');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deployments');
    }
};
