<?php

namespace Modules\Customer\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Customer\Models\Customer;
use Modules\Website\Models\Website;

class WebsiteController extends Controller
{
    /**
     * Validate that the API token belongs to the requested organisation
     */
    protected function validateOrganisation(Request $request, string $organisationId)
    {
        $apiToken = $request->input('api_token');

        if ($apiToken->organisation_id !== $organisationId) {
            abort(403, 'This API token does not have access to the requested organisation.');
        }
    }

    /**
     * Display a listing of websites
     */
    public function index(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:websites')) {
            return response()->json([
                'message' => 'This token does not have permission to read websites.',
            ], 403);
        }

        $websites = Website::whereHas('customer', function ($query) use ($organisation) {
            $query->where('organisation_id', $organisation);
        })->with(['customer', 'project'])->paginate(15);

        return response()->json($websites);
    }

    /**
     * Store a newly created website
     */
    public function store(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:websites')) {
            return response()->json([
                'message' => 'This token does not have permission to create websites.',
            ], 403);
        }

        $validated = $request->validate([
            'customer_id' => 'required|uuid|exists:customers,id',
            'project_id' => 'nullable|uuid|exists:projects,id',
            'type' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        // Validate that the customer belongs to the organisation
        $customer = Customer::where('id', $validated['customer_id'])
            ->where('organisation_id', $organisation)
            ->first();

        if (! $customer) {
            return response()->json([
                'message' => 'The customer does not belong to this organisation.',
            ], 403);
        }

        $website = Website::create($validated);

        return response()->json($website->load(['customer', 'project']), 201);
    }

    /**
     * Display the specified website
     */
    public function show(Request $request, string $organisation, string $website)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:websites')) {
            return response()->json([
                'message' => 'This token does not have permission to read websites.',
            ], 403);
        }

        $website = Website::whereHas('customer', function ($query) use ($organisation) {
            $query->where('organisation_id', $organisation);
        })->with(['customer', 'project'])->findOrFail($website);

        return response()->json($website);
    }

    /**
     * Update the specified website
     */
    public function update(Request $request, string $organisation, string $website)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:websites')) {
            return response()->json([
                'message' => 'This token does not have permission to update websites.',
            ], 403);
        }

        $websiteModel = Website::whereHas('customer', function ($query) use ($organisation) {
            $query->where('organisation_id', $organisation);
        })->findOrFail($website);

        $validated = $request->validate([
            'customer_id' => 'sometimes|required|uuid|exists:customers,id',
            'project_id' => 'nullable|uuid|exists:projects,id',
            'type' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        // If customer_id is being updated, validate it belongs to the organisation
        if (isset($validated['customer_id'])) {
            $customer = Customer::where('id', $validated['customer_id'])
                ->where('organisation_id', $organisation)
                ->first();

            if (! $customer) {
                return response()->json([
                    'message' => 'The customer does not belong to this organisation.',
                ], 403);
            }
        }

        $websiteModel->update($validated);

        return response()->json($websiteModel->load(['customer', 'project']));
    }

    /**
     * Remove the specified website
     */
    public function destroy(Request $request, string $organisation, string $website)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('delete:websites')) {
            return response()->json([
                'message' => 'This token does not have permission to delete websites.',
            ], 403);
        }

        $websiteModel = Website::whereHas('customer', function ($query) use ($organisation) {
            $query->where('organisation_id', $organisation);
        })->findOrFail($website);

        $websiteModel->delete();

        return response()->json(null, 204);
    }
}
