import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::index
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
export const index = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::index
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
index.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organisation: args }
    }

    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
    }

    return index.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::index
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
index.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::index
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
index.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::store
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:49
* @route '/api/organisations/{organisation}/projects'
*/
export const store = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/organisations/{organisation}/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::store
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:49
* @route '/api/organisations/{organisation}/projects'
*/
store.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organisation: args }
    }

    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
    }

    return store.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::store
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:49
* @route '/api/organisations/{organisation}/projects'
*/
store.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::show
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
export const show = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/projects/{project}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::show
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
show.url = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            project: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        project: args.project,
    }

    return show.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::show
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
show.get = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::show
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
show.head = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::update
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
export const update = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/organisations/{organisation}/projects/{project}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::update
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
update.url = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            project: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        project: args.project,
    }

    return update.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::update
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
update.put = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::update
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
update.patch = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:155
* @route '/api/organisations/{organisation}/projects/{project}'
*/
export const destroy = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/organisations/{organisation}/projects/{project}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:155
* @route '/api/organisations/{organisation}/projects/{project}'
*/
destroy.url = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            project: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        project: args.project,
    }

    return destroy.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\ProjectController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/ProjectController.php:155
* @route '/api/organisations/{organisation}/projects/{project}'
*/
destroy.delete = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ProjectController = { index, store, show, update, destroy }

export default ProjectController