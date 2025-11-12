<?php

namespace Modules\Billing\Providers;

use Illuminate\Support\Collection;
use Modules\Billing\Contracts\InvoiceProviderInterface;
use Modules\Billing\DataTransferObjects\InvoiceDTO;
use Modules\Billing\Exceptions\InvoiceNotFoundException;
use Modules\Customer\Models\Customer;
use Modules\Xero\Models\XeroInvoice;

/**
 * XeroInvoiceProvider
 *
 * Adapter that converts Xero invoices to normalized InvoiceDTO format.
 * Implements the InvoiceProviderInterface to allow Xero to be used interchangeably with other providers.
 */
class XeroInvoiceProvider implements InvoiceProviderInterface
{
    public function getProviderName(): string
    {
        return 'xero';
    }

    public function isAvailable(Customer $customer): bool
    {
        // Check if customer has Xero contact ID configured
        return ! empty($customer->xero_contact_id);
    }

    /**
     * Get all invoices for a customer.
     *
     * @return Collection<InvoiceDTO>
     */
    public function getInvoices(Customer $customer, array $filters = []): Collection
    {
        $query = XeroInvoice::where('customer_id', $customer->id)
            ->with(['lineItems'])
            ->orderBy('date', 'desc');

        // Apply filters
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['date_from'])) {
            $query->where('date', '>=', $filters['date_from']);
        }

        if (! empty($filters['date_to'])) {
            $query->where('date', '<=', $filters['date_to']);
        }

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('xero_invoice_number', 'like', "%{$search}%")
                    ->orWhere('reference', 'like', "%{$search}%");
            });
        }

        $invoices = $query->get();

        return $invoices->map(fn ($invoice) => InvoiceDTO::fromXeroInvoice($invoice));
    }

    /**
     * Get a single invoice by ID.
     *
     * @throws InvoiceNotFoundException
     */
    public function getInvoice(Customer $customer, string $invoiceId): InvoiceDTO
    {
        $invoice = XeroInvoice::where('customer_id', $customer->id)
            ->where('id', $invoiceId)
            ->with(['lineItems'])
            ->first();

        if (! $invoice) {
            throw new InvoiceNotFoundException($invoiceId, $this->getProviderName());
        }

        return InvoiceDTO::fromXeroInvoice($invoice);
    }

    /**
     * Get invoice statistics for a customer.
     */
    public function getStatistics(Customer $customer): array
    {
        $baseQuery = XeroInvoice::where('customer_id', $customer->id);

        $totalInvoices = (clone $baseQuery)->count();
        $totalPaid = (clone $baseQuery)->where('status', 'PAID')->count();
        $totalOutstanding = (clone $baseQuery)->whereIn('status', ['AUTHORISED', 'SUBMITTED'])->count();
        $totalOverdue = (clone $baseQuery)->overdue()->count();

        $paidAmount = (float) (clone $baseQuery)->where('status', 'PAID')->sum('total');
        $outstandingAmount = (float) (clone $baseQuery)->whereIn('status', ['AUTHORISED', 'SUBMITTED'])->sum('amount_due');
        $overdueAmount = (float) (clone $baseQuery)->overdue()->sum('amount_due');

        // Get currency from first invoice
        $currencyCode = (clone $baseQuery)->first()?->currency_code ?? 'GBP';

        // Calculate average time to pay (in days)
        $paidInvoices = (clone $baseQuery)
            ->where('status', 'PAID')
            ->whereNotNull('fully_paid_at')
            ->get();

        $averageDaysToPay = 0;
        if ($paidInvoices->count() > 0) {
            $totalDays = $paidInvoices->sum(function ($invoice) {
                $invoiceDate = \Carbon\Carbon::parse($invoice->date);
                $paidDate = \Carbon\Carbon::parse($invoice->fully_paid_at);
                return $invoiceDate->diffInDays($paidDate);
            });
            $averageDaysToPay = round($totalDays / $paidInvoices->count());
        }

        // Get recent invoices
        $recentInvoices = (clone $baseQuery)
            ->with(['lineItems'])
            ->orderBy('date', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($invoice) {
                $dto = InvoiceDTO::fromXeroInvoice($invoice);
                return [
                    'id' => $dto->id,
                    'invoice_number' => $dto->invoiceNumber,
                    'date' => $dto->date->toISOString(),
                    'total' => $dto->total,
                    'status' => $dto->status,
                    'is_overdue' => $dto->isOverdue(),
                    'is_paid' => $dto->isPaid(),
                ];
            });

        // Get monthly totals for last 12 months
        $monthlyTotals = (clone $baseQuery)
            ->where('date', '>=', now()->subMonths(12))
            ->get()
            ->groupBy(fn ($invoice) => $invoice->date->format('Y-m'))
            ->map(function ($invoices, $month) {
                return [
                    'month' => \Carbon\Carbon::createFromFormat('Y-m', $month)->format('M Y'),
                    'total' => $invoices->sum('total'),
                    'count' => $invoices->count(),
                ];
            })
            ->values();

        return [
            'total_invoices' => $totalInvoices,
            'total_outstanding' => $totalOutstanding,
            'total_paid' => $totalPaid,
            'total_overdue' => $totalOverdue,
            'outstanding_amount' => $outstandingAmount,
            'paid_amount' => $paidAmount,
            'overdue_amount' => $overdueAmount,
            'currency_code' => $currencyCode,
            'average_days_to_pay' => $averageDaysToPay,
            'recent_invoices' => $recentInvoices->toArray(),
            'monthly_totals' => $monthlyTotals->toArray(),
        ];
    }
}
