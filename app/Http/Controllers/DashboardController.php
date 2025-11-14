<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\DashboardWidgets\Services\DashboardWidgetService;

/**
 * DashboardController
 *
 * Handles the main dashboard page rendering.
 * Integrates with the DashboardWidgets module to provide
 * user-customizable widget data.
 */
class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        private DashboardWidgetService $widgetService
    ) {}

    /**
     * Display the dashboard.
     *
     * Renders the dashboard page with available widgets and user's configured widgets.
     * If the user has no widgets configured, default widgets are created automatically.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get available widgets for this user
        $availableWidgets = $this->widgetService->getAvailableWidgets($user);

        // Get user's configured widgets
        $userWidgets = $this->widgetService->getUserWidgets($user);

        // If user has no widgets, create defaults
        if ($userWidgets->isEmpty()) {
            $userWidgets = $this->widgetService->createDefaultWidgets($user);
        }

        return Inertia::render('dashboard', [
            'widgets' => $userWidgets,
            'availableWidgets' => array_values($availableWidgets),
        ]);
    }
}
