<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Link budget periods to Xero invoices created during reconciliation.
     * When a period is reconciled with "invoice_separately" action and
     * Xero integration enabled, this stores the reference to the created invoice.
     */
    public function up(): void
    {
        Schema::table('timesheet_service_budget_periods', function (Blueprint $table) {
            $table->uuid('xero_invoice_id')
                ->nullable()
                ->after('reconciliation_notes');

            $table->foreign('xero_invoice_id')
                ->references('id')
                ->on('xero_invoices')
                ->onDelete('set null');

            $table->index('xero_invoice_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timesheet_service_budget_periods', function (Blueprint $table) {
            $table->dropForeign(['xero_invoice_id']);
            $table->dropIndex(['xero_invoice_id']);
            $table->dropColumn('xero_invoice_id');
        });
    }
};
