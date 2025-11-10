<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Modules\Customer\Models\Customer;
use Modules\Customer\Models\CustomerSetting;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\OrganisationSetting;
use Modules\Website\Models\Website;
use Modules\Website\Models\WebsiteSetting;

class ModuleSettingsService
{
    /**
     * Get all module configurations from Modules config files
     */
    public function getAllModuleConfigs(): array
    {
        $modulesPath = base_path('Modules');
        $configs = [];

        if (!File::exists($modulesPath)) {
            return $configs;
        }

        $modules = File::directories($modulesPath);

        foreach ($modules as $modulePath) {
            $moduleName = basename($modulePath);
            $configPath = $modulePath.'/config/config.php';

            if (File::exists($configPath)) {
                $config = require $configPath;

                if (isset($config['organisation_settings']) ||
                    isset($config['customer_settings']) ||
                    isset($config['website_settings'])) {
                    $configs[$moduleName] = $config;
                }
            }
        }

        return $configs;
    }

    /**
     * Get organisation settings with current values
     */
    public function getOrganisationSettings(Organisation $organisation): array
    {
        $configs = $this->getAllModuleConfigs();
        $settings = [];

        foreach ($configs as $moduleName => $config) {
            if (!isset($config['organisation_settings'])) {
                continue;
            }

            $moduleSettings = [];

            foreach ($config['organisation_settings'] as $key => $definition) {
                $setting = $organisation->settings()
                    ->where('module', $moduleName)
                    ->where('key', $key)
                    ->first();

                $moduleSettings[$key] = [
                    'label' => $definition['label'] ?? $key,
                    'type' => $definition['type'] ?? 'text',
                    'value' => $setting?->value ?? ($definition['default'] ?? null),
                    'description' => $definition['description'] ?? null,
                    'options' => $definition['options'] ?? null,
                ];
            }

            if (!empty($moduleSettings)) {
                $settings[$moduleName] = [
                    'name' => $config['name'] ?? $moduleName,
                    'settings' => $moduleSettings,
                ];
            }
        }

        return $settings;
    }

    /**
     * Get customer settings with current values (only if organisation enabled)
     */
    public function getCustomerSettings(Customer $customer): array
    {
        $configs = $this->getAllModuleConfigs();
        $settings = [];
        $organisation = $customer->organisation;

        if (!$organisation) {
            return $settings;
        }

        foreach ($configs as $moduleName => $config) {
            if (!isset($config['customer_settings'])) {
                continue;
            }

            // Check if module is enabled at organisation level
            $orgStatus = $organisation->settings()
                ->where('module', $moduleName)
                ->where('key', 'status')
                ->first();

            if (!$orgStatus || $orgStatus->value !== '1') {
                continue; // Skip if not enabled at org level
            }

            $moduleSettings = [];

            foreach ($config['customer_settings'] as $key => $definition) {
                $setting = $customer->settings()
                    ->where('module', $moduleName)
                    ->where('key', $key)
                    ->first();

                $moduleSettings[$key] = [
                    'label' => $definition['label'] ?? $key,
                    'type' => $definition['type'] ?? 'text',
                    'value' => $setting?->value ?? ($definition['default'] ?? null),
                    'description' => $definition['description'] ?? null,
                    'options' => $definition['options'] ?? null,
                ];
            }

            if (!empty($moduleSettings)) {
                $settings[$moduleName] = [
                    'name' => $config['name'] ?? $moduleName,
                    'settings' => $moduleSettings,
                ];
            }
        }

        return $settings;
    }

