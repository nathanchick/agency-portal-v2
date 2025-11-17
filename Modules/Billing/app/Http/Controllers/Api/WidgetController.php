<?php

namespace Modules\Billing\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentCustomer;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Billing\Services\BillingService;
use Modules\Customer\Models\Customer;

/**
 * WidgetController
 *
 * API endpoints for billing dashboard widgets.
 */
class WidgetController extends Controller
{
    use HasCurrentOrganisation, HasCurrentCustomer;

    public function __construct(
        private BillingService $billingService
    ) {
    }

    /**
     * Get billing overview data for organisation.
     * Used by BillingOverviewWidget.
     */
    public function overview(Request $request): JsonResponse
    {
        // Get current organisation securely through trait
        $organisation = $this->getCurrentDirectOrganisation();

        if (!$organisation) {
            return response()->json([
                'error' => 'No organisation context',
                'data' => null,
            ], 403);
        }

        $customers = Customer::where('organisation_id', $organisation->id)->get();

        $totals = [
            'total_customers' => 0,
            'total_customers_with_billing' => 0,
            'total_outstanding' => 0,
            'total_overdue' => 0,
            'total_paid' => 0,
            'total_invoices' => 0,
            'currency_code' => 'GBP',
            'average_days_to_pay' => 0,
        ];

        $totalPaymentDays = 0;
        $customersWithPaymentData = 0;

        foreach ($customers as $customer) {
            try {
                $stats = $this->billingService->getStatistics($customer);

                $totals['total_customers_with_billing']++;
                $totals['total_invoices'] += $stats['total_invoices'] ?? 0;
                $totals['total_outstanding'] += $stats['outstanding_amount'] ?? 0;
                $totals['total_overdue'] += $stats['overdue_amount'] ?? 0;
                $totals['total_paid'] += $stats['paid_amount'] ?? 0;

                if (($stats['average_days_to_pay'] ?? 0) > 0) {
                    $totalPaymentDays += $stats['average_days_to_pay'];
                    $customersWithPaymentData++;
                }
            } catch (\Exception $e) {
                // Customer doesn't have billing provider configured
                continue;
            }
        }

        $totals['total_customers'] = $customers->count();

        if ($customersWithPaymentData > 0) {
            $totals['average_days_to_pay'] = round($totalPaymentDays / $customersWithPaymentData, 1);
        }

        return response()->json([
            'data' => $totals,
        ]);
    }

