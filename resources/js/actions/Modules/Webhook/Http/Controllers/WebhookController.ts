import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
const indexb33467ff09be94079353354295005584 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb33467ff09be94079353354295005584.url(options),
    method: 'get',
})

indexb33467ff09be94079353354295005584.definition = {
    methods: ["get","head"],
    url: '/api/v1/webhooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
indexb33467ff09be94079353354295005584.url = (options?: RouteQueryOptions) => {
    return indexb33467ff09be94079353354295005584.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
indexb33467ff09be94079353354295005584.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb33467ff09be94079353354295005584.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
indexb33467ff09be94079353354295005584.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb33467ff09be94079353354295005584.url(options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
const indexb33467ff09be94079353354295005584Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb33467ff09be94079353354295005584.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
indexb33467ff09be94079353354295005584Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb33467ff09be94079353354295005584.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/api/v1/webhooks'
*/
indexb33467ff09be94079353354295005584Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb33467ff09be94079353354295005584.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexb33467ff09be94079353354295005584.form = indexb33467ff09be94079353354295005584Form
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
const index6c1f8bafb5d7b389c8096f25946eea18 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'get',
})

index6c1f8bafb5d7b389c8096f25946eea18.definition = {
    methods: ["get","head"],
    url: '/webhooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index6c1f8bafb5d7b389c8096f25946eea18.url = (options?: RouteQueryOptions) => {
    return index6c1f8bafb5d7b389c8096f25946eea18.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index6c1f8bafb5d7b389c8096f25946eea18.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index6c1f8bafb5d7b389c8096f25946eea18.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
const index6c1f8bafb5d7b389c8096f25946eea18Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index6c1f8bafb5d7b389c8096f25946eea18Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index6c1f8bafb5d7b389c8096f25946eea18Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6c1f8bafb5d7b389c8096f25946eea18.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index6c1f8bafb5d7b389c8096f25946eea18.form = index6c1f8bafb5d7b389c8096f25946eea18Form

export const index = {
    '/api/v1/webhooks': indexb33467ff09be94079353354295005584,
    '/webhooks': index6c1f8bafb5d7b389c8096f25946eea18,
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
const storeb33467ff09be94079353354295005584 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb33467ff09be94079353354295005584.url(options),
    method: 'post',
})

storeb33467ff09be94079353354295005584.definition = {
    methods: ["post"],
    url: '/api/v1/webhooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
storeb33467ff09be94079353354295005584.url = (options?: RouteQueryOptions) => {
    return storeb33467ff09be94079353354295005584.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
storeb33467ff09be94079353354295005584.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb33467ff09be94079353354295005584.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
const storeb33467ff09be94079353354295005584Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb33467ff09be94079353354295005584.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/api/v1/webhooks'
*/
storeb33467ff09be94079353354295005584Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb33467ff09be94079353354295005584.url(options),
    method: 'post',
})

storeb33467ff09be94079353354295005584.form = storeb33467ff09be94079353354295005584Form
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
const store6c1f8bafb5d7b389c8096f25946eea18 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'post',
})

store6c1f8bafb5d7b389c8096f25946eea18.definition = {
    methods: ["post"],
    url: '/webhooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
store6c1f8bafb5d7b389c8096f25946eea18.url = (options?: RouteQueryOptions) => {
    return store6c1f8bafb5d7b389c8096f25946eea18.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
store6c1f8bafb5d7b389c8096f25946eea18.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
const store6c1f8bafb5d7b389c8096f25946eea18Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
store6c1f8bafb5d7b389c8096f25946eea18Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store6c1f8bafb5d7b389c8096f25946eea18.url(options),
    method: 'post',
})

store6c1f8bafb5d7b389c8096f25946eea18.form = store6c1f8bafb5d7b389c8096f25946eea18Form

export const store = {
    '/api/v1/webhooks': storeb33467ff09be94079353354295005584,
    '/webhooks': store6c1f8bafb5d7b389c8096f25946eea18,
}

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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
const updatec71f7520731273c611d696670619251e = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatec71f7520731273c611d696670619251e.url(args, options),
    method: 'put',
})

updatec71f7520731273c611d696670619251e.definition = {
    methods: ["put","patch"],
    url: '/api/v1/webhooks/{webhook}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
updatec71f7520731273c611d696670619251e.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return updatec71f7520731273c611d696670619251e.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
updatec71f7520731273c611d696670619251e.put = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatec71f7520731273c611d696670619251e.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
updatec71f7520731273c611d696670619251e.patch = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatec71f7520731273c611d696670619251e.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
const updatec71f7520731273c611d696670619251eForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatec71f7520731273c611d696670619251e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
updatec71f7520731273c611d696670619251eForm.put = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatec71f7520731273c611d696670619251e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/api/v1/webhooks/{webhook}'
*/
updatec71f7520731273c611d696670619251eForm.patch = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatec71f7520731273c611d696670619251e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatec71f7520731273c611d696670619251e.form = updatec71f7520731273c611d696670619251eForm
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
const update3fca6bc875beaa071e7696a1b846c42b = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3fca6bc875beaa071e7696a1b846c42b.url(args, options),
    method: 'put',
})

