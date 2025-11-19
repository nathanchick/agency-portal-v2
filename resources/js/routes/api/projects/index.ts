import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::githubRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
export const githubRepository = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: githubRepository.url(args, options),
    method: 'get',
})

githubRepository.definition = {
    methods: ["get","head"],
    url: '/api/v1/projects/{projectId}/github-repository',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::githubRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
githubRepository.url = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { projectId: args }
    }

    if (Array.isArray(args)) {
        args = {
            projectId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        projectId: args.projectId,
    }

    return githubRepository.definition.url
            .replace('{projectId}', parsedArgs.projectId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::githubRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
githubRepository.get = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: githubRepository.url(args, options),
    method: 'get',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::githubRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
githubRepository.head = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: githubRepository.url(args, options),
    method: 'head',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::githubRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
const githubRepositoryForm = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: githubRepository.url(args, options),
    method: 'get',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::githubRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
githubRepositoryForm.get = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: githubRepository.url(args, options),
    method: 'get',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::githubRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
githubRepositoryForm.head = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: githubRepository.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

githubRepository.form = githubRepositoryForm

const projects = {
    githubRepository: Object.assign(githubRepository, githubRepository),
}

export default projects