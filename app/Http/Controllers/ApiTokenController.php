<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiTokenController extends Controller
{
    protected function getCurrentOrganisationId()
    {
        return session('current_organisation_id') ?? auth()->user()->organisations()->first()?->id;
    }

    /**
     * Display a listing of API tokens
     */
    public function index(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        if (!$organisationId) {
            abort(403, 'No organisation selected');
        }

        $query = ApiToken::where('organisation_id', $organisationId)
            ->with('creator')
            ->latest();

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $tokens = $query->paginate(15)->withQueryString();

        return Inertia::render('api-tokens/index', [
            'tokens' => $tokens,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new API token
     */
    public function create()
    {
        return Inertia::render('api-tokens/create', [
            'availableAbilities' => ApiToken::getAvailableAbilities(),
        ]);
    }

    /**
     * Store a newly created API token
     */
    public function store(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        if (!$organisationId) {
            abort(403, 'No organisation selected');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abilities' => 'nullable|array',
            'abilities.*' => 'string',
            'expires_at' => 'nullable|date|after:now',
        ]);

        // Generate the token
        $plainTextToken = ApiToken::generateToken();

        $apiToken = ApiToken::create([
            'organisation_id' => $organisationId,
            'created_by' => auth()->id(),
            'name' => $validated['name'],
            'token' => hash('sha256', $plainTextToken),
            'abilities' => $validated['abilities'] ?? [],
            'expires_at' => $validated['expires_at'] ?? null,
        ]);

        // Return the plain text token only once
        return redirect()->route('api-tokens.show', $apiToken->id)
            ->with('plainTextToken', $plainTextToken)
            ->with('success', 'API token created successfully. Make sure to copy your token now - you won\'t be able to see it again!');
    }

    /**
     * Display the specified API token
     */
    public function show(ApiToken $apiToken)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure token belongs to current organisation
        if ($apiToken->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this API token');
        }

        $apiToken->load('creator');

        return Inertia::render('api-tokens/show', [
            'apiToken' => $apiToken,
            'plainTextToken' => session('plainTextToken'),
        ]);
    }

    /**
     * Show the form for editing an API token
     */
    public function edit(ApiToken $apiToken)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure token belongs to current organisation
        if ($apiToken->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this API token');
        }

        return Inertia::render('api-tokens/edit', [
            'apiToken' => $apiToken,
            'availableAbilities' => ApiToken::getAvailableAbilities(),
        ]);
    }

    /**
     * Update an API token
     */
    public function update(Request $request, ApiToken $apiToken)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure token belongs to current organisation
        if ($apiToken->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this API token');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abilities' => 'nullable|array',
            'abilities.*' => 'string',
            'expires_at' => 'nullable|date',
        ]);

        $apiToken->update($validated);

        return redirect()->route('api-tokens.index')->with('success', 'API token updated successfully');
    }

    /**
     * Remove an API token
     */
    public function destroy(ApiToken $apiToken)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure token belongs to current organisation
        if ($apiToken->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this API token');
        }

        $apiToken->delete();

        return redirect()->route('api-tokens.index')->with('success', 'API token deleted successfully');
    }
}