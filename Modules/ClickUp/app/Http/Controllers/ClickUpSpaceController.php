<?php

namespace Modules\ClickUp\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\JsonResponse;
use Modules\ClickUp\Models\ClickUpSpace;

/**
 * ClickUpSpaceController
 *
 * API controller for managing ClickUp Spaces.
 */
class ClickUpSpaceController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Get all spaces for the current organisation.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $organisation = $this->getCurrentDirectOrganisation();

        $spaces = ClickUpSpace::where('organisation_id', $organisation->id)
            ->orderBy('name')
            ->get();

        return response()->json([
            'spaces' => $spaces,
        ]);
    }
}
