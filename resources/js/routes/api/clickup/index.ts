import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/clickups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/clickups',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
export const show = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/clickups/{clickup}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { clickup: args }
    }

    if (Array.isArray(args)) {
        args = {
            clickup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        clickup: args.clickup,
    }

    return show.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
const showForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
showForm.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
showForm.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
export const update = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/clickups/{clickup}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
update.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { clickup: args }
    }

    if (Array.isArray(args)) {
        args = {
            clickup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        clickup: args.clickup,
    }

    return update.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
update.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
update.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
const updateForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
updateForm.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
updateForm.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
export const destroy = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/clickups/{clickup}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
destroy.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { clickup: args }
    }

    if (Array.isArray(args)) {
        args = {
            clickup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        clickup: args.clickup,
    }

    return destroy.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
destroy.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
const destroyForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
destroyForm.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const clickup = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default clickup