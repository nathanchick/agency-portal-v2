import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::index
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:41
* @route '/api/v1/github/repositories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/github/repositories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::index
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:41
* @route '/api/v1/github/repositories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::index
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:41
* @route '/api/v1/github/repositories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::index
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:41
* @route '/api/v1/github/repositories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::link
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:103
* @route '/api/v1/github/repositories/{githubRepoId}/link'
*/
export const link = (args: { githubRepoId: string | number } | [githubRepoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: link.url(args, options),
    method: 'post',
})

link.definition = {
    methods: ["post"],
    url: '/api/v1/github/repositories/{githubRepoId}/link',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::link
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:103
* @route '/api/v1/github/repositories/{githubRepoId}/link'
*/
link.url = (args: { githubRepoId: string | number } | [githubRepoId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { githubRepoId: args }
    }

    if (Array.isArray(args)) {
        args = {
            githubRepoId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        githubRepoId: args.githubRepoId,
    }

    return link.definition.url
            .replace('{githubRepoId}', parsedArgs.githubRepoId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::link
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:103
* @route '/api/v1/github/repositories/{githubRepoId}/link'
*/
link.post = (args: { githubRepoId: string | number } | [githubRepoId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: link.url(args, options),
    method: 'post',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::unlink
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:199
* @route '/api/v1/github/repositories/{repositoryId}/unlink'
*/
export const unlink = (args: { repositoryId: string | number } | [repositoryId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unlink.url(args, options),
    method: 'delete',
})

unlink.definition = {
    methods: ["delete"],
    url: '/api/v1/github/repositories/{repositoryId}/unlink',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::unlink
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:199
* @route '/api/v1/github/repositories/{repositoryId}/unlink'
*/
unlink.url = (args: { repositoryId: string | number } | [repositoryId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repositoryId: args }
    }

    if (Array.isArray(args)) {
        args = {
            repositoryId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        repositoryId: args.repositoryId,
    }

    return unlink.definition.url
            .replace('{repositoryId}', parsedArgs.repositoryId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::unlink
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:199
* @route '/api/v1/github/repositories/{repositoryId}/unlink'
*/
unlink.delete = (args: { repositoryId: string | number } | [repositoryId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unlink.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::sync
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:244
* @route '/api/v1/github/repositories/{repositoryId}/sync'
*/
export const sync = (args: { repositoryId: string | number } | [repositoryId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/api/v1/github/repositories/{repositoryId}/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::sync
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:244
* @route '/api/v1/github/repositories/{repositoryId}/sync'
*/
sync.url = (args: { repositoryId: string | number } | [repositoryId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repositoryId: args }
    }

    if (Array.isArray(args)) {
        args = {
            repositoryId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        repositoryId: args.repositoryId,
    }

    return sync.definition.url
            .replace('{repositoryId}', parsedArgs.repositoryId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::sync
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:244
* @route '/api/v1/github/repositories/{repositoryId}/sync'
*/
sync.post = (args: { repositoryId: string | number } | [repositoryId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::projectRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
export const projectRepository = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projectRepository.url(args, options),
    method: 'get',
})

projectRepository.definition = {
    methods: ["get","head"],
    url: '/api/v1/projects/{projectId}/github-repository',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::projectRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
projectRepository.url = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return projectRepository.definition.url
            .replace('{projectId}', parsedArgs.projectId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::projectRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
projectRepository.get = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projectRepository.url(args, options),
    method: 'get',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubRepositoryController::projectRepository
* @see Modules/GitHub/app/Http/Controllers/GitHubRepositoryController.php:282
* @route '/api/v1/projects/{projectId}/github-repository'
*/
projectRepository.head = (args: { projectId: string | number } | [projectId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: projectRepository.url(args, options),
    method: 'head',
})

const GitHubRepositoryController = { index, link, unlink, sync, projectRepository }

export default GitHubRepositoryController