import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/webhooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/webhooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::show
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:0
* @route '/api/v1/webhooks/{webhook}'
*/
export const show = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/webhooks/{webhook}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::show
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:0
* @route '/api/v1/webhooks/{webhook}'
*/
show.url = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

    if (Array.isArray(args)) {
        args = {
            webhook: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        webhook: args.webhook,
    }

    return show.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::show
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:0
* @route '/api/v1/webhooks/{webhook}'
*/
show.get = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::show
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:0
* @route '/api/v1/webhooks/{webhook}'
*/
show.head = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
export const update = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/webhooks/{webhook}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
update.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { webhook: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            webhook: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        webhook: typeof args.webhook === 'object'
        ? args.webhook.id
        : args.webhook,
    }

    return update.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
update.put = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
update.patch = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
export const destroy = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/webhooks/{webhook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
destroy.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { webhook: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            webhook: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        webhook: typeof args.webhook === 'object'
        ? args.webhook.id
        : args.webhook,
    }

    return destroy.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
destroy.delete = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const webhook = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default webhook