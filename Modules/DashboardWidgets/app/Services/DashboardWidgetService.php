<?php

namespace Modules\DashboardWidgets\Services;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Modules\DashboardWidgets\Models\UserDashboardWidget;
use Modules\Organisation\Models\Organisation;

/**
 * DashboardWidgetService
 *
 * Service class for managing dashboard widgets.
 * Handles widget loading, filtering, user preferences, and default creation.
 */
class DashboardWidgetService
{
    /**
     * Cache for loaded widget configs to avoid multiple file reads
     */
    private ?array $cachedWidgetConfigs = null;

    /**
     * Get all widget configurations from all modules.
     *
     * Scans the Modules directory for widget.php config files and loads them.
     * Results are cached in memory for the duration of the request.
     *
     * @return array Array of widget configs keyed by module name
     */
    public function getAllModuleWidgetConfigs(): array
    {
        // Return cached configs if already loaded
        if ($this->cachedWidgetConfigs !== null) {
            return $this->cachedWidgetConfigs;
        }

        $modulesPath = base_path('Modules');
        $configs = [];

        if (!File::exists($modulesPath)) {
            $this->cachedWidgetConfigs = $configs;
            return $configs;
        }

        $modules = File::directories($modulesPath);

        foreach ($modules as $modulePath) {
            $moduleName = basename($modulePath);
            $widgetConfigPath = $modulePath.'/config/widget.php';

            if (File::exists($widgetConfigPath)) {
                try {
                    $widgetConfig = require $widgetConfigPath;

                    if (is_array($widgetConfig) && !empty($widgetConfig)) {
                        $configs[$moduleName] = $widgetConfig;
                    }
                } catch (\Throwable $e) {
                    Log::error("Failed to load widget config for module {$moduleName}", [
                        'error' => $e->getMessage(),
                        'file' => $widgetConfigPath,
                    ]);
                }
            }
        }

        $this->cachedWidgetConfigs = $configs;
        return $configs;
    }

    /**
     * Get widgets available to a specific user based on their role and context.
     *
     * Filters widgets by:
     * - User type (organisation vs customer)
     * - User role (Admin, Manager, User)
     * - Module enabled status
     *
     * @param User $user The user to get widgets for
     * @return array Array of available widget configs
     */
    public function getAvailableWidgets(User $user): array
    {
        $allConfigs = $this->getAllModuleWidgetConfigs();
        $userType = $this->getUserType($user);
        $userRole = $this->getUserRole($user);
        $availableWidgets = [];

        foreach ($allConfigs as $moduleName => $moduleConfig) {
            // Check if module is enabled for the user's organisation
            if (!$this->isModuleEnabled($user, $moduleName)) {
                continue;
            }

            // Get widgets for this user type (organisation or customer)
            $widgets = $moduleConfig[$userType] ?? [];

            foreach ($widgets as $widgetKey => $widgetConfig) {
                // Check if user's role is in the allowed roles
                $allowedRoles = $widgetConfig['roles'] ?? ['Admin', 'Manager', 'User'];

                if (!in_array($userRole, $allowedRoles)) {
                    continue;
                }

                // Build full widget key (module.widget_key)
                $fullWidgetKey = "{$moduleName}.{$widgetKey}";

                // Add module name and key to widget config
                $availableWidgets[$fullWidgetKey] = array_merge($widgetConfig, [
                    'key' => $fullWidgetKey,
                    'module' => $moduleName,
                ]);
            }
        }

        return $availableWidgets;
    }

    /**
     * Get a user's configured widgets with their settings.
     *
     * @param User $user The user to get widgets for
     * @return Collection Collection of UserDashboardWidget models
     */
    public function getUserWidgets(User $user): Collection
    {
        $organisationId = $this->getContextOrganisationId($user);
        $customerId = $this->getContextCustomerId($user);

        return UserDashboardWidget::forUserContext($user, $organisationId, $customerId)
            ->orderBy('position')
            ->get();
    }

