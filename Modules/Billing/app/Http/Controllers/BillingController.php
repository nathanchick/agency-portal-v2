<?php

namespace Modules\Billing\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Billing\Services\BillingService;
use Modules\Customer\Models\Customer;

/**
 * BillingController
 *
 * Organisation-facing billing interface.
 * Provides overview of billing across all customers in the organisation.
 */
class BillingController extends Controller
{
    use HasCurrentOrganisation;

    public function __construct(
        private BillingService $billingService
    ) {
    }

    /**
     * Display billing overview for all customers in the organisation.
     */
    public function overview(Request $request): Response
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $customers = Customer::where('organisation_id', $organisationId)
            ->orderBy('name')
            ->get();

        $customersData = [];
        $organisationTotals = [
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
                // Check if customer has a billing provider
                $provider = $this->billingService->getProviderForCustomer($customer);
                $stats = $this->billingService->getStatistics($customer);

                $customerData = [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'has_billing' => true,
                    'provider' => $provider->getProviderName(),
                    'total_invoices' => $stats['total_invoices'] ?? 0,
                    'outstanding_amount' => $stats['outstanding_amount'] ?? 0,
                    'overdue_amount' => $stats['overdue_amount'] ?? 0,
                    'paid_amount' => $stats['paid_amount'] ?? 0,
                    'average_days_to_pay' => $stats['average_days_to_pay'] ?? 0,
                    'currency_code' => $stats['currency_code'] ?? 'GBP',
                    'last_invoice_date' => $stats['last_invoice_date'] ?? null,
                ];

                $customersData[] = $customerData;

                // Aggregate totals
                $organisationTotals['total_customers_with_billing']++;
                $organisationTotals['total_invoices'] += $customerData['total_invoices'];
                $organisationTotals['total_outstanding'] += $customerData['outstanding_amount'];
                $organisationTotals['total_overdue'] += $customerData['overdue_amount'];
                $organisationTotals['total_paid'] += $customerData['paid_amount'];

                if ($customerData['average_days_to_pay'] > 0) {
                    $totalPaymentDays += $customerData['average_days_to_pay'];
                    $customersWithPaymentData++;
                }
            } catch (\Exception $e) {
                // Customer doesn't have billing provider or error occurred
                $customersData[] = [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'has_billing' => false,
                    'provider' => null,
                    'total_invoices' => 0,
                    'outstanding_amount' => 0,
                    'overdue_amount' => 0,
                    'paid_amount' => 0,
                    'average_days_to_pay' => 0,
                    'currency_code' => 'GBP',
                    'last_invoice_date' => null,
                ];
            }
        }

        $organisationTotals['total_customers'] = $customers->count();

        // Calculate average payment time across all customers
        if ($customersWithPaymentData > 0) {
            $organisationTotals['average_days_to_pay'] = round($totalPaymentDays / $customersWithPaymentData, 1);
        }

        return Inertia::render('customers/billing/overview', [
            'customers' => $customersData,
            'totals' => $organisationTotals,
        ]);
    }

    /**
     * Display billing statistics for a specific customer.
     */
    public function customerStats(Request $request, Customer $customer): Response
    {
        // Verify customer belongs to current organisation
        if ($customer->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        try {
            $stats = $this->billingService->getStatistics($customer);
            $providerName = $this->billingService->getProviderName($customer);

            return Inertia::render('customers/billing/stats', [
                'customer' => [
                    'id' => $customer->id,
                    'name' => $customer->name,
                ],
                'stats' => $stats,
                'provider' => $providerName,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('customers/billing/unavailable', [
                'customer' => [
                    'id' => $customer->id,
                    'name' => $customer->name,
                ],
                'message' => 'Billing statistics are not available for this customer.',
            ]);
        }
    }
}
