<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\OrganisationUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Organisation\Models\Organisation;

class OrganisationController extends Controller
{
    /**
     * Show the organisation settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        // Only allow access if user is directly in an organisation (not customer users)
        $organisation = $user->last_organisation_id
            ? $user->organisations()->where('organisations.id', $user->last_organisation_id)->first()
            : null;

        if (!$organisation) {
            abort(403, 'Access denied. Organisation settings are only available to organisation users.');
        }

        return Inertia::render('settings/organisation', [
            'organisation' => [
                'id' => $organisation->id,
                'name' => $organisation->name,
                'logo' => $organisation->logo ? Storage::url($organisation->logo) : null,
                'billing_email' => $organisation->billing_email,
            ],
        ]);
    }

    /**
     * Update the organisation settings.
     */
    public function update(OrganisationUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Only allow access if user is directly in an organisation (not customer users)
        $organisation = $user->last_organisation_id
            ? $user->organisations()->where('organisations.id', $user->last_organisation_id)->first()
            : null;

        if (!$organisation) {
            abort(403, 'Access denied. Organisation settings are only available to organisation users.');
        }

        $validated = $request->validated();

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if it exists
            if ($organisation->logo) {
                Storage::delete($organisation->logo);
            }

            // Store new logo
            $logoPath = $request->file('logo')->store('organisation-logos', 'public');
            $validated['logo'] = $logoPath;
        }

        $organisation->update($validated);

        return redirect()->route('organisation.edit')->with('success', 'Organisation settings updated successfully');
    }
}
