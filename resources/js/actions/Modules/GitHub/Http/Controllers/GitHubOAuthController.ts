import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::connect
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:38
* @route '/github/oauth/connect'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/github/oauth/connect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::connect
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:38
* @route '/github/oauth/connect'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::connect
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:38
* @route '/github/oauth/connect'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::connect
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:38
* @route '/github/oauth/connect'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::callback
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:75
* @route '/github/oauth/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/github/oauth/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::callback
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:75
* @route '/github/oauth/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::callback
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:75
* @route '/github/oauth/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::callback
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:75
* @route '/github/oauth/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::disconnect
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:141
* @route '/github/oauth/disconnect'
*/
export const disconnect = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnect.url(options),
    method: 'delete',
})

disconnect.definition = {
    methods: ["delete"],
    url: '/github/oauth/disconnect',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::disconnect
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:141
* @route '/github/oauth/disconnect'
*/
disconnect.url = (options?: RouteQueryOptions) => {
    return disconnect.definition.url + queryParams(options)
}

/**
* @see \Modules\GitHub\Http\Controllers\GitHubOAuthController::disconnect
* @see Modules/GitHub/app/Http/Controllers/GitHubOAuthController.php:141
* @route '/github/oauth/disconnect'
*/
disconnect.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnect.url(options),
    method: 'delete',
})

const GitHubOAuthController = { connect, callback, disconnect }

export default GitHubOAuthController