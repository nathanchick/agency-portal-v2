import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::connect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:46
* @route '/xero/oauth/connect'
*/
const connectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: connect.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::connect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:46
* @route '/xero/oauth/connect'
*/
connectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: connect.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::connect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:46
* @route '/xero/oauth/connect'
*/
connectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: connect.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

connect.form = connectForm

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
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::callback
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:85
* @route '/xero/oauth/callback'
*/
const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callback.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::callback
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:85
* @route '/xero/oauth/callback'
*/
callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callback.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::callback
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:85
* @route '/xero/oauth/callback'
*/
callbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callback.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

callback.form = callbackForm

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
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::disconnect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:182
* @route '/xero/oauth/disconnect'
*/
const disconnectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disconnect.url(options),
    method: 'post',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::disconnect
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:182
* @route '/xero/oauth/disconnect'
*/
disconnectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disconnect.url(options),
    method: 'post',
})

disconnect.form = disconnectForm

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

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::status
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:208
* @route '/xero/oauth/status'
*/
const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::status
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:208
* @route '/xero/oauth/status'
*/
statusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroOAuthController::status
* @see Modules/Xero/app/Http/Controllers/XeroOAuthController.php:208
* @route '/xero/oauth/status'
*/
statusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

status.form = statusForm

const oauth = {
    connect: Object.assign(connect, connect),
    callback: Object.assign(callback, callback),
    disconnect: Object.assign(disconnect, disconnect),
    status: Object.assign(status, status),
}

export default oauth