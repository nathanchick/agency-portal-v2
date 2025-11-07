import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/api/v1/websites'
*/
const index87030a6d51e278e383690f38c04b0670 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'get',
})

index87030a6d51e278e383690f38c04b0670.definition = {
    methods: ["get","head"],
    url: '/api/v1/websites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670.url = (options?: RouteQueryOptions) => {
    return index87030a6d51e278e383690f38c04b0670.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/api/v1/websites'
*/
const index87030a6d51e278e383690f38c04b0670Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index87030a6d51e278e383690f38c04b0670.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index87030a6d51e278e383690f38c04b0670.form = index87030a6d51e278e383690f38c04b0670Form
/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/websites'
*/
const index0d6d11c6003bae51aabe78809ed722ab = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'get',
})

index0d6d11c6003bae51aabe78809ed722ab.definition = {
    methods: ["get","head"],
    url: '/websites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722ab.url = (options?: RouteQueryOptions) => {
    return index0d6d11c6003bae51aabe78809ed722ab.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722ab.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722ab.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/websites'
*/
const index0d6d11c6003bae51aabe78809ed722abForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722abForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:18
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722abForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0d6d11c6003bae51aabe78809ed722ab.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index0d6d11c6003bae51aabe78809ed722ab.form = index0d6d11c6003bae51aabe78809ed722abForm

export const index = {
    '/api/v1/websites': index87030a6d51e278e383690f38c04b0670,
    '/websites': index0d6d11c6003bae51aabe78809ed722ab,
}

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
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
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
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
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
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
update.put = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
update.patch = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
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
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
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
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
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

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:42
* @route '/websites/{id}/performance'
*/
export const performance = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})

performance.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:42
* @route '/websites/{id}/performance'
*/
performance.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return performance.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:42
* @route '/websites/{id}/performance'
*/
performance.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:42
* @route '/websites/{id}/performance'
*/
performance.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performance.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:42
* @route '/websites/{id}/performance'
*/
const performanceForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: performance.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:42
* @route '/websites/{id}/performance'
*/
performanceForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: performance.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:42
* @route '/websites/{id}/performance'
*/
performanceForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: performance.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

performance.form = performanceForm

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:61
* @route '/websites/{id}/security'
*/
export const security = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: security.url(args, options),
    method: 'get',
})

security.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/security',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:61
* @route '/websites/{id}/security'
*/
security.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return security.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:61
* @route '/websites/{id}/security'
*/
security.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: security.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:61
* @route '/websites/{id}/security'
*/
security.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: security.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:61
* @route '/websites/{id}/security'
*/
const securityForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: security.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:61
* @route '/websites/{id}/security'
*/
securityForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: security.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:61
* @route '/websites/{id}/security'
*/
securityForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: security.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

security.form = securityForm

const WebsiteController = { index, store, show, update, destroy, performance, security }

export default WebsiteController