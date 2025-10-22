<?php

namespace Modules\Deployment\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Models\Customer;
use Modules\Customer\Models\Website;
use Modules\Deployment\Models\Deployment;
use Modules\Deployment\Models\DeploymentHistory;

class DeploymentController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display deployment history (incoming webhook events)
     */
    public function index(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $query = DeploymentHistory::with(['deployment.customer', 'deployment.website', 'deployment.creator'])
            ->whereHas('deployment', function ($q) use ($organisationId) {
                $q->where('organisation_id', $organisationId);
            })
            ->latest('deployed_at');

        // Filter by customer if provided
        if ($request->filled('customer_id')) {
            $query->whereHas('deployment', function ($q) use ($request) {
                $q->where('customer_id', $request->customer_id);
            });
        }

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $deployments = $query->paginate(15)->withQueryString();

        // Get customers for filter dropdown
        $customers = Customer::where('organisation_id', $organisationId)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('deployments/index', [
            'deployments' => $deployments,
            'customers' => $customers,
            'filters' => $request->only(['customer_id', 'status']),
        ]);
    }

    /**
     * Display webhook configurations
     */
    public function config(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Get all webhook configurations (deployments with tokens, may not have been triggered yet)
        $query = Deployment::with(['customer', 'website', 'creator', 'latestDeployment'])
            ->where('organisation_id', $organisationId)
            ->latest('created_at');

        // Filter by customer if provided
        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        $webhooks = $query->paginate(15)->withQueryString();

        // Get customers with their websites for create dialog
        $customers = Customer::where('organisation_id', $organisationId)
            ->with(['websites' => function ($query) {
                $query->orderBy('url')->select('id', 'customer_id', 'url', 'type');
            }])
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('deployments/config', [
            'webhooks' => $webhooks,
            'customers' => $customers,
            'filters' => $request->only(['customer_id']),
        ]);
    }

    /**
     * Store a newly created deployment webhook configuration
     */
    public function store(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'website_id' => 'required|exists:websites,id',
        ]);

        // Verify website belongs to customer
        $website = Website::where('id', $validated['website_id'])
            ->where('customer_id', $validated['customer_id'])
            ->first();

        if (! $website) {
            return back()->with('error', 'Invalid customer/website combination');
        }

        // Verify customer belongs to organisation
        $customer = Customer::where('id', $validated['customer_id'])
            ->where('organisation_id', $organisationId)
            ->first();

        if (! $customer) {
            return back()->with('error', 'Customer not found');
        }

        // Generate unique webhook token
        $webhookToken = Deployment::generateWebhookToken();

        // Create deployment webhook configuration
        $deployment = Deployment::create([
            'organisation_id' => $organisationId,
            'customer_id' => $validated['customer_id'],
            'website_id' => $validated['website_id'],
            'webhook_token' => $webhookToken,
            'created_by' => auth()->id(),
        ]);

        // Generate webhook URL
        $webhookUrl = route('api.deployments.webhook', ['token' => $webhookToken]);

        return back()->with([
            'webhookUrl' => $webhookUrl,
            'success' => 'Deployment webhook created successfully',
        ]);
    }

    /**
     * Remove the specified deployment
     */
    public function destroy(Deployment $deployment)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure deployment belongs to the current organisation
        if ($deployment->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this deployment.');
        }

        $deployment->delete();

        return back()->with('success', 'Deployment webhook deleted successfully');
    }
}
