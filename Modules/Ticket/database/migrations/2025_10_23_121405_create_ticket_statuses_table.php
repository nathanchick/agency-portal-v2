<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ticket_statuses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('organisation_id')->constrained('organisations')->onDelete('cascade');
            $table->string('name');
            $table->string('slug');
            $table->string('color')->default('#808080'); // hex color for badge
            $table->boolean('is_default')->default(false); // one status should be default for new tickets
            $table->boolean('is_closed')->default(false); // indicates if this status means ticket is closed
            $table->boolean('is_visible')->default(true);
            $table->integer('order')->default(0); // for sorting
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_statuses');
    }
};
