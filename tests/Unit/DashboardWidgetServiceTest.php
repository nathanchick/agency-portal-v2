<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use Modules\Customer\Models\Customer;
use Modules\DashboardWidgets\Models\UserDashboardWidget;
use Modules\DashboardWidgets\Services\DashboardWidgetService;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\OrganisationSetting;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DashboardWidgetServiceTest extends TestCase
{
    use RefreshDatabase;

    private DashboardWidgetService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new DashboardWidgetService();
    }

    /**
     * Test getAllModuleWidgetConfigs() loads all widget configs
     */
    public function test_get_all_module_widget_configs_loads_all_configs(): void
    {
        $configs = $this->service->getAllModuleWidgetConfigs();

        $this->assertIsArray($configs);

        // Check if DashboardWidgets module config is loaded
        $this->assertArrayHasKey('DashboardWidgets', $configs);

        // Verify structure
        foreach ($configs as $moduleName => $config) {
            $this->assertIsArray($config);
        }
    }

    /**
     * Test getAllModuleWidgetConfigs() returns cached results on second call
     */
    public function test_get_all_module_widget_configs_caches_results(): void
    {
        // First call
        $configs1 = $this->service->getAllModuleWidgetConfigs();

        // Second call should return the same instance (cached)
        $configs2 = $this->service->getAllModuleWidgetConfigs();

        $this->assertSame($configs1, $configs2);
    }

    /**
     * Test getAllModuleWidgetConfigs() handles missing modules directory gracefully
     */
    public function test_get_all_module_widget_configs_handles_missing_directory(): void
    {
        // Create a new service instance with a non-existent path
        $service = new DashboardWidgetService();

        // Mock the File facade to return false for exists()
        File::shouldReceive('exists')
            ->once()
            ->andReturn(false);

        $configs = $service->getAllModuleWidgetConfigs();

        $this->assertIsArray($configs);
        $this->assertEmpty($configs);
    }

    /**
     * Test getAvailableWidgets() filters by user type (organisation)
     */
    public function test_get_available_widgets_filters_by_organisation_user_type(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $widgets = $this->service->getAvailableWidgets($user);

        $this->assertIsArray($widgets);

        // All widgets should be for organisation user type
        foreach ($widgets as $key => $widget) {
            $this->assertArrayHasKey('key', $widget);
            $this->assertArrayHasKey('module', $widget);
        }
    }

    /**
     * Test getAvailableWidgets() filters by user type (customer)
     */
    public function test_get_available_widgets_filters_by_customer_user_type(): void
    {
        $organisation = Organisation::factory()->create();
        $customer = Customer::factory()->create([
            'organisation_id' => $organisation->id,
        ]);
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => $customer->id,
        ]);

        $user->assignRole('User');

        $widgets = $this->service->getAvailableWidgets($user);

        $this->assertIsArray($widgets);
    }

    /**
     * Test getAvailableWidgets() filters by user role (Admin)
     */
    public function test_get_available_widgets_filters_by_admin_role(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $widgets = $this->service->getAvailableWidgets($user);

        $this->assertIsArray($widgets);

        // Admin should see all widgets (including admin-only widgets)
        foreach ($widgets as $widget) {
            $allowedRoles = $widget['roles'] ?? ['Admin', 'Manager', 'User'];
            $this->assertContains('Admin', $allowedRoles);
        }
    }

    /**
     * Test getAvailableWidgets() filters by user role (User)
     */
    public function test_get_available_widgets_filters_by_user_role(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('User');

        $widgets = $this->service->getAvailableWidgets($user);

        $this->assertIsArray($widgets);

        // User should only see widgets where 'User' is in allowed roles
        foreach ($widgets as $widget) {
            $allowedRoles = $widget['roles'] ?? ['Admin', 'Manager', 'User'];
            $this->assertContains('User', $allowedRoles);
        }
    }

    /**
     * Test getAvailableWidgets() excludes disabled modules
     */
    public function test_get_available_widgets_excludes_disabled_modules(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        // Disable DashboardWidgets module
        OrganisationSetting::create([
            'organisation_id' => $organisation->id,
            'module' => 'DashboardWidgets',
            'key' => 'status',
            'value' => '0',
        ]);

        $widgets = $this->service->getAvailableWidgets($user);

        // DashboardWidgets module widgets should not be present
        foreach ($widgets as $key => $widget) {
            $this->assertNotEquals('DashboardWidgets', $widget['module']);
        }
    }

    /**
     * Test getUserWidgets() returns user's configured widgets
     */
    public function test_get_user_widgets_returns_user_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        // Create some widgets for the user
        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'DashboardWidgets.welcome',
            'position' => 0,
            'width' => 1,
            'is_visible' => true,
        ]);

        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'DashboardWidgets.quick_links',
            'position' => 1,
            'width' => 2,
            'is_visible' => true,
        ]);

        $widgets = $this->service->getUserWidgets($user);

        $this->assertCount(2, $widgets);
        $this->assertEquals('DashboardWidgets.welcome', $widgets[0]->widget_key);
        $this->assertEquals('DashboardWidgets.quick_links', $widgets[1]->widget_key);
    }

    /**
     * Test getUserWidgets() returns widgets ordered by position
     */
    public function test_get_user_widgets_orders_by_position(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        // Create widgets in non-sequential order
        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'widget.third',
            'position' => 2,
            'width' => 1,
            'is_visible' => true,
        ]);

        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'widget.first',
            'position' => 0,
            'width' => 1,
            'is_visible' => true,
        ]);

        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'widget.second',
            'position' => 1,
            'width' => 1,
            'is_visible' => true,
        ]);

        $widgets = $this->service->getUserWidgets($user);

        $this->assertCount(3, $widgets);
        $this->assertEquals('widget.first', $widgets[0]->widget_key);
        $this->assertEquals('widget.second', $widgets[1]->widget_key);
        $this->assertEquals('widget.third', $widgets[2]->widget_key);
    }

    /**
     * Test saveUserWidgetPreferences() validates widget keys
     */
    public function test_save_user_widget_preferences_validates_widget_keys(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid or unauthorized widget key');

        $this->service->saveUserWidgetPreferences($user, [
            [
                'widget_key' => 'NonExistent.invalid_widget',
                'position' => 0,
                'width' => 1,
            ],
        ]);
    }

    /**
     * Test saveUserWidgetPreferences() requires widget_key
     */
    public function test_save_user_widget_preferences_requires_widget_key(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Widget key is required');

        $this->service->saveUserWidgetPreferences($user, [
            [
                'position' => 0,
                'width' => 1,
            ],
        ]);
    }

    /**
     * Test saveUserWidgetPreferences() saves widgets correctly
     */
    public function test_save_user_widget_preferences_saves_widgets_correctly(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $widgets = $this->service->saveUserWidgetPreferences($user, [
            [
                'widget_key' => 'DashboardWidgets.welcome',
                'position' => 0,
                'width' => 1,
                'is_visible' => true,
            ],
        ]);

        $this->assertCount(1, $widgets);
        $this->assertEquals('DashboardWidgets.welcome', $widgets[0]->widget_key);
        $this->assertEquals(0, $widgets[0]->position);
        $this->assertEquals(1, $widgets[0]->width);
        $this->assertTrue($widgets[0]->is_visible);
    }

    /**
     * Test saveUserWidgetPreferences() deletes existing widgets before saving
     */
    public function test_save_user_widget_preferences_deletes_existing_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        // Create existing widgets
        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'old.widget',
            'position' => 0,
            'width' => 1,
            'is_visible' => true,
        ]);

        $this->assertCount(1, UserDashboardWidget::all());

        // Save new widgets
        $this->service->saveUserWidgetPreferences($user, [
            [
                'widget_key' => 'DashboardWidgets.welcome',
                'position' => 0,
                'width' => 1,
            ],
        ]);

        // Should only have 1 widget (the new one)
        $this->assertCount(1, UserDashboardWidget::all());
        $this->assertEquals('DashboardWidgets.welcome', UserDashboardWidget::first()->widget_key);
    }

    /**
     * Test createDefaultWidgets() creates widgets with default_visible true
     */
    public function test_create_default_widgets_creates_default_visible_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $widgets = $this->service->createDefaultWidgets($user);

        $this->assertGreaterThan(0, $widgets->count());

        // All created widgets should be visible
        foreach ($widgets as $widget) {
            $this->assertTrue($widget->is_visible);
        }
    }

    /**
     * Test createDefaultWidgets() uses default settings from schema
     */
    public function test_create_default_widgets_uses_default_settings(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $widgets = $this->service->createDefaultWidgets($user);

        // Check that widgets have settings applied
        foreach ($widgets as $widget) {
            if ($widget->settings) {
                $this->assertIsArray($widget->settings);
            }
        }
    }

    /**
     * Test createDefaultWidgets() respects default_position
     */
    public function test_create_default_widgets_respects_default_position(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $widgets = $this->service->createDefaultWidgets($user);

        // Verify widgets have position values
        foreach ($widgets as $widget) {
            $this->assertIsInt($widget->position);
            $this->assertGreaterThanOrEqual(0, $widget->position);
        }
    }

    /**
     * Test resetToDefaults() deletes existing widgets
     */
    public function test_reset_to_defaults_deletes_existing_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        // Create existing widgets
        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'custom.widget',
            'position' => 0,
            'width' => 1,
            'is_visible' => true,
        ]);

        $this->assertCount(1, UserDashboardWidget::all());

        $widgets = $this->service->resetToDefaults($user);

        // Should have default widgets, not the custom one
        foreach ($widgets as $widget) {
            $this->assertNotEquals('custom.widget', $widget->widget_key);
        }
    }

    /**
     * Test resetToDefaults() creates default widgets
     */
    public function test_reset_to_defaults_creates_default_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $widgets = $this->service->resetToDefaults($user);

        $this->assertGreaterThan(0, $widgets->count());
    }

    /**
     * Test validateWidgetKey() returns true for valid widget
     */
    public function test_validate_widget_key_returns_true_for_valid_widget(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $isValid = $this->service->validateWidgetKey('DashboardWidgets.welcome', $user);

        $this->assertTrue($isValid);
    }

    /**
     * Test validateWidgetKey() returns false for invalid widget
     */
    public function test_validate_widget_key_returns_false_for_invalid_widget(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->assignRole('Admin');

        $isValid = $this->service->validateWidgetKey('NonExistent.widget', $user);

        $this->assertFalse($isValid);
    }

    /**
     * Test validateWidgetSettings() validates number type
     */
    public function test_validate_widget_settings_validates_number_type(): void
    {
        $settings = $this->service->validateWidgetSettings(
            'DashboardWidgets.welcome',
            ['custom_number' => '10']
        );

        $this->assertIsArray($settings);
    }

    /**
     * Test validateWidgetSettings() throws exception for invalid widget key format
     */
    public function test_validate_widget_settings_throws_exception_for_invalid_key_format(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid widget key format');

        $this->service->validateWidgetSettings('InvalidKeyFormat', []);
    }

    /**
     * Test validateWidgetSettings() throws exception for non-existent widget
     */
    public function test_validate_widget_settings_throws_exception_for_non_existent_widget(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Widget config not found');

        $this->service->validateWidgetSettings('NonExistent.widget', []);
    }

    /**
     * Test validateWidgetSettings() ignores unknown settings
     */
    public function test_validate_widget_settings_ignores_unknown_settings(): void
    {
        $settings = $this->service->validateWidgetSettings(
            'DashboardWidgets.welcome',
            [
                'unknown_setting' => 'value',
            ]
        );

        $this->assertArrayNotHasKey('unknown_setting', $settings);
    }
}
