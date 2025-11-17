import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/webhooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::index
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:26
* @route '/webhooks'
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
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/webhooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::store
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:143
* @route '/webhooks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
export const edit = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
edit.url = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
edit.get = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
edit.head = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
const editForm = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
editForm.get = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::edit
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:177
* @route '/webhooks/{webhook}/edit'
*/
editForm.head = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
export const update = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/webhooks/{webhook}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
update.url = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @route '/webhooks/{webhook}'
*/
update.put = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::update
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
const updateForm = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:196
* @route '/webhooks/{webhook}'
*/
updateForm.put = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
export const destroy = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/webhooks/{webhook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
destroy.url = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @route '/webhooks/{webhook}'
*/
destroy.delete = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::destroy
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
const destroyForm = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:224
* @route '/webhooks/{webhook}'
*/
destroyForm.delete = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
export const toggle = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
toggle.url = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
toggle.post = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
const toggleForm = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::toggle
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:241
* @route '/webhooks/{webhook}/toggle'
*/
toggleForm.post = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, options),
    method: 'post',
})

toggle.form = toggleForm

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
export const regenerateSecret = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
regenerateSecret.url = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
regenerateSecret.post = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateSecret.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
const regenerateSecretForm = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateSecret.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Webhook\Http\Controllers\WebhookController::regenerateSecret
* @see Modules/Webhook/app/Http/Controllers/WebhookController.php:258
* @route '/webhooks/{webhook}/regenerate-secret'
*/
regenerateSecretForm.post = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateSecret.url(args, options),
    method: 'post',
})

regenerateSecret.form = regenerateSecretForm

const webhooks = {
    index: Object.assign(index, index),
    jobs: Object.assign(jobs, jobs),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggle: Object.assign(toggle, toggle),
    regenerateSecret: Object.assign(regenerateSecret, regenerateSecret),
}

export default webhooks