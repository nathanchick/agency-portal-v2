<?php

namespace Modules\Deployment\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Models\Customer;
use Modules\Deployment\Models\Deployment;
use Modules\Deployment\Models\DeploymentHistory;

class CustomerDeploymentController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display deployment history (incoming webhook events)
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view deployments.');
        }

        $query = DeploymentHistory::with(['deployment.customer', 'deployment.website', 'deployment.creator'])
            ->whereHas('deployment', function ($q) use ($customer) {
                $q->where('customer_id', $customer->id);
            })
            ->latest('deployed_at');

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $deployments = $query->paginate(15)->withQueryString();

        return Inertia::render('deployments/index', [
            'deployments' => $deployments,
            'customers' => [], // Customer users don't need the filter dropdown
            'filters' => $request->only(['status']),
        ]);
    }
}
