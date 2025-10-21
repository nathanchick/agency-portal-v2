<?php

namespace Modules\Customer\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Modules\Customer\Models\Project;
use Modules\Customer\Models\Customer;
use Illuminate\Http\Request;

class ProjectController extends Controller
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
     * Display a listing of projects
     */
    public function index(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (!$apiToken->can('read:projects')) {
            return response()->json([
                'message' => 'This token does not have permission to read projects.',
            ], 403);
        }

        $projects = Project::where('organisation_id', $organisation)
            ->with(['customer'])
            ->paginate(15);

        return response()->json($projects);
    }

    /**
     * Store a newly created project
     */
    public function store(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (!$apiToken->can('write:projects')) {
            return response()->json([
                'message' => 'This token does not have permission to create projects.',
            ], 403);
        }

        $validated = $request->validate([
            'customer_id' => 'required|uuid|exists:customers,id',
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'is_default' => 'nullable|boolean',
        ]);

        // Validate that the customer belongs to the organisation
        $customer = Customer::where('id', $validated['customer_id'])
            ->where('organisation_id', $organisation)
            ->first();

        if (!$customer) {
            return response()->json([
                'message' => 'The customer does not belong to this organisation.',
            ], 403);
        }

        $project = Project::create([
            ...$validated,
            'organisation_id' => $organisation,
        ]);

        return response()->json($project->load(['customer']), 201);
    }

    /**
     * Display the specified project
     */
    public function show(Request $request, string $organisation, string $project)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (!$apiToken->can('read:projects')) {
            return response()->json([
                'message' => 'This token does not have permission to read projects.',
            ], 403);
        }

        $project = Project::where('organisation_id', $organisation)
            ->with(['customer'])
            ->findOrFail($project);

        return response()->json($project);
    }

    /**
     * Update the specified project
     */
    public function update(Request $request, string $organisation, string $project)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (!$apiToken->can('write:projects')) {
            return response()->json([
                'message' => 'This token does not have permission to update projects.',
            ], 403);
        }

        $projectModel = Project::where('organisation_id', $organisation)
            ->findOrFail($project);

        $validated = $request->validate([
            'customer_id' => 'sometimes|required|uuid|exists:customers,id',
            'name' => 'sometimes|required|string|max:255',
            'notes' => 'nullable|string',
            'is_default' => 'nullable|boolean',
        ]);

        // If customer_id is being updated, validate it belongs to the organisation
        if (isset($validated['customer_id'])) {
            $customer = Customer::where('id', $validated['customer_id'])
                ->where('organisation_id', $organisation)
                ->first();

            if (!$customer) {
                return response()->json([
                    'message' => 'The customer does not belong to this organisation.',
                ], 403);
            }
        }

        $projectModel->update($validated);

        return response()->json($projectModel->load(['customer']));
    }

    /**
     * Remove the specified project
     */
    public function destroy(Request $request, string $organisation, string $project)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (!$apiToken->can('delete:projects')) {
            return response()->json([
                'message' => 'This token does not have permission to delete projects.',
            ], 403);
        }

        $projectModel = Project::where('organisation_id', $organisation)
            ->findOrFail($project);

        $projectModel->delete();

        return response()->json(null, 204);
    }
}