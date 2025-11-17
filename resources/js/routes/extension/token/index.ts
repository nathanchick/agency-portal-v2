import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Extension\TokenController::create
* @see app/Http/Controllers/Extension/TokenController.php:17
* @route '/extension-token'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/extension-token',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Extension\TokenController::create
* @see app/Http/Controllers/Extension/TokenController.php:17
* @route '/extension-token'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Extension\TokenController::create
* @see app/Http/Controllers/Extension/TokenController.php:17
* @route '/extension-token'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::create
* @see app/Http/Controllers/Extension/TokenController.php:17
* @route '/extension-token'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::create
* @see app/Http/Controllers/Extension/TokenController.php:17
* @route '/extension-token'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::create
* @see app/Http/Controllers/Extension/TokenController.php:17
* @route '/extension-token'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::create
* @see app/Http/Controllers/Extension/TokenController.php:17
* @route '/extension-token'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Extension\TokenController::generate
* @see app/Http/Controllers/Extension/TokenController.php:37
* @route '/extension-token'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/extension-token',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Extension\TokenController::generate
* @see app/Http/Controllers/Extension/TokenController.php:37
* @route '/extension-token'
*/
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Extension\TokenController::generate
* @see app/Http/Controllers/Extension/TokenController.php:37
* @route '/extension-token'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::generate
* @see app/Http/Controllers/Extension/TokenController.php:37
* @route '/extension-token'
*/
const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::generate
* @see app/Http/Controllers/Extension/TokenController.php:37
* @route '/extension-token'
*/
generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

generate.form = generateForm

/**
* @see \App\Http\Controllers\Extension\TokenController::revoke
* @see app/Http/Controllers/Extension/TokenController.php:102
* @route '/extension-token/{token}'
*/
export const revoke = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revoke.url(args, options),
    method: 'delete',
})

revoke.definition = {
    methods: ["delete"],
    url: '/extension-token/{token}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Extension\TokenController::revoke
* @see app/Http/Controllers/Extension/TokenController.php:102
* @route '/extension-token/{token}'
*/
revoke.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    if (Array.isArray(args)) {
        args = {
            token: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        token: args.token,
    }

    return revoke.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Extension\TokenController::revoke
* @see app/Http/Controllers/Extension/TokenController.php:102
* @route '/extension-token/{token}'
*/
revoke.delete = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revoke.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::revoke
* @see app/Http/Controllers/Extension/TokenController.php:102
* @route '/extension-token/{token}'
*/
const revokeForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::revoke
* @see app/Http/Controllers/Extension/TokenController.php:102
* @route '/extension-token/{token}'
*/
revokeForm.delete = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

revoke.form = revokeForm

const token = {
    create: Object.assign(create, create),
    generate: Object.assign(generate, generate),
    revoke: Object.assign(revoke, revoke),
}

export default token