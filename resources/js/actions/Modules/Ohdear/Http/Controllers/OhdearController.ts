import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
const showForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
showForm.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
showForm.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
const updateForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
updateForm.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
updateForm.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
const destroyForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:0
* @route '/api/v1/ohdears/{ohdear}'
*/
destroyForm.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
export const setup = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(args, options),
    method: 'post',
})

setup.definition = {
    methods: ["post"],
    url: '/ohdear/websites/{websiteId}/setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
setup.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return setup.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
setup.post = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
const setupForm = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setup.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
setupForm.post = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setup.url(args, options),
    method: 'post',
})

setup.form = setupForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:149
* @route '/ohdear/websites/{websiteId}/urls'
*/
export const addUrl = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addUrl.url(args, options),
    method: 'post',
})

addUrl.definition = {
    methods: ["post"],
    url: '/ohdear/websites/{websiteId}/urls',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:149
* @route '/ohdear/websites/{websiteId}/urls'
*/
addUrl.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return addUrl.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:149
* @route '/ohdear/websites/{websiteId}/urls'
*/
addUrl.post = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addUrl.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:149
* @route '/ohdear/websites/{websiteId}/urls'
*/
const addUrlForm = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addUrl.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:149
* @route '/ohdear/websites/{websiteId}/urls'
*/
addUrlForm.post = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addUrl.url(args, options),
    method: 'post',
})

addUrl.form = addUrlForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:195
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
export const deleteUrl = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUrl.url(args, options),
    method: 'delete',
})

deleteUrl.definition = {
    methods: ["delete"],
    url: '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:195
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
deleteUrl.url = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
            ohdearWebsiteId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
        ohdearWebsiteId: args.ohdearWebsiteId,
    }

    return deleteUrl.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace('{ohdearWebsiteId}', parsedArgs.ohdearWebsiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:195
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
deleteUrl.delete = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUrl.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:195
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
const deleteUrlForm = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteUrl.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:195
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
deleteUrlForm.delete = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteUrl.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteUrl.form = deleteUrlForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
export const uptime = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

uptime.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/uptime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptime.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return uptime.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptime.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptime.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: uptime.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
const uptimeForm = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptimeForm.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptimeForm.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: uptime.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

uptime.form = uptimeForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:80
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
export const brokenLinks = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

brokenLinks.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/broken-links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:80
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinks.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return brokenLinks.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:80
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinks.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:80
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinks.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brokenLinks.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:80
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
const brokenLinksForm = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:80
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinksForm.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:80
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinksForm.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brokenLinks.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

brokenLinks.form = brokenLinksForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:103
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
export const lighthouse = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

lighthouse.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/lighthouse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:103
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouse.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return lighthouse.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:103
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouse.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:103
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouse.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lighthouse.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:103
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
const lighthouseForm = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:103
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouseForm.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:103
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouseForm.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lighthouse.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

lighthouse.form = lighthouseForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:126
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
export const sitemap = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

sitemap.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/sitemap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:126
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemap.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return sitemap.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:126
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemap.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:126
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemap.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sitemap.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:126
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
const sitemapForm = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:126
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemapForm.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:126
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemapForm.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sitemap.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

sitemap.form = sitemapForm

const OhdearController = { index, store, show, update, destroy, setup, addUrl, deleteUrl, uptime, brokenLinks, lighthouse, sitemap }

export default OhdearController