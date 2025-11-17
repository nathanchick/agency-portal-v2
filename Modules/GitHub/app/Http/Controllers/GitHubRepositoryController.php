<?php

namespace Modules\GitHub\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Modules\Customer\Models\Project;
use Modules\GitHub\Exceptions\GitHubApiException;
use Modules\GitHub\Jobs\SyncRepositoryMetadata;
use Modules\GitHub\Models\GitHubRepository;
use Modules\GitHub\Services\GitHubApiService;
use Modules\GitHub\Services\GitHubRepositorySyncService;

/**
 * GitHubRepositoryController
 *
 * Handles repository management: listing, linking to projects, syncing.
 */
class GitHubRepositoryController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Create a new controller instance.
     */
    public function __construct(
        private GitHubApiService $apiService,
        private GitHubRepositorySyncService $syncService
    ) {
    }

    /**
     * List all accessible repositories from GitHub.
     *
     * GET /api/github/repositories
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            $forceRefresh = $request->boolean('refresh', false);

            // Fetch repositories from GitHub API (cached)
            $githubRepos = $this->apiService->listRepositories($organisation, $forceRefresh);

            // Get locally stored repositories
            $localRepos = GitHubRepository::where('organisation_id', $organisation->id)
                ->with('project')
                ->get()
                ->keyBy('github_repo_id');

            // Merge GitHub data with local data (link status, project info)
            $repositories = collect($githubRepos)->map(function ($repo) use ($localRepos) {
                $localRepo = $localRepos->get($repo['id']);

                return [
                    'id' => $repo['id'],
                    'name' => $repo['name'],
                    'full_name' => $repo['full_name'],
                    'owner' => $repo['owner']['login'] ?? null,
                    'description' => $repo['description'],
                    'language' => $repo['language'],
                    'is_private' => $repo['private'] ?? false,
                    'stars_count' => $repo['stargazers_count'] ?? 0,
                    'forks_count' => $repo['forks_count'] ?? 0,
                    'html_url' => $repo['html_url'],
                    'linked' => $localRepo !== null,
                    'linked_to_project' => $localRepo && $localRepo->project ? [
                        'id' => $localRepo->project->id,
                        'name' => $localRepo->project->name,
                    ] : null,
                    'last_synced_at' => $localRepo?->last_synced_at?->toIso8601String(),
                ];
            });

            return response()->json([
                'repositories' => $repositories,
                'total' => $repositories->count(),
            ]);

        } catch (GitHubApiException $e) {
            Log::error('GitHub API: Failed to list repositories', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'Failed to fetch repositories from GitHub',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Link a GitHub repository to a project.
     *
     * POST /api/github/repositories/{githubRepoId}/link
     */
    public function link(Request $request, int $githubRepoId): JsonResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            $validated = $request->validate([
                'project_id' => ['required', 'uuid', 'exists:projects,id'],
            ]);

            $project = Project::findOrFail($validated['project_id']);

            // Verify project belongs to current organisation
            if ($project->customer->organisation_id !== $organisation->id) {
                return response()->json([
                    'error' => 'Project does not belong to your organisation',
                ], 403);
            }

            // Check if project already has a linked repository
            if ($project->github_repository_id) {
                return response()->json([
                    'error' => 'Project already has a linked repository. Please unlink it first.',
                ], 422);
            }

            // Fetch repository data from GitHub
            $repoData = $this->apiService->getRepositoryById($organisation, $githubRepoId);

            if (! $repoData) {
                return response()->json([
                    'error' => 'Repository not found on GitHub or not accessible',
                ], 404);
            }

            // Create or update repository in local database
            $repository = $this->syncService->createOrUpdateRepository($organisation, $repoData);

            // Check if repository is already linked to another project
            if ($repository->project && $repository->project->id !== $project->id) {
                return response()->json([
                    'error' => 'Repository is already linked to another project',
                ], 422);
            }

            // Link repository to project
            $project->update([
                'github_repository_id' => $repository->id,
            ]);

            // Dispatch background job to sync metadata
            SyncRepositoryMetadata::dispatch($repository);

            Log::info('GitHub: Repository linked to project', [
                'organisation_id' => $organisation->id,
                'project_id' => $project->id,
                'repository_id' => $repository->id,
                'full_name' => $repository->full_name,
            ]);

            return response()->json([
                'message' => 'Repository linked successfully',
                'repository' => [
                    'id' => $repository->id,
                    'full_name' => $repository->full_name,
                    'github_repo_id' => $repository->github_repo_id,
                ],
                'project' => [
                    'id' => $project->id,
                    'name' => $project->name,
                ],
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (GitHubApiException $e) {
            Log::error('GitHub API: Failed to link repository', [
                'github_repo_id' => $githubRepoId,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'Failed to link repository',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Unlink a GitHub repository from a project.
     *
     * DELETE /api/github/repositories/{repositoryId}/unlink
     */
    public function unlink(Request $request, string $repositoryId): JsonResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            $repository = GitHubRepository::where('id', $repositoryId)
                ->where('organisation_id', $organisation->id)
                ->firstOrFail();

            $project = $repository->project;

            if (! $project) {
                return response()->json([
                    'error' => 'Repository is not linked to any project',
                ], 422);
            }

            // Unlink from project
            $project->update([
                'github_repository_id' => null,
            ]);

            Log::info('GitHub: Repository unlinked from project', [
                'organisation_id' => $organisation->id,
                'project_id' => $project->id,
                'repository_id' => $repository->id,
                'full_name' => $repository->full_name,
            ]);

            return response()->json([
                'message' => 'Repository unlinked successfully',
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Repository not found',
            ], 404);
        }
    }

    /**
     * Manually trigger sync for a repository.
     *
     * POST /api/github/repositories/{repositoryId}/sync
     */
    public function sync(Request $request, string $repositoryId): JsonResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            $repository = GitHubRepository::where('id', $repositoryId)
                ->where('organisation_id', $organisation->id)
                ->firstOrFail();

            // Dispatch sync job
            SyncRepositoryMetadata::dispatch($repository);

            Log::info('GitHub: Manual sync triggered', [
                'organisation_id' => $organisation->id,
                'repository_id' => $repository->id,
                'full_name' => $repository->full_name,
            ]);

            return response()->json([
                'message' => 'Sync started',
                'repository' => [
                    'id' => $repository->id,
                    'full_name' => $repository->full_name,
                ],
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Repository not found',
            ], 404);
        }
    }

    /**
     * Get GitHub repositories for a specific project.
     *
     * GET /api/projects/{projectId}/github-repository
     */
    public function projectRepository(Request $request, string $projectId): JsonResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            $project = Project::where('id', $projectId)
                ->whereHas('customer', function ($query) use ($organisation) {
                    $query->where('organisation_id', $organisation->id);
                })
                ->with('githubRepository')
                ->firstOrFail();

            if (! $project->githubRepository) {
                return response()->json([
                    'repository' => null,
                ]);
            }

            $repository = $project->githubRepository;

            return response()->json([
                'repository' => [
                    'id' => $repository->id,
                    'github_repo_id' => $repository->github_repo_id,
                    'name' => $repository->name,
                    'full_name' => $repository->full_name,
                    'owner' => $repository->owner,
                    'description' => $repository->description,
                    'language' => $repository->language,
                    'is_private' => $repository->is_private,
                    'default_branch' => $repository->default_branch,
                    'html_url' => $repository->html_url,
                    'stars_count' => $repository->stars_count,
                    'forks_count' => $repository->forks_count,
                    'open_issues_count' => $repository->open_issues_count,
                    'pushed_at' => $repository->pushed_at?->toIso8601String(),
                    'last_synced_at' => $repository->last_synced_at?->toIso8601String(),
                ],
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Project not found',
            ], 404);
        }
    }
}