    /**
     * Get customers with outstanding invoices.
     * Used by OutstandingInvoicesWidget.
     */
    public function outstanding(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'limit' => 'nullable|integer|min:5|max:20',
            'sort_by' => 'nullable|in:amount_desc,amount_asc,date_desc,date_asc',
        ]);

        $limit = $validated['limit'] ?? 10;
        $sortBy = $validated['sort_by'] ?? 'amount_desc';

        // Get current organisation securely through trait
        $organisation = $this->getCurrentDirectOrganisation();

        if (!$organisation) {
            return response()->json([
                'error' => 'No organisation context',
                'data' => [],
            ], 403);
        }

        $customers = Customer::where('organisation_id', $organisation->id)->get();

        $customersWithOutstanding = [];

        foreach ($customers as $customer) {
            try {
                $stats = $this->billingService->getStatistics($customer);
                $provider = $this->billingService->getProviderName($customer);

                if (($stats['outstanding_amount'] ?? 0) > 0) {
                    $customersWithOutstanding[] = [
                        'id' => $customer->id,
                        'name' => $customer->name,
                        'outstanding_amount' => $stats['outstanding_amount'],
                        'outstanding_count' => $stats['total_outstanding'] ?? 0,
                        'currency_code' => $stats['currency_code'] ?? 'GBP',
                        'last_invoice_date' => $stats['last_invoice_date'] ?? null,
                        'provider' => $provider,
                    ];
                }
            } catch (\Exception $e) {
                continue;
            }
        }

        // Sort
        usort($customersWithOutstanding, function ($a, $b) use ($sortBy) {
            return match ($sortBy) {
                'amount_desc' => $b['outstanding_amount'] <=> $a['outstanding_amount'],
                'amount_asc' => $a['outstanding_amount'] <=> $b['outstanding_amount'],
                'date_desc' => ($b['last_invoice_date'] ?? '') <=> ($a['last_invoice_date'] ?? ''),
                'date_asc' => ($a['last_invoice_date'] ?? '') <=> ($b['last_invoice_date'] ?? ''),
                default => $b['outstanding_amount'] <=> $a['outstanding_amount'],
            };
        });

        // Limit
        $customersWithOutstanding = array_slice($customersWithOutstanding, 0, $limit);

        return response()->json([
            'data' => $customersWithOutstanding,
        ]);
    }

    /**
     * Get customers with overdue invoices.
     * Used by OverdueInvoicesWidget.
     */
    public function overdue(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'limit' => 'nullable|integer|min:5|max:15',
            'min_days_overdue' => 'nullable|integer|min:1|max:90',
        ]);

        $limit = $validated['limit'] ?? 10;
        $minDaysOverdue = $validated['min_days_overdue'] ?? 1;

        // Get current organisation securely through trait
        $organisation = $this->getCurrentDirectOrganisation();

        if (!$organisation) {
            return response()->json([
                'error' => 'No organisation context',
                'data' => [],
            ], 403);
        }

        $customers = Customer::where('organisation_id', $organisation->id)->get();

        $customersWithOverdue = [];

        foreach ($customers as $customer) {
            try {
                $stats = $this->billingService->getStatistics($customer);
                $provider = $this->billingService->getProviderName($customer);

                if (($stats['overdue_amount'] ?? 0) > 0) {
                    // Calculate days overdue (this is a simplified version)
                    // In a real implementation, you'd get this from the invoice provider
                    $daysOverdue = $stats['days_overdue'] ?? 30; // Default estimate

                    if ($daysOverdue >= $minDaysOverdue) {
                        $customersWithOverdue[] = [
                            'id' => $customer->id,
                            'name' => $customer->name,
                            'overdue_amount' => $stats['overdue_amount'],
                            'overdue_count' => $stats['total_overdue'] ?? 0,
                            'currency_code' => $stats['currency_code'] ?? 'GBP',
                            'days_overdue' => $daysOverdue,
                            'provider' => $provider,
                        ];
                    }
                }
            } catch (\Exception $e) {
                continue;
            }
        }

        // Sort by overdue amount (highest first)
        usort($customersWithOverdue, function ($a, $b) {
            return $b['overdue_amount'] <=> $a['overdue_amount'];
        });

        // Limit
        $customersWithOverdue = array_slice($customersWithOverdue, 0, $limit);

        return response()->json([
            'data' => $customersWithOverdue,
        ]);
    }

    /**
     * Get billing data for the current customer user.
     * Used by MyBillingWidget.
     */
    public function myBilling(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'show_recent' => 'nullable|boolean',
            'recent_count' => 'nullable|integer|min:3|max:10',
        ]);

        $showRecent = $validated['show_recent'] ?? true;
        $recentCount = $validated['recent_count'] ?? 5;

        // Get the current customer securely through trait
        $customer = $this->getCurrentCustomer();

        if (!$customer) {
            return response()->json([
                'error' => 'Not a customer user',
                'data' => null,
            ], 403);
        }

        try {
            $stats = $this->billingService->getStatistics($customer);
            $provider = $this->billingService->getProviderName($customer);

            $data = [
                'outstanding_amount' => $stats['outstanding_amount'] ?? 0,
                'overdue_amount' => $stats['overdue_amount'] ?? 0,
                'total_invoices' => $stats['total_invoices'] ?? 0,
                'outstanding_count' => $stats['total_outstanding'] ?? 0,
                'overdue_count' => $stats['total_overdue'] ?? 0,
                'currency_code' => $stats['currency_code'] ?? 'GBP',
                'average_days_to_pay' => $stats['average_days_to_pay'] ?? 0,
                'provider' => $provider,
            ];

            // Add recent invoices if requested
            if ($showRecent && isset($stats['recent_invoices'])) {
                $data['recent_invoices'] = array_slice($stats['recent_invoices'], 0, $recentCount);
            }

            return response()->json([
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Billing data not available',
                'message' => $e->getMessage(),
            ], 404);
        }
    }
}