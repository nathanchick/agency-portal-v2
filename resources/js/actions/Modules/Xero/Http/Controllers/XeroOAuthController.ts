import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::connect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:46
* @route '/xero/oauth/connect'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/xero/oauth/connect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::connect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:46
* @route '/xero/oauth/connect'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::connect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:46
* @route '/xero/oauth/connect'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::connect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:46
* @route '/xero/oauth/connect'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::callback
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:85
* @route '/xero/oauth/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/xero/oauth/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::callback
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:85
* @route '/xero/oauth/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::callback
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:85
* @route '/xero/oauth/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::callback
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:85
* @route '/xero/oauth/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::disconnect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:182
* @route '/xero/oauth/disconnect'
*/
export const disconnect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disconnect.url(options),
    method: 'post',
})

disconnect.definition = {
    methods: ["post"],
    url: '/xero/oauth/disconnect',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::disconnect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:182
* @route '/xero/oauth/disconnect'
*/
disconnect.url = (options?: RouteQueryOptions) => {
    return disconnect.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::disconnect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:182
* @route '/xero/oauth/disconnect'
*/
disconnect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disconnect.url(options),
    method: 'post',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::status
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:208
* @route '/xero/oauth/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/xero/oauth/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::status
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:208
* @route '/xero/oauth/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::status
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:208
* @route '/xero/oauth/status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::status
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:208
* @route '/xero/oauth/status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

const XeroOAuthController = { connect, callback, disconnect, status }

export default XeroOAuthController