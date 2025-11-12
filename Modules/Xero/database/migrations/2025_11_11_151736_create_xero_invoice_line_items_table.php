<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Store individual line items for invoices in a normalized format.
     * Provides better queryability compared to JSON storage alone.
     */
    public function up(): void
    {
        Schema::create('xero_invoice_line_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('xero_invoice_id');

            // Xero identifier (may be null for newly created items)
            $table->string('xero_line_item_id')->nullable();

            // Line item details
            $table->text('description');
            $table->decimal('quantity', 10, 2);
            $table->decimal('unit_amount', 12, 2);

            // Xero accounting codes
            $table->string('account_code')->nullable();
            $table->string('item_code')->nullable();

            // Tax information
            $table->string('tax_type')->nullable();
            $table->decimal('tax_amount', 12, 2)->default(0);

            // Calculated amount
            $table->decimal('line_amount', 12, 2);

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('xero_invoice_id')
                ->references('id')
                ->on('xero_invoices')
                ->onDelete('cascade');

            // Index for invoice queries
            $table->index('xero_invoice_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xero_invoice_line_items');
    }
};
