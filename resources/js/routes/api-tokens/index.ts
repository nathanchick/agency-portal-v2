import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::index
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:24
* @route '/api-tokens'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api-tokens',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::index
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:24
* @route '/api-tokens'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::index
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:24
* @route '/api-tokens'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::index
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:24
* @route '/api-tokens'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::create
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:52
* @route '/api-tokens/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/api-tokens/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::create
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:52
* @route '/api-tokens/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::create
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:52
* @route '/api-tokens/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::create
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:52
* @route '/api-tokens/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::store
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:62
* @route '/api-tokens'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api-tokens',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::store
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:62
* @route '/api-tokens'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::store
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:62
* @route '/api-tokens'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::show
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:98
* @route '/api-tokens/{apiToken}'
*/
export const show = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api-tokens/{apiToken}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::show
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:98
* @route '/api-tokens/{apiToken}'
*/
show.url = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { apiToken: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { apiToken: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            apiToken: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        apiToken: typeof args.apiToken === 'object'
        ? args.apiToken.id
        : args.apiToken,
    }

    return show.definition.url
            .replace('{apiToken}', parsedArgs.apiToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::show
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:98
* @route '/api-tokens/{apiToken}'
*/
show.get = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::show
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:98
* @route '/api-tokens/{apiToken}'
*/
show.head = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::edit
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:118
* @route '/api-tokens/{apiToken}/edit'
*/
export const edit = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/api-tokens/{apiToken}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::edit
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:118
* @route '/api-tokens/{apiToken}/edit'
*/
edit.url = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { apiToken: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { apiToken: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            apiToken: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        apiToken: typeof args.apiToken === 'object'
        ? args.apiToken.id
        : args.apiToken,
    }

    return edit.definition.url
            .replace('{apiToken}', parsedArgs.apiToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::edit
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:118
* @route '/api-tokens/{apiToken}/edit'
*/
edit.get = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::edit
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:118
* @route '/api-tokens/{apiToken}/edit'
*/
edit.head = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::update
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:136
* @route '/api-tokens/{apiToken}'
*/
export const update = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api-tokens/{apiToken}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::update
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:136
* @route '/api-tokens/{apiToken}'
*/
update.url = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { apiToken: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { apiToken: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            apiToken: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        apiToken: typeof args.apiToken === 'object'
        ? args.apiToken.id
        : args.apiToken,
    }

    return update.definition.url
            .replace('{apiToken}', parsedArgs.apiToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::update
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:136
* @route '/api-tokens/{apiToken}'
*/
update.put = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::destroy
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:160
* @route '/api-tokens/{apiToken}'
*/
export const destroy = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api-tokens/{apiToken}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::destroy
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:160
* @route '/api-tokens/{apiToken}'
*/
destroy.url = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { apiToken: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { apiToken: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            apiToken: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        apiToken: typeof args.apiToken === 'object'
        ? args.apiToken.id
        : args.apiToken,
    }

    return destroy.definition.url
            .replace('{apiToken}', parsedArgs.apiToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\ApiTokenController::destroy
* @see Modules/Organisation/app/Http/Controllers/ApiTokenController.php:160
* @route '/api-tokens/{apiToken}'
*/
destroy.delete = (args: { apiToken: string | { id: string } } | [apiToken: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const apiTokens = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default apiTokens