    /**
     * Save user's widget preferences.
     *
     * Validates all widgets and recreates the user's widget configuration.
     *
     * @param User $user The user saving preferences
     * @param array $widgets Array of widget configurations to save
     * @return Collection The newly created widget records
     * @throws \InvalidArgumentException If any widget is invalid
     */
    public function saveUserWidgetPreferences(User $user, array $widgets): Collection
    {
        $organisationId = $this->getContextOrganisationId($user);
        $customerId = $this->getContextCustomerId($user);
        $availableWidgets = $this->getAvailableWidgets($user);

        // Validate all widgets before saving
        foreach ($widgets as $widget) {
            $widgetKey = $widget['widget_key'] ?? null;

            if (!$widgetKey) {
                throw new \InvalidArgumentException('Widget key is required');
            }

            // Validate the widget key is available to this user
            if (!$this->validateWidgetKey($widgetKey, $user)) {
                throw new \InvalidArgumentException("Invalid or unauthorized widget key: {$widgetKey}");
            }

            // Validate widget settings if provided
            if (isset($widget['settings']) && is_array($widget['settings'])) {
                $widget['settings'] = $this->validateWidgetSettings($widgetKey, $widget['settings']);
            }
        }

        // Delete existing widgets for this context
        UserDashboardWidget::forUserContext($user, $organisationId, $customerId)->delete();

        // Create new widget records
        $createdWidgets = collect();

        foreach ($widgets as $index => $widget) {
            $created = UserDashboardWidget::create([
                'user_id' => $user->id,
                'organisation_id' => $organisationId,
                'customer_id' => $customerId,
                'widget_key' => $widget['widget_key'],
                'position' => $widget['position'] ?? $index,
                'width' => $widget['width'] ?? 1,
                'settings' => $widget['settings'] ?? null,
                'is_visible' => $widget['is_visible'] ?? true,
            ]);

            $createdWidgets->push($created);
        }

        Log::info('User widget preferences saved', [
            'user_id' => $user->id,
            'organisation_id' => $organisationId,
            'customer_id' => $customerId,
            'widget_count' => $createdWidgets->count(),
        ]);

        return $createdWidgets;
    }

    /**
     * Create default widgets for a user.
     *
     * Creates widgets where default_visible is true in the widget config.
     * Only called when a user has no widgets configured.
     *
     * @param User $user The user to create defaults for
     * @return Collection The created widget records
     */
    public function createDefaultWidgets(User $user): Collection
    {
        $availableWidgets = $this->getAvailableWidgets($user);
        $organisationId = $this->getContextOrganisationId($user);
        $customerId = $this->getContextCustomerId($user);

        $defaultWidgets = collect();
        $position = 0;

        foreach ($availableWidgets as $widgetKey => $widgetConfig) {
            if (($widgetConfig['default_visible'] ?? false) === true) {
                // Get default position from config or use auto-increment
                $widgetPosition = $widgetConfig['default_position'] ?? $position;
                $position++;

                // Get default settings from settings_schema
                $defaultSettings = $this->getDefaultSettings($widgetConfig['settings_schema'] ?? []);

                $widget = UserDashboardWidget::create([
                    'user_id' => $user->id,
                    'organisation_id' => $organisationId,
                    'customer_id' => $customerId,
                    'widget_key' => $widgetKey,
                    'position' => $widgetPosition,
                    'width' => $widgetConfig['default_width'] ?? 1,
                    'settings' => !empty($defaultSettings) ? $defaultSettings : null,
                    'is_visible' => true,
                ]);

                $defaultWidgets->push($widget);
            }
        }

        Log::info('Default widgets created for user', [
            'user_id' => $user->id,
            'organisation_id' => $organisationId,
            'customer_id' => $customerId,
            'widget_count' => $defaultWidgets->count(),
        ]);

        return $defaultWidgets;
    }

    /**
     * Reset user's widgets to defaults.
     *
     * Deletes all existing widgets and recreates default ones.
     *
     * @param User $user The user to reset widgets for
     * @return Collection The newly created default widgets
     */
    public function resetToDefaults(User $user): Collection
    {
        $organisationId = $this->getContextOrganisationId($user);
        $customerId = $this->getContextCustomerId($user);

        // Delete existing widgets
        UserDashboardWidget::forUserContext($user, $organisationId, $customerId)->delete();

        Log::info('User widgets reset to defaults', [
            'user_id' => $user->id,
            'organisation_id' => $organisationId,
            'customer_id' => $customerId,
        ]);

        // Create defaults
        return $this->createDefaultWidgets($user);
    }

    /**
     * Validate that a widget key is valid and available to the user.
     *
     * @param string $key The widget key to validate (e.g., "Tickets.recent_tickets")
     * @param User $user The user requesting the widget
     * @return bool True if valid and available
     */
    public function validateWidgetKey(string $key, User $user): bool
    {
        $availableWidgets = $this->getAvailableWidgets($user);
        return isset($availableWidgets[$key]);
    }

