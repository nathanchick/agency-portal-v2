import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/freshdesks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/freshdesks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
export const show = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freshdesk: args }
    }

    if (Array.isArray(args)) {
        args = {
            freshdesk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        freshdesk: args.freshdesk,
    }

    return show.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
export const update = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freshdesk: args }
    }

    if (Array.isArray(args)) {
        args = {
            freshdesk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        freshdesk: args.freshdesk,
    }

    return update.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
export const destroy = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
destroy.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freshdesk: args }
    }

    if (Array.isArray(args)) {
        args = {
            freshdesk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        freshdesk: args.freshdesk,
    }

    return destroy.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
destroy.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const freshdesk = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default freshdesk