update3fca6bc875beaa071e7696a1b846c42b.definition = {
    methods: ["put"],
    url: '/webhooks/{webhook}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
update3fca6bc875beaa071e7696a1b846c42b.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update3fca6bc875beaa071e7696a1b846c42b.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
update3fca6bc875beaa071e7696a1b846c42b.put = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3fca6bc875beaa071e7696a1b846c42b.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
const update3fca6bc875beaa071e7696a1b846c42bForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update3fca6bc875beaa071e7696a1b846c42b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
update3fca6bc875beaa071e7696a1b846c42bForm.put = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update3fca6bc875beaa071e7696a1b846c42b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update3fca6bc875beaa071e7696a1b846c42b.form = update3fca6bc875beaa071e7696a1b846c42bForm

export const update = {
    '/api/v1/webhooks/{webhook}': updatec71f7520731273c611d696670619251e,
    '/webhooks/{webhook}': update3fca6bc875beaa071e7696a1b846c42b,
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
const destroyc71f7520731273c611d696670619251e = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyc71f7520731273c611d696670619251e.url(args, options),
    method: 'delete',
})

destroyc71f7520731273c611d696670619251e.definition = {
    methods: ["delete"],
    url: '/api/v1/webhooks/{webhook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
destroyc71f7520731273c611d696670619251e.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroyc71f7520731273c611d696670619251e.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
destroyc71f7520731273c611d696670619251e.delete = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyc71f7520731273c611d696670619251e.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
const destroyc71f7520731273c611d696670619251eForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyc71f7520731273c611d696670619251e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/api/v1/webhooks/{webhook}'
*/
destroyc71f7520731273c611d696670619251eForm.delete = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyc71f7520731273c611d696670619251e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyc71f7520731273c611d696670619251e.form = destroyc71f7520731273c611d696670619251eForm
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
const destroy3fca6bc875beaa071e7696a1b846c42b = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3fca6bc875beaa071e7696a1b846c42b.url(args, options),
    method: 'delete',
})

destroy3fca6bc875beaa071e7696a1b846c42b.definition = {
    methods: ["delete"],
    url: '/webhooks/{webhook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
destroy3fca6bc875beaa071e7696a1b846c42b.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy3fca6bc875beaa071e7696a1b846c42b.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
destroy3fca6bc875beaa071e7696a1b846c42b.delete = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3fca6bc875beaa071e7696a1b846c42b.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
const destroy3fca6bc875beaa071e7696a1b846c42bForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy3fca6bc875beaa071e7696a1b846c42b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
destroy3fca6bc875beaa071e7696a1b846c42bForm.delete = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy3fca6bc875beaa071e7696a1b846c42b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy3fca6bc875beaa071e7696a1b846c42b.form = destroy3fca6bc875beaa071e7696a1b846c42bForm

export const destroy = {
    '/api/v1/webhooks/{webhook}': destroyc71f7520731273c611d696670619251e,
    '/webhooks/{webhook}': destroy3fca6bc875beaa071e7696a1b846c42b,
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::jobs
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:61
* @route '/webhooks/jobs'
*/
export const jobs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jobs.url(options),
    method: 'get',
})

jobs.definition = {
    methods: ["get","head"],
    url: '/webhooks/jobs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::jobs
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:61
* @route '/webhooks/jobs'
*/
jobs.url = (options?: RouteQueryOptions) => {
    return jobs.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::jobs
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:61
* @route '/webhooks/jobs'
*/
jobs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jobs.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::jobs
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:61
* @route '/webhooks/jobs'
*/
jobs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: jobs.url(options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::jobs
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:61
* @route '/webhooks/jobs'
*/
const jobsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jobs.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::jobs
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:61
* @route '/webhooks/jobs'
*/
jobsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jobs.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::jobs
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:61
* @route '/webhooks/jobs'
*/
jobsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jobs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

jobs.form = jobsForm

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::create
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:132
* @route '/webhooks/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/webhooks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::create
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:132
* @route '/webhooks/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::create
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:132
* @route '/webhooks/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::create
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:132
* @route '/webhooks/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::create
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:132
* @route '/webhooks/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::create
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:132
* @route '/webhooks/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::create
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:132
* @route '/webhooks/create'
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
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
export const edit = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/webhooks/{webhook}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
edit.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
edit.get = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
edit.head = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
const editForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
editForm.get = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
editForm.head = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
export const toggle = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/webhooks/{webhook}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
toggle.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return toggle.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
toggle.post = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
const toggleForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
toggleForm.post = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, options),
    method: 'post',
})

toggle.form = toggleForm

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
export const regenerateSecret = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateSecret.url(args, options),
    method: 'post',
})

regenerateSecret.definition = {
    methods: ["post"],
    url: '/webhooks/{webhook}/regenerate-secret',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
regenerateSecret.url = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return regenerateSecret.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
regenerateSecret.post = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateSecret.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
const regenerateSecretForm = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateSecret.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
regenerateSecretForm.post = (args: { webhook: string | { id: string } } | [webhook: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateSecret.url(args, options),
    method: 'post',
})

regenerateSecret.form = regenerateSecretForm

const WebhookController = { index, store, show, update, destroy, jobs, create, edit, toggle, regenerateSecret }

export default WebhookController