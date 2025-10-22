import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:23
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:23
* @route '/api/v1/webhooks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:23
* @route '/api/v1/webhooks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:23
* @route '/api/v1/webhooks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:23
* @route '/api/v1/webhooks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:23
* @route '/api/v1/webhooks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:23
* @route '/api/v1/webhooks'
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
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:140
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:140
* @route '/api/v1/webhooks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:140
* @route '/api/v1/webhooks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:140
* @route '/api/v1/webhooks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:140
* @route '/api/v1/webhooks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \Modules\Webhook\Http\Controllers\WebhookController::show
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:0
* @route '/api/v1/webhooks/{webhook}'
*/
const showForm = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::show
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:0
* @route '/api/v1/webhooks/{webhook}'
*/
showForm.get = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::show
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:0
* @route '/api/v1/webhooks/{webhook}'
*/
showForm.head = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:193
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:193
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:193
* @route '/api/v1/webhooks/{webhook}'
*/
update.put = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:193
* @route '/api/v1/webhooks/{webhook}'
*/
update.patch = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:193
* @route '/api/v1/webhooks/{webhook}'
*/
const updateForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:193
* @route '/api/v1/webhooks/{webhook}'
*/
updateForm.put = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:193
* @route '/api/v1/webhooks/{webhook}'
*/
updateForm.patch = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:221
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:221
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:221
* @route '/api/v1/webhooks/{webhook}'
*/
destroy.delete = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:221
* @route '/api/v1/webhooks/{webhook}'
*/
const destroyForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:221
* @route '/api/v1/webhooks/{webhook}'
*/
destroyForm.delete = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const webhook = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default webhook