    /**
     * Get website settings with current values (only if organisation enabled)
     */
    public function getWebsiteSettings(Website $website): array
    {
        $configs = $this->getAllModuleConfigs();
        $settings = [];
        $organisation = $website->customer?->organisation;

        if (!$organisation) {
            return $settings;
        }

        foreach ($configs as $moduleName => $config) {
            if (!isset($config['website_settings'])) {
                continue;
            }

            // Check if module is enabled at organisation level
            $orgStatus = $organisation->settings()
                ->where('module', $moduleName)
                ->where('key', 'status')
                ->first();

            if (!$orgStatus || $orgStatus->value !== '1') {
                continue; // Skip if not enabled at org level
            }

            $moduleSettings = [];

            foreach ($config['website_settings'] as $key => $definition) {
                $setting = $website->settings()
                    ->where('module', $moduleName)
                    ->where('key', $key)
                    ->first();

                $moduleSettings[$key] = [
                    'label' => $definition['label'] ?? $key,
                    'type' => $definition['type'] ?? 'text',
                    'value' => $setting?->value ?? ($definition['default'] ?? null),
                    'description' => $definition['description'] ?? null,
                    'options' => $definition['options'] ?? null,
                ];
            }

            if (!empty($moduleSettings)) {
                $settings[$moduleName] = [
                    'name' => $config['name'] ?? $moduleName,
                    'settings' => $moduleSettings,
                ];
            }
        }

        return $settings;
    }

    /**
     * Save organisation settings
     */
    public function saveOrganisationSettings(Organisation $organisation, array $settings): void
    {
        $configs = $this->getAllModuleConfigs();

        foreach ($settings as $moduleKey => $moduleSettings) {
            if (!isset($configs[$moduleKey]['organisation_settings'])) {
                continue;
            }

            foreach ($moduleSettings as $key => $value) {
                $definition = $configs[$moduleKey]['organisation_settings'][$key] ?? null;

                if (!$definition) {
                    continue;
                }

                $type = $definition['type'] ?? 'text';

                // Handle yes_no checkboxes (may not be present if unchecked)
                if ($type === 'yes_no') {
                    $value = $value ?? '0';
                }

                OrganisationSetting::updateOrCreate(
                    [
                        'organisation_id' => $organisation->id,
                        'module' => $moduleKey,
                        'key' => $key,
                    ],
                    [
                        'value' => $value,
                        'type' => $type,
                    ]
                );
            }
        }
    }

    /**
     * Save customer settings
     */
    public function saveCustomerSettings(Customer $customer, array $settings): void
    {
        $configs = $this->getAllModuleConfigs();

        foreach ($settings as $moduleKey => $moduleSettings) {
            if (!isset($configs[$moduleKey]['customer_settings'])) {
                continue;
            }

            foreach ($moduleSettings as $key => $value) {
                $definition = $configs[$moduleKey]['customer_settings'][$key] ?? null;

                if (!$definition) {
                    continue;
                }

                $type = $definition['type'] ?? 'text';

                // Handle yes_no checkboxes
                if ($type === 'yes_no') {
                    $value = $value ?? '0';
                }

                CustomerSetting::updateOrCreate(
                    [
                        'customer_id' => $customer->id,
                        'module' => $moduleKey,
                        'key' => $key,
                    ],
                    [
                        'value' => $value,
                        'type' => $type,
                    ]
                );
            }
        }
    }

    /**
     * Save website settings
     */
    public function saveWebsiteSettings(Website $website, array $settings): void
    {
        $configs = $this->getAllModuleConfigs();

        foreach ($settings as $moduleKey => $moduleSettings) {
            if (!isset($configs[$moduleKey]['website_settings'])) {
                continue;
            }

            foreach ($moduleSettings as $key => $value) {
                $definition = $configs[$moduleKey]['website_settings'][$key] ?? null;

                if (!$definition) {
                    continue;
                }

                $type = $definition['type'] ?? 'text';

                // Handle yes_no checkboxes
                if ($type === 'yes_no') {
                    $value = $value ?? '0';
                }

                WebsiteSetting::updateOrCreate(
                    [
                        'website_id' => $website->id,
                        'module' => $moduleKey,
                        'key' => $key,
                    ],
                    [
                        'value' => $value,
                        'type' => $type,
                    ]
                );
            }
        }
    }
}
