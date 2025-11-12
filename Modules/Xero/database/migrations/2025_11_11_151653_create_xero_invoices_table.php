<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Store invoices synced from Xero or created in Xero from the portal.
     * This table maintains a local copy of invoice data for display and tracking.
     */
    public function up(): void
    {
        Schema::create('xero_invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('customer_id');

            // Xero identifiers
            $table->string('xero_invoice_id')->unique();
            $table->string('xero_invoice_number')->nullable();

            // Invoice type and status
            $table->string('invoice_type')->index(); // ACCREC (Accounts Receivable), ACCPAY (Accounts Payable)
            $table->string('status')->index(); // DRAFT, SUBMITTED, AUTHORISED, PAID, VOIDED

            // Dates
            $table->date('date');
            $table->date('due_date')->nullable();
            $table->timestamp('fully_paid_at')->nullable();

            // Financial amounts (stored in smallest currency unit for precision)
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('total_tax', 12, 2)->default(0);
            $table->decimal('total', 12, 2)->default(0);
            $table->decimal('amount_due', 12, 2)->default(0);
            $table->decimal('amount_paid', 12, 2)->default(0);

            // Currency and reference
            $table->string('currency_code', 3)->default('GBP');
            $table->string('reference')->nullable();

            // Line items stored as JSON for flexibility
            // Normalized table available in xero_invoice_line_items
            $table->json('line_items')->nullable();

            // Xero online invoice URL for customer access
            $table->string('online_invoice_url')->nullable();

            // Complete Xero API response for reference
            $table->json('raw_data')->nullable();

            // Sync tracking
            $table->timestamp('last_synced_at')->nullable();

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('organisation_id')
                ->references('id')
                ->on('organisations')
                ->onDelete('cascade');

            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade');

            // Indexes for common queries
            $table->index('organisation_id');
            $table->index('customer_id');
            $table->index(['organisation_id', 'status']);
            $table->index(['customer_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xero_invoices');
    }
};