    /**
     * Validate and sanitize widget settings against its schema.
     *
     * @param string $key The widget key
     * @param array $settings The settings to validate
     * @return array The validated and sanitized settings
     * @throws \InvalidArgumentException If settings are invalid
     */
    public function validateWidgetSettings(string $key, array $settings): array
    {
        // Get the widget config to access its schema
        $allConfigs = $this->getAllModuleWidgetConfigs();

        // Parse the widget key (Module.widget_key)
        $parts = explode('.', $key, 2);
        if (count($parts) !== 2) {
            throw new \InvalidArgumentException("Invalid widget key format: {$key}");
        }

        [$moduleName, $widgetKey] = $parts;

        // Get the user type from somewhere - for now we'll check both
        $widgetConfig = null;
        if (isset($allConfigs[$moduleName]['organisation'][$widgetKey])) {
            $widgetConfig = $allConfigs[$moduleName]['organisation'][$widgetKey];
        } elseif (isset($allConfigs[$moduleName]['customer'][$widgetKey])) {
            $widgetConfig = $allConfigs[$moduleName]['customer'][$widgetKey];
        }

        if (!$widgetConfig) {
            throw new \InvalidArgumentException("Widget config not found: {$key}");
        }

        $schema = $widgetConfig['settings_schema'] ?? [];
        $validatedSettings = [];

        foreach ($settings as $settingKey => $value) {
            // Check if this setting exists in the schema
            if (!isset($schema[$settingKey])) {
                // Ignore unknown settings
                continue;
            }

            $definition = $schema[$settingKey];
            $type = $definition['type'] ?? 'text';

            // Validate based on type
            try {
                $validatedSettings[$settingKey] = $this->validateSettingValue($value, $type, $definition);
            } catch (\Throwable $e) {
                throw new \InvalidArgumentException(
                    "Invalid value for setting '{$settingKey}': {$e->getMessage()}"
                );
            }
        }

        return $validatedSettings;
    }

    /**
     * Validate a single setting value based on its type and definition.
     *
     * @param mixed $value The value to validate
     * @param string $type The setting type
     * @param array $definition The setting definition
     * @return mixed The validated value
     * @throws \InvalidArgumentException If validation fails
     */
    private function validateSettingValue($value, string $type, array $definition)
    {
        switch ($type) {
            case 'number':
                $value = is_numeric($value) ? (int) $value : null;
                if ($value === null) {
                    throw new \InvalidArgumentException('Value must be a number');
                }
                if (isset($definition['min']) && $value < $definition['min']) {
                    throw new \InvalidArgumentException("Value must be at least {$definition['min']}");
                }
                if (isset($definition['max']) && $value > $definition['max']) {
                    throw new \InvalidArgumentException("Value must be at most {$definition['max']}");
                }
                return $value;

            case 'select':
                $options = $definition['options'] ?? [];
                if (!isset($options[$value])) {
                    throw new \InvalidArgumentException('Invalid option selected');
                }
                return $value;

            case 'multiselect':
                if (!is_array($value)) {
                    throw new \InvalidArgumentException('Value must be an array');
                }
                $options = $definition['options'] ?? [];
                foreach ($value as $item) {
                    if (!isset($options[$item])) {
                        throw new \InvalidArgumentException("Invalid option: {$item}");
                    }
                }
                return $value;

            case 'yes_no':
                return (bool) $value;

            case 'text':
            case 'date':
            case 'date_range':
            default:
                return is_string($value) ? trim($value) : (string) $value;
        }
    }

    /**
     * Get default settings from a settings schema.
     *
     * @param array $schema The settings schema
     * @return array Default settings
     */
    private function getDefaultSettings(array $schema): array
    {
        $defaults = [];

        foreach ($schema as $key => $definition) {
            if (isset($definition['default'])) {
                $defaults[$key] = $definition['default'];
            }
        }

        return $defaults;
    }

    /**
     * Determine the user type (organisation or customer).
     *
     * @param User $user
     * @return string 'organisation' or 'customer'
     */
    private function getUserType(User $user): string
    {
        return $user->last_customer_id ? 'customer' : 'organisation';
    }

    /**
     * Get the user's current role.
     *
     * @param User $user
     * @return string Role name (Admin, Manager, User)
     */
    private function getUserRole(User $user): string
    {
        $roles = $user->getRoleNames();

        // Return the first role, or 'User' as default
        return $roles->first() ?? 'User';
    }

    /**
     * Check if a module is enabled for the user's organisation.
     *
     * @param User $user
     * @param string $moduleName
     * @return bool
     */
    private function isModuleEnabled(User $user, string $moduleName): bool
    {
        // Get the organisation based on context
        $organisationId = $this->getContextOrganisationId($user);

        if (!$organisationId) {
            return false;
        }

        $organisation = Organisation::find($organisationId);

        if (!$organisation) {
            return false;
        }

        // Check if the module has a status setting
        $statusSetting = $organisation->settings()
            ->where('module', $moduleName)
            ->where('key', 'status')
            ->first();

        // If no status setting exists, assume enabled (for modules without settings)
        if (!$statusSetting) {
            return true;
        }

        return $statusSetting->value === '1';
    }

    /**
     * Get the organisation ID for the current context.
     *
     * @param User $user
     * @return string|null
     */
    private function getContextOrganisationId(User $user): ?string
    {
        // If user is in customer context, organisation_id is null for widget scope
        if ($user->last_customer_id) {
            return null;
        }

        return $user->last_organisation_id;
    }

    /**
     * Get the customer ID for the current context.
     *
     * @param User $user
     * @return string|null
     */
    private function getContextCustomerId(User $user): ?string
    {
        return $user->last_customer_id;
    }
}