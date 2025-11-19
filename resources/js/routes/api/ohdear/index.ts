import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/ohdears',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/ohdears',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
export const show = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/ohdears/{ohdear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
show.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ohdear: args }
    }

    if (Array.isArray(args)) {
        args = {
            ohdear: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ohdear: args.ohdear,
    }

    return show.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
show.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
show.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
export const update = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/ohdears/{ohdear}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
update.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ohdear: args }
    }

    if (Array.isArray(args)) {
        args = {
            ohdear: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ohdear: args.ohdear,
    }

    return update.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
update.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
update.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
export const destroy = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/ohdears/{ohdear}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
destroy.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ohdear: args }
    }

    if (Array.isArray(args)) {
        args = {
            ohdear: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ohdear: args.ohdear,
    }

    return destroy.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
destroy.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ohdear = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default ohdear