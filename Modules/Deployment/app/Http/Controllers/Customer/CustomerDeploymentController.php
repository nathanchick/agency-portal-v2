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
        $auth = auth();
        ray($auth);

        $user = auth()->user();

        // Get the first customer associated with the user
        $customer = $user->customers()->first();

        $query = DeploymentHistory::with(['deployment.customer', 'deployment.website', 'deployment.creator'])
            ->whereHas('deployment', function ($q) use ($customerId) {
                $q->where('customer_id', $customerId);
            })
            ->latest('deployed_at');

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $deployments = $query->paginate(15)->withQueryString();

        return Inertia::render('deployments/index', [
            'deployments' => $deployments,
            'filters' => $request->only(['status']),
        ]);
    }
}
