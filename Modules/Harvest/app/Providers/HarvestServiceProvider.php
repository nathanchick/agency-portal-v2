<?php

namespace Modules\Harvest\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\ServiceProvider;
use Modules\Harvest\Console\Commands\DebugService;
use Modules\Harvest\Console\Commands\ImportHarvestData;
use Modules\Harvest\Console\Commands\SyncHarvestData;
use Nwidart\Modules\Traits\PathNamespace;

class HarvestServiceProvider extends ServiceProvider
{
    use PathNamespace;

    protected string $name = 'Harvest';

    protected string $nameLower = 'harvest';

    /**
     * Boot the application events.
     */
    public function boot(): void
    {
        $this->registerCommands();
        $this->registerCommandSchedules();
        $this->registerConfig();
        $this->loadMigrationsFrom(module_path($this->name, 'database/migrations'));
    }

    /**
     * Register the service provider.
     */
    public function register(): void
    {
        //
    }

    /**
     * Register commands in the format of Command::class
     */
    protected function registerCommands(): void
    {
        $this->commands([
            ImportHarvestData::class,
            SyncHarvestData::class,
            DebugService::class,
        ]);
    }

    /**
     * Register command Schedules.
     */
    protected function registerCommandSchedules(): void
    {
        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            $schedule->command('harvest:sync')->hourly();
        });
    }

    /**
     * Register config.
     */
    protected function registerConfig(): void
    {
        $configPath = module_path($this->name, 'config');

        if (is_dir($configPath)) {
            $this->publishes([$configPath => config_path()], 'config');
            $this->mergeConfigFrom($configPath.'/config.php', $this->nameLower);
        }
    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [];
    }
}
