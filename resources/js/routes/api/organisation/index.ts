import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::index
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/organisations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::index
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::index
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::index
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::store
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/organisations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::store
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::store
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::show
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
export const show = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/organisations/{organisation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::show
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
show.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::show
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
show.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::show
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
show.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::update
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
export const update = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/organisations/{organisation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::update
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
update.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::update
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
update.put = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::update
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
update.patch = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::destroy
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
export const destroy = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/organisations/{organisation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::destroy
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
destroy.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::destroy
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:0
* @route '/api/v1/organisations/{organisation}'
*/
destroy.delete = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const organisation = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default organisation