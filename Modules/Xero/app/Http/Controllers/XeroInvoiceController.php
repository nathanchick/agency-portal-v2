<?php

namespace Modules\Xero\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Customer\Models\Customer;
use Modules\Xero\Jobs\SyncXeroInvoicesJob;
use Modules\Xero\Models\XeroInvoice;

/**
 * XeroInvoiceController
 *
 * Handles viewing and managing Xero invoices synced to the portal.
 * Provides filtering, searching, and manual sync capabilities.
 */
class XeroInvoiceController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display a paginated list of Xero invoices.
     *
     * Supports filtering by:
     * - customer_id: Filter by specific customer
     * - status: Filter by invoice status (DRAFT, AUTHORISED, PAID, etc.)
     * - date_from: Filter invoices from this date
     * - date_to: Filter invoices to this date
     * - search: Search invoice numbers and references
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $organisation = $this->getCurrentDirectOrganisation();

        // Build query
        $query = XeroInvoice::where('organisation_id', $organisation->id)
            ->with(['customer:id,name', 'lineItems'])
            ->orderBy('date', 'desc');

        // Filter by customer
        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->input('customer_id'));
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->where('date', '>=', $request->input('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->where('date', '<=', $request->input('date_to'));
        }

        // Search by invoice number or reference
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('xero_invoice_number', 'like', "%{$search}%")
                    ->orWhere('reference', 'like', "%{$search}%");
            });
        }

        // Paginate results
        $invoices = $query->paginate(25)->withQueryString();

        // Get customers for filter dropdown
        $customers = Customer::where('organisation_id', $organisation->id)
            ->whereHas('settings', function ($query) {
                $query->where('module', 'Xero')
                    ->where('key', 'xero_contact_id')
                    ->whereNotNull('value');
            })
            ->orderBy('name')
            ->get(['id', 'name']);

        // Get available statuses
        $statuses = [
            'DRAFT' => 'Draft',
            'SUBMITTED' => 'Submitted',
            'AUTHORISED' => 'Authorised',
            'PAID' => 'Paid',
            'VOIDED' => 'Voided',
            'DELETED' => 'Deleted',
        ];

        return Inertia::render('xero/invoices/index', [
            'invoices' => $invoices,
            'customers' => $customers,
            'statuses' => $statuses,
            'filters' => $request->only(['customer_id', 'status', 'date_from', 'date_to', 'search']),
        ]);
    }

    /**
     * Display a single Xero invoice with full details.
     *
     * @param  Request  $request
     * @param  string  $id  UUID of the XeroInvoice
     * @return Response
     */
    public function show(Request $request, string $id): Response
    {
        $organisation = $this->getCurrentDirectOrganisation();

        $invoice = XeroInvoice::where('organisation_id', $organisation->id)
            ->where('id', $id)
            ->with(['customer:id,name,xero_contact_id', 'lineItems'])
            ->firstOrFail();

        return Inertia::render('xero/invoices/show', [
            'invoice' => $invoice,
        ]);
    }

    /**
     * Trigger a manual sync of Xero invoices.
     *
     * Dispatches a job to sync invoices in the background.
     * Optionally can sync for a specific customer.
     *
     * @param  Request  $request
     * @return RedirectResponse
     */
    public function sync(Request $request): RedirectResponse
    {
        $organisation = $this->getCurrentDirectOrganisation();

        $validated = $request->validate([
            'customer_id' => 'nullable|uuid|exists:customers,id',
            'incremental' => 'nullable|boolean',
        ]);

        $customerId = $validated['customer_id'] ?? null;
        $incremental = $validated['incremental'] ?? false;

        // Dispatch sync job
        SyncXeroInvoicesJob::dispatch(
            $organisation->id,
            $customerId,
            $incremental
        );

        $message = $customerId
            ? 'Invoice sync started for selected customer. This may take a few minutes.'
            : 'Invoice sync started for all customers. This may take a few minutes.';

        return redirect()->back()->with('success', $message);
    }

    /**
     * Get invoice statistics for the dashboard.
     *
     * Returns summary statistics about invoices:
     * - Total count
     * - Total value
     * - Unpaid count and value
     * - Overdue count and value
     *
     * @param  Request  $request
     * @return Response
     */
    public function stats(Request $request): Response
    {
        $organisation = $this->getCurrentDirectOrganisation();

        $stats = [
            'total' => [
                'count' => XeroInvoice::where('organisation_id', $organisation->id)->count(),
                'value' => XeroInvoice::where('organisation_id', $organisation->id)->sum('total'),
            ],
            'unpaid' => [
                'count' => XeroInvoice::where('organisation_id', $organisation->id)
                    ->unpaid()
                    ->count(),
                'value' => XeroInvoice::where('organisation_id', $organisation->id)
                    ->unpaid()
                    ->sum('amount_due'),
            ],
            'overdue' => [
                'count' => XeroInvoice::where('organisation_id', $organisation->id)
                    ->unpaid()
                    ->where('due_date', '<', now())
                    ->count(),
                'value' => XeroInvoice::where('organisation_id', $organisation->id)
                    ->unpaid()
                    ->where('due_date', '<', now())
                    ->sum('amount_due'),
            ],
            'paid' => [
                'count' => XeroInvoice::where('organisation_id', $organisation->id)
                    ->paid()
                    ->count(),
                'value' => XeroInvoice::where('organisation_id', $organisation->id)
                    ->paid()
                    ->sum('total'),
            ],
        ];

        return Inertia::render('xero/invoices/stats', [
            'stats' => $stats,
        ]);
    }
}
