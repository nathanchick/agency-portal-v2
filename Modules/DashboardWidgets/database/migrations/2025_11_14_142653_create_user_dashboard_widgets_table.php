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
        Schema::create('user_dashboard_widgets', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->uuid('organisation_id')->nullable();
            $table->uuid('customer_id')->nullable();
            $table->string('widget_key');
            $table->integer('position')->default(0);
            $table->integer('width')->default(1);
            $table->json('settings')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('cascade');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');

            // Unique constraint to prevent duplicate widgets
            $table->unique(['user_id', 'organisation_id', 'customer_id', 'widget_key'], 'user_widget_unique');

            // Indexes for performance
            $table->index(['user_id', 'organisation_id', 'customer_id'], 'user_context_index');
            $table->index('position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_dashboard_widgets');
    }
};
