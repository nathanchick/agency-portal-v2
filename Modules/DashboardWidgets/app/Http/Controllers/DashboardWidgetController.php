<?php

namespace Modules\DashboardWidgets\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Modules\DashboardWidgets\Services\DashboardWidgetService;

/**
 * DashboardWidgetController
 *
 * Handles dashboard widget CRUD operations via API endpoints.
 * Manages user widget preferences, layouts, and configurations.
 */
class DashboardWidgetController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        private DashboardWidgetService $widgetService
    ) {}

    /**
     * Get available widgets and user's configured widgets.
     *
     * Returns both the widgets available to the user based on their role/context
     * and their currently configured widgets with settings.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Get available widgets for this user
            $availableWidgets = $this->widgetService->getAvailableWidgets($user);

            // Get user's configured widgets
            $userWidgets = $this->widgetService->getUserWidgets($user);

            // If user has no widgets, create defaults
            if ($userWidgets->isEmpty()) {
                $userWidgets = $this->widgetService->createDefaultWidgets($user);
            }

            return response()->json([
                'available_widgets' => array_values($availableWidgets),
                'user_widgets' => $userWidgets,
            ]);
        } catch (\Throwable $e) {
            Log::error('Failed to load dashboard widgets', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()?->id,
            ]);

            return response()->json([
                'message' => 'Failed to load dashboard widgets',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Save user's widget layout and preferences.
     *
     * Validates and saves the user's complete widget configuration including
     * positions, widths, visibility, and settings.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request): JsonResponse
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'widgets' => ['required', 'array'],
                'widgets.*.widget_key' => ['required', 'string'],
                'widgets.*.position' => ['nullable', 'integer', 'min:0'],
                'widgets.*.width' => ['nullable', 'integer', 'min:1', 'max:3'],
                'widgets.*.is_visible' => ['nullable', 'boolean'],
                'widgets.*.settings' => ['nullable', 'array'],
            ]);

            $user = $request->user();

            // Save widget preferences
            $savedWidgets = $this->widgetService->saveUserWidgetPreferences(
                $user,
                $validated['widgets']
            );

            return response()->json([
                'success' => true,
                'message' => 'Widget layout saved successfully',
                'widgets' => $savedWidgets,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        } catch (\Throwable $e) {
            Log::error('Failed to save widget layout', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()?->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to save widget layout',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Reset user's widgets to defaults.
     *
     * Deletes all user's configured widgets and recreates them with
     * default values from widget configurations.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function reset(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Reset to defaults
            $defaultWidgets = $this->widgetService->resetToDefaults($user);

            return response()->json([
                'success' => true,
                'message' => 'Dashboard reset to defaults',
                'widgets' => $defaultWidgets,
            ]);
        } catch (\Throwable $e) {
            Log::error('Failed to reset dashboard widgets', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()?->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to reset dashboard',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Toggle widget visibility.
     *
     * Toggles the is_visible flag for a specific widget without
     * affecting other widget properties.
     *
     * @param Request $request
     * @param string $widgetKey
     * @return JsonResponse
     */
    public function toggle(Request $request, string $widgetKey): JsonResponse
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'is_visible' => ['required', 'boolean'],
            ]);

            $user = $request->user();

            // Validate that the user has access to this widget
            if (!$this->widgetService->validateWidgetKey($widgetKey, $user)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or unauthorized widget key',
                ], 403);
            }

            // Find the user's widget
            $organisationId = $user->last_customer_id ? null : $user->last_organisation_id;
            $customerId = $user->last_customer_id;

            $widget = \Modules\DashboardWidgets\Models\UserDashboardWidget::forUserContext(
                $user,
                $organisationId,
                $customerId
            )
                ->where('widget_key', $widgetKey)
                ->first();

            if (!$widget) {
                return response()->json([
                    'success' => false,
                    'message' => 'Widget not found',
                ], 404);
            }

            // Update visibility
            $widget->is_visible = $validated['is_visible'];
            $widget->save();

            return response()->json([
                'success' => true,
                'message' => 'Widget visibility updated',
                'widget' => $widget,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Failed to toggle widget visibility', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()?->id,
                'widget_key' => $widgetKey,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle widget visibility',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
