<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Customer\Models\Customer;
use Modules\DashboardWidgets\Models\UserDashboardWidget;
use Modules\Organisation\Models\Organisation;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

/**
 * DashboardWidgetTest
 *
 * Feature tests for the Dashboard Widget API endpoints.
 * Tests widget loading, saving, resetting, toggling, and permission filtering.
 */
class DashboardWidgetTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that authenticated users can get their available and configured widgets.
     */
    public function test_get_dashboard_widgets_returns_available_and_user_widgets(): void
    {
        // Create organisation and user
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        // Assign user to organisation with Admin role
        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Create a widget for the user
        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'Ticket.recent_tickets',
            'position' => 0,
            'width' => 1,
            'is_visible' => true,
            'settings' => ['limit' => 10],
        ]);

        // Make request
        $response = $this->actingAs($user)->getJson(route('dashboard.widgets.index'));

        // Assert response structure
        $response->assertOk()
            ->assertJsonStructure([
                'available_widgets' => [
                    '*' => [
                        'key',
                        'module',
                        'name',
                        'description',
                        'icon',
                        'component',
                        'roles',
                        'default_width',
                        'default_visible',
                        'configurable',
                    ],
                ],
                'user_widgets' => [
                    '*' => [
                        'id',
                        'widget_key',
                        'position',
                        'width',
                        'is_visible',
                        'settings',
                    ],
                ],
            ]);

        // Assert user widget is returned
        $response->assertJsonPath('user_widgets.0.widget_key', 'Ticket.recent_tickets');
    }

    /**
     * Test that users with no widgets get defaults created automatically.
     */
    public function test_get_widgets_creates_defaults_for_new_users(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Ensure user has no widgets
        $this->assertEquals(0, UserDashboardWidget::where('user_id', $user->id)->count());

        // Make request
        $response = $this->actingAs($user)->getJson(route('dashboard.widgets.index'));

        $response->assertOk();

        // Assert default widgets were created
        $this->assertGreaterThan(0, UserDashboardWidget::where('user_id', $user->id)->count());

        // Assert response includes user_widgets
        $response->assertJsonStructure(['user_widgets']);
        $userWidgets = $response->json('user_widgets');
        $this->assertNotEmpty($userWidgets);
    }

    /**
     * Test that users can save their widget layout.
     */
    public function test_save_widget_layout_creates_and_updates_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Prepare widget data
        $widgetData = [
            'widgets' => [
                [
                    'widget_key' => 'Ticket.recent_tickets',
                    'position' => 0,
                    'width' => 1,
                    'is_visible' => true,
                    'settings' => ['limit' => 15, 'status' => 'open'],
                ],
                [
                    'widget_key' => 'Ticket.ticket_statistics',
                    'position' => 1,
                    'width' => 2,
                    'is_visible' => true,
                    'settings' => ['date_range' => '30'],
                ],
            ],
        ];

        // Make request
        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), $widgetData);

        // Assert response
        $response->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Widget layout saved successfully',
            ])
            ->assertJsonStructure(['widgets']);

        // Assert widgets were created in database
        $savedWidgets = UserDashboardWidget::where('user_id', $user->id)->get();
        $this->assertCount(2, $savedWidgets);

        // Assert first widget
        $firstWidget = $savedWidgets->where('widget_key', 'Ticket.recent_tickets')->first();
        $this->assertNotNull($firstWidget);
        $this->assertEquals(0, $firstWidget->position);
        $this->assertEquals(1, $firstWidget->width);
        $this->assertTrue($firstWidget->is_visible);
        $this->assertEquals(['limit' => 15, 'status' => 'open'], $firstWidget->settings);

        // Assert second widget
        $secondWidget = $savedWidgets->where('widget_key', 'Ticket.ticket_statistics')->first();
        $this->assertNotNull($secondWidget);
        $this->assertEquals(1, $secondWidget->position);
        $this->assertEquals(2, $secondWidget->width);
    }

    /**
     * Test that saving widgets replaces existing configuration.
     */
    public function test_save_widget_layout_replaces_existing_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Create initial widget
        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'Ticket.recent_tickets',
            'position' => 0,
            'width' => 1,
            'is_visible' => true,
        ]);

        $this->assertCount(1, UserDashboardWidget::where('user_id', $user->id)->get());

        // Save new layout with different widget
        $widgetData = [
            'widgets' => [
                [
                    'widget_key' => 'Ticket.ticket_statistics',
                    'position' => 0,
                    'width' => 2,
                    'is_visible' => true,
                ],
            ],
        ];

        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), $widgetData);

        $response->assertOk();

        // Assert old widget was deleted and new one created
        $savedWidgets = UserDashboardWidget::where('user_id', $user->id)->get();
        $this->assertCount(1, $savedWidgets);
        $this->assertEquals('Ticket.ticket_statistics', $savedWidgets->first()->widget_key);
    }

    /**
     * Test that reset deletes all widgets and recreates defaults.
     */
    public function test_reset_to_defaults_deletes_and_recreates_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Create custom widget
        UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'Ticket.recent_tickets',
            'position' => 5,  // Non-default position
            'width' => 3,     // Non-default width
            'is_visible' => false,  // Hidden
            'settings' => ['limit' => 50],
        ]);

        // Reset to defaults
        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.reset'));

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Dashboard reset to defaults',
            ])
            ->assertJsonStructure(['widgets']);

        // Assert widgets were reset
        $widgets = UserDashboardWidget::where('user_id', $user->id)->get();
        $this->assertGreaterThan(0, $widgets->count());

        // Assert widgets have default values
        foreach ($widgets as $widget) {
            $this->assertTrue($widget->is_visible);
        }
    }

    /**
     * Test that widget visibility can be toggled.
     */
    public function test_toggle_widget_visibility(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Create widget
        $widget = UserDashboardWidget::create([
            'user_id' => $user->id,
            'organisation_id' => $organisation->id,
            'customer_id' => null,
            'widget_key' => 'Ticket.recent_tickets',
            'position' => 0,
            'width' => 1,
            'is_visible' => true,
        ]);

        // Toggle to hidden
        $response = $this->actingAs($user)->postJson(
            route('dashboard.widgets.toggle', ['widgetKey' => 'Ticket.recent_tickets']),
            ['is_visible' => false]
        );

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Widget visibility updated',
            ]);

        // Assert widget is now hidden
        $widget->refresh();
        $this->assertFalse($widget->is_visible);

        // Toggle back to visible
        $response = $this->actingAs($user)->postJson(
            route('dashboard.widgets.toggle', ['widgetKey' => 'Ticket.recent_tickets']),
            ['is_visible' => true]
        );

        $response->assertOk();

        $widget->refresh();
        $this->assertTrue($widget->is_visible);
    }

    /**
     * Test that Admin users see more widgets than regular Users.
     */
    public function test_role_based_filtering_admin_sees_more_than_user(): void
    {
        $organisation = Organisation::factory()->create();

        // Create Admin user
        $adminUser = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);
        $adminUser->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $adminUser->assignRole($adminRole);

        // Create regular User
        $regularUser = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);
        $regularUser->organisations()->attach($organisation);
        $userRole = Role::firstOrCreate(['name' => 'User', 'guard_name' => 'web']);
        $regularUser->assignRole($userRole);

        // Get widgets for Admin
        $adminResponse = $this->actingAs($adminUser)->getJson(route('dashboard.widgets.index'));
        $adminWidgets = $adminResponse->json('available_widgets');

        // Get widgets for User
        $userResponse = $this->actingAs($regularUser)->getJson(route('dashboard.widgets.index'));
        $userWidgets = $userResponse->json('available_widgets');

        // Admin should see at least as many widgets as User
        $this->assertGreaterThanOrEqual(count($userWidgets), count($adminWidgets));

        // Specifically, Admin should see ticket_statistics (which is Admin/Manager only)
        $adminWidgetKeys = array_column($adminWidgets, 'key');
        $userWidgetKeys = array_column($userWidgets, 'key');

        $this->assertContains('Ticket.ticket_statistics', $adminWidgetKeys);
        $this->assertNotContains('Ticket.ticket_statistics', $userWidgetKeys);
    }

    /**
     * Test that organisation and customer users see different widgets.
     */
    public function test_user_type_filtering_organisation_vs_customer(): void
    {
        $organisation = Organisation::factory()->create();
        $customer = Customer::factory()->create([
            'organisation_id' => $organisation->id,
        ]);

        // Create organisation user
        $orgUser = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);
        $orgUser->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $orgUser->assignRole($adminRole);

        // Create customer user
        $customerUser = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => $customer->id,
        ]);
        $customerUser->customers()->attach($customer);
        $customerUser->assignRole($adminRole);

        // Get widgets for organisation user
        $orgResponse = $this->actingAs($orgUser)->getJson(route('dashboard.widgets.index'));
        $orgWidgets = $orgResponse->json('available_widgets');

        // Get widgets for customer user
        $customerResponse = $this->actingAs($customerUser)->getJson(route('dashboard.widgets.index'));
        $customerWidgets = $customerResponse->json('available_widgets');

        // Get widget keys
        $orgWidgetKeys = array_column($orgWidgets, 'key');
        $customerWidgetKeys = array_column($customerWidgets, 'key');

        // Organisation user should see organisation widgets (e.g., recent_tickets)
        $this->assertContains('Ticket.recent_tickets', $orgWidgetKeys);

        // Customer user should see customer widgets (e.g., my_tickets)
        $this->assertContains('Ticket.my_tickets', $customerWidgetKeys);

        // Customer user should NOT see organisation-only widgets
        $this->assertNotContains('Ticket.recent_tickets', $customerWidgetKeys);
    }

    /**
     * Test that widgets from disabled modules are hidden.
     */
    public function test_module_disabled_hides_widgets(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Disable Ticket module for this organisation
        $organisation->settings()->create([
            'module' => 'Ticket',
            'key' => 'status',
            'value' => '0',  // Disabled
        ]);

        // Get available widgets
        $response = $this->actingAs($user)->getJson(route('dashboard.widgets.index'));
        $widgets = $response->json('available_widgets');
        $widgetKeys = array_column($widgets, 'key');

        // Assert Ticket widgets are not available
        $this->assertNotContains('Ticket.recent_tickets', $widgetKeys);
        $this->assertNotContains('Ticket.ticket_statistics', $widgetKeys);
    }

    /**
     * Test that saving with an invalid widget key returns an error.
     */
    public function test_invalid_widget_key_returns_error(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Try to save with invalid widget key
        $widgetData = [
            'widgets' => [
                [
                    'widget_key' => 'InvalidModule.invalid_widget',
                    'position' => 0,
                    'width' => 1,
                    'is_visible' => true,
                ],
            ],
        ];

        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), $widgetData);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
            ])
            ->assertJsonFragment(['Invalid or unauthorized widget key']);
    }

    /**
     * Test that unauthorized users cannot toggle widgets they don't have access to.
     */
    public function test_toggle_invalid_widget_key_returns_error(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Try to toggle non-existent widget
        $response = $this->actingAs($user)->postJson(
            route('dashboard.widgets.toggle', ['widgetKey' => 'InvalidModule.invalid_widget']),
            ['is_visible' => false]
        );

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid or unauthorized widget key',
            ]);
    }

    /**
     * Test that widget settings are validated against schema.
     */
    public function test_settings_validation_enforces_schema(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $user->assignRole($adminRole);

        // Test 1: Invalid number (exceeds max)
        $widgetData = [
            'widgets' => [
                [
                    'widget_key' => 'Ticket.recent_tickets',
                    'position' => 0,
                    'width' => 1,
                    'is_visible' => true,
                    'settings' => ['limit' => 100],  // Max is 50
                ],
            ],
        ];

        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), $widgetData);

        $response->assertStatus(400)
            ->assertJson(['success' => false]);

        // Test 2: Invalid select option
        $widgetData = [
            'widgets' => [
                [
                    'widget_key' => 'Ticket.recent_tickets',
                    'position' => 0,
                    'width' => 1,
                    'is_visible' => true,
                    'settings' => ['status' => 'invalid_status'],  // Not in options
                ],
            ],
        ];

        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), $widgetData);

        $response->assertStatus(400)
            ->assertJson(['success' => false]);

        // Test 3: Valid settings should work
        $widgetData = [
            'widgets' => [
                [
                    'widget_key' => 'Ticket.recent_tickets',
                    'position' => 0,
                    'width' => 1,
                    'is_visible' => true,
                    'settings' => ['limit' => 25, 'status' => 'open'],  // Valid
                ],
            ],
        ];

        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), $widgetData);

        $response->assertOk()
            ->assertJson(['success' => true]);

        // Verify settings were saved correctly
        $widget = UserDashboardWidget::where('user_id', $user->id)->first();
        $this->assertEquals(['limit' => 25, 'status' => 'open'], $widget->settings);
    }

    /**
     * Test that validation errors return proper error messages.
     */
    public function test_validation_errors_return_proper_messages(): void
    {
        $organisation = Organisation::factory()->create();
        $user = User::factory()->create([
            'last_organisation_id' => $organisation->id,
            'last_customer_id' => null,
        ]);

        $user->organisations()->attach($organisation);

        // Test missing required field
        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), [
            'widgets' => [
                [
                    // Missing widget_key
                    'position' => 0,
                    'width' => 1,
                ],
            ],
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation failed',
            ])
            ->assertJsonStructure(['errors']);

        // Test invalid width
        $response = $this->actingAs($user)->postJson(route('dashboard.widgets.save'), [
            'widgets' => [
                [
                    'widget_key' => 'Ticket.recent_tickets',
                    'position' => 0,
                    'width' => 5,  // Max is 3
                ],
            ],
        ]);

        $response->assertStatus(422)
            ->assertJsonStructure(['errors']);
    }

    /**
     * Test that guests are redirected when trying to access widget endpoints.
     */
    public function test_guests_cannot_access_widget_endpoints(): void
    {
        $this->getJson(route('dashboard.widgets.index'))
            ->assertUnauthorized();

        $this->postJson(route('dashboard.widgets.save'), ['widgets' => []])
            ->assertUnauthorized();

        $this->postJson(route('dashboard.widgets.reset'))
            ->assertUnauthorized();

        $this->postJson(route('dashboard.widgets.toggle', ['widgetKey' => 'test']), ['is_visible' => false])
            ->assertUnauthorized();
    }
}
