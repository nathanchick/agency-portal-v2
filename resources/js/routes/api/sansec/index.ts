import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/sansecs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/sansecs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
export const show = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/sansecs/{sansec}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
show.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sansec: args }
    }

    if (Array.isArray(args)) {
        args = {
            sansec: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sansec: args.sansec,
    }

    return show.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
show.get = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
show.head = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
const showForm = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
showForm.get = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
showForm.head = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
export const update = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/sansecs/{sansec}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
update.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sansec: args }
    }

    if (Array.isArray(args)) {
        args = {
            sansec: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sansec: args.sansec,
    }

    return update.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
update.put = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
update.patch = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
const updateForm = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
updateForm.put = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
updateForm.patch = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
export const destroy = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/sansecs/{sansec}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
destroy.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sansec: args }
    }

    if (Array.isArray(args)) {
        args = {
            sansec: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sansec: args.sansec,
    }

    return destroy.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
destroy.delete = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
const destroyForm = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
destroyForm.delete = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const sansec = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default sansec