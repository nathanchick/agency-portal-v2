import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\WebsiteController::index
* @see app/Http/Controllers/Api/WebsiteController.php:27
* @route '/api/organisations/{organisation}/websites'
*/
export const index = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/websites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WebsiteController::index
* @see app/Http/Controllers/Api/WebsiteController.php:27
* @route '/api/organisations/{organisation}/websites'
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
* @see \App\Http\Controllers\Api\WebsiteController::index
* @see app/Http/Controllers/Api/WebsiteController.php:27
* @route '/api/organisations/{organisation}/websites'
*/
index.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::index
* @see app/Http/Controllers/Api/WebsiteController.php:27
* @route '/api/organisations/{organisation}/websites'
*/
index.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::index
* @see app/Http/Controllers/Api/WebsiteController.php:27
* @route '/api/organisations/{organisation}/websites'
*/
const indexForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::index
* @see app/Http/Controllers/Api/WebsiteController.php:27
* @route '/api/organisations/{organisation}/websites'
*/
indexForm.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::index
* @see app/Http/Controllers/Api/WebsiteController.php:27
* @route '/api/organisations/{organisation}/websites'
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
* @see \App\Http\Controllers\Api\WebsiteController::store
* @see app/Http/Controllers/Api/WebsiteController.php:49
* @route '/api/organisations/{organisation}/websites'
*/
export const store = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/organisations/{organisation}/websites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WebsiteController::store
* @see app/Http/Controllers/Api/WebsiteController.php:49
* @route '/api/organisations/{organisation}/websites'
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
* @see \App\Http\Controllers\Api\WebsiteController::store
* @see app/Http/Controllers/Api/WebsiteController.php:49
* @route '/api/organisations/{organisation}/websites'
*/
store.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::store
* @see app/Http/Controllers/Api/WebsiteController.php:49
* @route '/api/organisations/{organisation}/websites'
*/
const storeForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::store
* @see app/Http/Controllers/Api/WebsiteController.php:49
* @route '/api/organisations/{organisation}/websites'
*/
storeForm.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\WebsiteController::show
* @see app/Http/Controllers/Api/WebsiteController.php:88
* @route '/api/organisations/{organisation}/websites/{website}'
*/
export const show = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/websites/{website}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WebsiteController::show
* @see app/Http/Controllers/Api/WebsiteController.php:88
* @route '/api/organisations/{organisation}/websites/{website}'
*/
show.url = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            website: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        website: args.website,
    }

    return show.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WebsiteController::show
* @see app/Http/Controllers/Api/WebsiteController.php:88
* @route '/api/organisations/{organisation}/websites/{website}'
*/
show.get = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::show
* @see app/Http/Controllers/Api/WebsiteController.php:88
* @route '/api/organisations/{organisation}/websites/{website}'
*/
show.head = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::show
* @see app/Http/Controllers/Api/WebsiteController.php:88
* @route '/api/organisations/{organisation}/websites/{website}'
*/
const showForm = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::show
* @see app/Http/Controllers/Api/WebsiteController.php:88
* @route '/api/organisations/{organisation}/websites/{website}'
*/
showForm.get = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::show
* @see app/Http/Controllers/Api/WebsiteController.php:88
* @route '/api/organisations/{organisation}/websites/{website}'
*/
showForm.head = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\WebsiteController::update
* @see app/Http/Controllers/Api/WebsiteController.php:110
* @route '/api/organisations/{organisation}/websites/{website}'
*/
export const update = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/organisations/{organisation}/websites/{website}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\WebsiteController::update
* @see app/Http/Controllers/Api/WebsiteController.php:110
* @route '/api/organisations/{organisation}/websites/{website}'
*/
update.url = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            website: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        website: args.website,
    }

    return update.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WebsiteController::update
* @see app/Http/Controllers/Api/WebsiteController.php:110
* @route '/api/organisations/{organisation}/websites/{website}'
*/
update.put = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::update
* @see app/Http/Controllers/Api/WebsiteController.php:110
* @route '/api/organisations/{organisation}/websites/{website}'
*/
update.patch = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::update
* @see app/Http/Controllers/Api/WebsiteController.php:110
* @route '/api/organisations/{organisation}/websites/{website}'
*/
const updateForm = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::update
* @see app/Http/Controllers/Api/WebsiteController.php:110
* @route '/api/organisations/{organisation}/websites/{website}'
*/
updateForm.put = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::update
* @see app/Http/Controllers/Api/WebsiteController.php:110
* @route '/api/organisations/{organisation}/websites/{website}'
*/
updateForm.patch = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\WebsiteController::destroy
* @see app/Http/Controllers/Api/WebsiteController.php:155
* @route '/api/organisations/{organisation}/websites/{website}'
*/
export const destroy = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/organisations/{organisation}/websites/{website}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\WebsiteController::destroy
* @see app/Http/Controllers/Api/WebsiteController.php:155
* @route '/api/organisations/{organisation}/websites/{website}'
*/
destroy.url = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            website: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        website: args.website,
    }

    return destroy.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WebsiteController::destroy
* @see app/Http/Controllers/Api/WebsiteController.php:155
* @route '/api/organisations/{organisation}/websites/{website}'
*/
destroy.delete = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::destroy
* @see app/Http/Controllers/Api/WebsiteController.php:155
* @route '/api/organisations/{organisation}/websites/{website}'
*/
const destroyForm = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WebsiteController::destroy
* @see app/Http/Controllers/Api/WebsiteController.php:155
* @route '/api/organisations/{organisation}/websites/{website}'
*/
destroyForm.delete = (args: { organisation: string | number, website: string | number } | [organisation: string | number, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const WebsiteController = { index, store, show, update, destroy }

export default WebsiteController