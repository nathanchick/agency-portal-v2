import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ProjectController::index
* @see app/Http/Controllers/Api/ProjectController.php:27
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
* @see \App\Http\Controllers\Api\ProjectController::index
* @see app/Http/Controllers/Api/ProjectController.php:27
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
* @see \App\Http\Controllers\Api\ProjectController::index
* @see app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
index.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::index
* @see app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
index.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::index
* @see app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
const indexForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::index
* @see app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
indexForm.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::index
* @see app/Http/Controllers/Api/ProjectController.php:27
* @route '/api/organisations/{organisation}/projects'
*/
indexForm.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Api\ProjectController::store
* @see app/Http/Controllers/Api/ProjectController.php:49
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
* @see \App\Http\Controllers\Api\ProjectController::store
* @see app/Http/Controllers/Api/ProjectController.php:49
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
* @see \App\Http\Controllers\Api\ProjectController::store
* @see app/Http/Controllers/Api/ProjectController.php:49
* @route '/api/organisations/{organisation}/projects'
*/
store.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::store
* @see app/Http/Controllers/Api/ProjectController.php:49
* @route '/api/organisations/{organisation}/projects'
*/
const storeForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::store
* @see app/Http/Controllers/Api/ProjectController.php:49
* @route '/api/organisations/{organisation}/projects'
*/
storeForm.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\ProjectController::show
* @see app/Http/Controllers/Api/ProjectController.php:90
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
* @see \App\Http\Controllers\Api\ProjectController::show
* @see app/Http/Controllers/Api/ProjectController.php:90
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
* @see \App\Http\Controllers\Api\ProjectController::show
* @see app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
show.get = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::show
* @see app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
show.head = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::show
* @see app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
const showForm = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::show
* @see app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
showForm.get = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::show
* @see app/Http/Controllers/Api/ProjectController.php:90
* @route '/api/organisations/{organisation}/projects/{project}'
*/
showForm.head = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\ProjectController::update
* @see app/Http/Controllers/Api/ProjectController.php:112
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
* @see \App\Http\Controllers\Api\ProjectController::update
* @see app/Http/Controllers/Api/ProjectController.php:112
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
* @see \App\Http\Controllers\Api\ProjectController::update
* @see app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
update.put = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::update
* @see app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
update.patch = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::update
* @see app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
const updateForm = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::update
* @see app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
updateForm.put = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::update
* @see app/Http/Controllers/Api/ProjectController.php:112
* @route '/api/organisations/{organisation}/projects/{project}'
*/
updateForm.patch = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\ProjectController::destroy
* @see app/Http/Controllers/Api/ProjectController.php:155
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
* @see \App\Http\Controllers\Api\ProjectController::destroy
* @see app/Http/Controllers/Api/ProjectController.php:155
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
* @see \App\Http\Controllers\Api\ProjectController::destroy
* @see app/Http/Controllers/Api/ProjectController.php:155
* @route '/api/organisations/{organisation}/projects/{project}'
*/
destroy.delete = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::destroy
* @see app/Http/Controllers/Api/ProjectController.php:155
* @route '/api/organisations/{organisation}/projects/{project}'
*/
const destroyForm = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProjectController::destroy
* @see app/Http/Controllers/Api/ProjectController.php:155
* @route '/api/organisations/{organisation}/projects/{project}'
*/
destroyForm.delete = (args: { organisation: string | number, project: string | number } | [organisation: string | number, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ProjectController = { index, store, show, update, destroy }

export default ProjectController