import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:26
* @route '/api/organisations/{organisation}/tickets'
*/
export const index = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:26
* @route '/api/organisations/{organisation}/tickets'
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
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:26
* @route '/api/organisations/{organisation}/tickets'
*/
index.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:26
* @route '/api/organisations/{organisation}/tickets'
*/
index.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:26
* @route '/api/organisations/{organisation}/tickets'
*/
const indexForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:26
* @route '/api/organisations/{organisation}/tickets'
*/
indexForm.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:26
* @route '/api/organisations/{organisation}/tickets'
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
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:48
* @route '/api/organisations/{organisation}/tickets'
*/
export const store = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/organisations/{organisation}/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:48
* @route '/api/organisations/{organisation}/tickets'
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
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:48
* @route '/api/organisations/{organisation}/tickets'
*/
store.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:48
* @route '/api/organisations/{organisation}/tickets'
*/
const storeForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:48
* @route '/api/organisations/{organisation}/tickets'
*/
storeForm.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:82
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
export const show = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:82
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
show.url = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            ticket: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        ticket: args.ticket,
    }

    return show.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:82
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
show.get = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:82
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
show.head = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:82
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
const showForm = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:82
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
showForm.get = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:82
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
showForm.head = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:104
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
export const update = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/organisations/{organisation}/tickets/{ticket}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:104
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
update.url = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            ticket: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        ticket: args.ticket,
    }

    return update.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:104
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
update.put = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:104
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
update.patch = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:104
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
const updateForm = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:104
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
updateForm.put = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:104
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
updateForm.patch = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:138
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
export const destroy = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/organisations/{organisation}/tickets/{ticket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:138
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
destroy.url = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            ticket: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        ticket: args.ticket,
    }

    return destroy.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:138
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
destroy.delete = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:138
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
const destroyForm = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/Api/TicketController.php:138
* @route '/api/organisations/{organisation}/tickets/{ticket}'
*/
destroyForm.delete = (args: { organisation: string | number, ticket: string | number } | [organisation: string | number, ticket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TicketController = { index, store, show, update, destroy }

export default TicketController