<?php

namespace App\Http\Controllers\Api\Extension;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExtensionOrganisationController extends Controller
{
    /**
     * Get user's organisations (for organisation switcher in extension)
     */
    public function list(Request $request): JsonResponse
    {
        $user = $request->user();

        // Get only direct organisation memberships
        $organisations = $user->organisations()
            ->select('id', 'name', 'logo')
            ->orderBy('name')
            ->get()
            ->map(function ($org) {
                return [
                    'id' => $org->id,
                    'name' => $org->name,
                    'logo' => $org->logo ? Storage::url($org->logo) : null,
                ];
            });

        return response()->json([
            'organisations' => $organisations,
            'default_organisation_id' => $user->last_organisation_id,
        ]);
    }
}
