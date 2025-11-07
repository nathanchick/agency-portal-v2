<?php

namespace Modules\Timesheet\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentCustomer;
use Inertia\Inertia;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetPeriod;

class CustomerServiceController extends Controller
{
    use HasCurrentCustomer;

    public function show($serviceId)
    {
        $currentCustomer = $this->getCurrentCustomer();

        if (!$currentCustomer) {
            abort(403, 'No customer associated with this user');
        }

        $service = Service::with(['customer', 'project', 'serviceManager', 'tasks'])
            ->where('id', $serviceId)
            ->where('customer_id', $currentCustomer->id)
            ->firstOrFail();

        // Get current budget period
        $currentPeriod = ServiceBudgetPeriod::where('service_id', $service->id)
            ->where('period_start', '<=', now())
            ->where('period_end', '>=', now())
            ->first();

        // Get last 12 budget periods for chart
        $budgetPeriods = ServiceBudgetPeriod::where('service_id', $service->id)
            ->orderBy('period_start', 'desc')
            ->limit(12)
            ->get();

        // Calculate time entries stats
        $timeEntriesStats = [
            'total_hours' => $service->timeEntries()->sum('duration_hours'),
            'billable_hours' => $service->timeEntries()->where('billable', true)->sum('duration_hours'),
            'total_amount' => $service->timeEntries()->sum(\DB::raw('duration_hours * hourly_rate')),
        ];

        return Inertia::render('customer/timesheet/services/show', [
            'service' => $service,
            'currentPeriod' => $currentPeriod,
            'budgetPeriods' => $budgetPeriods,
            'timeEntriesStats' => $timeEntriesStats,
        ]);
    }

    public function ledger($serviceId)
    {
        $currentCustomer = $this->getCurrentCustomer();

        if (!$currentCustomer) {
            abort(403, 'No customer associated with this user');
        }

        $service = Service::with('customer')
            ->where('id', $serviceId)
            ->where('customer_id', $currentCustomer->id)
            ->firstOrFail();

        $budgetPeriods = ServiceBudgetPeriod::where('service_id', $service->id)
            ->orderBy('period_start', 'desc')
            ->paginate(12);

        return Inertia::render('customer/timesheet/services/ledger', [
            'service' => $service,
            'budgetPeriods' => $budgetPeriods,
        ]);
    }
}
