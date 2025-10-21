<?php

namespace Modules\Customer\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Customer\Models\Customer;

class CustomerController extends Controller
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
     * Display a listing of customers
     */
    public function index(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:customers')) {
            return response()->json([
                'message' => 'This token does not have permission to read customers.',
            ], 403);
        }

        $customers = Customer::where('organisation_id', $organisation)
            ->paginate(15);

        return response()->json($customers);
    }

    /**
     * Store a newly created customer
     */
    public function store(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:customers')) {
            return response()->json([
                'message' => 'This token does not have permission to create customers.',
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'nullable|integer',
            'allow_all_users' => 'nullable|boolean',
        ]);

        $customer = Customer::create([
            ...$validated,
            'organisation_id' => $organisation,
        ]);

        return response()->json($customer, 201);
    }

    /**
     * Display the specified customer
     */
    public function show(Request $request, string $organisation, string $customer)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:customers')) {
            return response()->json([
                'message' => 'This token does not have permission to read customers.',
            ], 403);
        }

        $customer = Customer::where('organisation_id', $organisation)
            ->findOrFail($customer);

        return response()->json($customer);
    }

    /**
     * Update the specified customer
     */
    public function update(Request $request, string $organisation, string $customer)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:customers')) {
            return response()->json([
                'message' => 'This token does not have permission to update customers.',
            ], 403);
        }

        $customerModel = Customer::where('organisation_id', $organisation)
            ->findOrFail($customer);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'status' => 'nullable|integer',
            'allow_all_users' => 'nullable|boolean',
        ]);

        $customerModel->update($validated);

        return response()->json($customerModel);
    }

    /**
     * Remove the specified customer
     */
    public function destroy(Request $request, string $organisation, string $customer)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('delete:customers')) {
            return response()->json([
                'message' => 'This token does not have permission to delete customers.',
            ], 403);
        }

        $customerModel = Customer::where('organisation_id', $organisation)
            ->findOrFail($customer);

        $customerModel->delete();

        return response()->json(null, 204);
    }
}
