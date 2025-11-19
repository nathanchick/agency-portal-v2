import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const showForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
showForm.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
showForm.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const updateForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
updateForm.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
updateForm.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const destroyForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
destroyForm.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const freshdesk = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default freshdesk