<?php

namespace Modules\Billing\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Billing\Exceptions\BillingProviderNotAvailableException;
use Modules\Billing\Exceptions\InvoiceNotFoundException;
use Modules\Billing\Services\BillingService;
use Modules\Customer\Models\Customer;

/**
 * BillingController
 *
 * Customer-facing billing interface.
 * Provides access to invoices regardless of the underlying provider (Xero, QuickBooks, etc.).
 */
class BillingController extends Controller
{
    public function __construct(
        private BillingService $billingService
    ) {
    }

    /**
     * Display paginated list of invoices for the customer.
     *
     * Supports filtering by:
     * - status: Filter by invoice status (draft, approved, paid, cancelled)
     * - date_from: Filter invoices from this date
     * - date_to: Filter invoices to this date
     * - search: Search invoice numbers and references
     */
    public function index(Request $request): Response
    {
        $customer = $this->getCurrentCustomer($request);

        try {
            // Get provider info
            $providerName = $this->billingService->getProviderName($customer);

            // Build filters from request
            $filters = $request->only(['status', 'date_from', 'date_to', 'search']);

            // Get invoices
            $invoices = $this->billingService->getInvoices($customer, $filters);

            // Paginate manually (since we're getting a Collection)
            $perPage = 25;
            $page = $request->input('page', 1);
            $total = $invoices->count();
            $invoices = $invoices->slice(($page - 1) * $perPage, $perPage)->values();

            return Inertia::render('customer/billing/index', [
                'invoices' => [
                    'data' => $invoices->map->toArray()->toArray(),
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'last_page' => ceil($total / $perPage),
                ],
                'provider' => $providerName,
                'filters' => $filters,
                'statuses' => [
                    'draft' => 'Draft',
                    'submitted' => 'Submitted',
                    'approved' => 'Approved',
                    'paid' => 'Paid',
                    'cancelled' => 'Cancelled',
                ],
            ]);
        } catch (BillingProviderNotAvailableException $e) {
            return Inertia::render('customer/billing/unavailable', [
                'message' => 'Billing is not currently available. Please contact support.',
            ]);
        }
    }

    /**
     * Display a single invoice with full details.
     */
    public function show(Request $request, string $id): Response
    {
        $customer = $this->getCurrentCustomer($request);

        try {
            $invoice = $this->billingService->getInvoice($customer, $id);
            $providerName = $this->billingService->getProviderName($customer);

            return Inertia::render('customer/billing/show', [
                'invoice' => $invoice->toArray(),
                'provider' => $providerName,
            ]);
        } catch (InvoiceNotFoundException $e) {
            abort(404, 'Invoice not found');
        } catch (BillingProviderNotAvailableException $e) {
            abort(503, 'Billing service unavailable');
        }
    }

    /**
     * Get invoice statistics for dashboard.
     */
    public function stats(Request $request): Response
    {
        $customer = $this->getCurrentCustomer($request);

        try {
            $stats = $this->billingService->getStatistics($customer);
            $providerName = $this->billingService->getProviderName($customer);

            return Inertia::render('customer/billing/stats', [
                'stats' => $stats,
                'provider' => $providerName,
            ]);
        } catch (BillingProviderNotAvailableException $e) {
            return Inertia::render('customer/billing/unavailable', [
                'message' => 'Billing statistics are not available.',
            ]);
        }
    }

    /**
     * Get the current customer from the request.
     * This assumes you have customer context in the session.
     */
    private function getCurrentCustomer(Request $request): Customer
    {
        // Adjust this based on your customer switching implementation
        $customerId = $request->user()->current_customer_id
            ?? session('current_customer_id');

        if (! $customerId) {
            abort(400, 'No customer context');
        }

        return Customer::findOrFail($customerId);
    }
}
