<?php

use Illuminate\Support\Facades\Route;
use Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for the DashboardWidgets module.
|
*/

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('widgets', [DashboardWidgetController::class, 'index'])->name('dashboard.widgets.index');
    Route::post('widgets/save', [DashboardWidgetController::class, 'save'])->name('dashboard.widgets.save');
    Route::post('widgets/reset', [DashboardWidgetController::class, 'reset'])->name('dashboard.widgets.reset');
    Route::post('widgets/{widgetKey}/toggle', [DashboardWidgetController::class, 'toggle'])->name('dashboard.widgets.toggle');
});
