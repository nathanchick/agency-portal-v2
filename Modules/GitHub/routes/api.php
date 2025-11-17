<?php

use Illuminate\Support\Facades\Route;
use Modules\GitHub\Http\Controllers\GitHubRepositoryController;

/*
|--------------------------------------------------------------------------
| API Routes - GitHub Repositories
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    // Repository management
    Route::get('/github/repositories', [GitHubRepositoryController::class, 'index'])->name('github.repositories.index');
    Route::post('/github/repositories/{githubRepoId}/link', [GitHubRepositoryController::class, 'link'])->name('github.repositories.link');
    Route::delete('/github/repositories/{repositoryId}/unlink', [GitHubRepositoryController::class, 'unlink'])->name('github.repositories.unlink');
    Route::post('/github/repositories/{repositoryId}/sync', [GitHubRepositoryController::class, 'sync'])->name('github.repositories.sync');

    // Project repository endpoint
    Route::get('/projects/{projectId}/github-repository', [GitHubRepositoryController::class, 'projectRepository'])->name('projects.github-repository');
});
