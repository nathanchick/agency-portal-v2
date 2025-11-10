import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/websites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
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
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/websites',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
export const show = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/websites/{website}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
show.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { website: args }
    }

    if (Array.isArray(args)) {
        args = {
            website: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        website: args.website,
    }

    return show.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
show.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
show.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
const showForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
showForm.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
showForm.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
export const update = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/websites/{website}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
update.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { website: args }
    }

    if (Array.isArray(args)) {
        args = {
            website: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        website: args.website,
    }

    return update.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
update.put = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
update.patch = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
const updateForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
updateForm.put = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
updateForm.patch = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
export const destroy = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/websites/{website}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
destroy.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { website: args }
    }

    if (Array.isArray(args)) {
        args = {
            website: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        website: args.website,
    }

    return destroy.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
destroy.delete = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
const destroyForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
destroyForm.delete = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const website = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default website