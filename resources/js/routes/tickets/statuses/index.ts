import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets/statuses',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
export const update = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/tickets/statuses/{ticketStatus}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
update.url = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticketStatus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticketStatus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticketStatus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticketStatus: typeof args.ticketStatus === 'object'
        ? args.ticketStatus.id
        : args.ticketStatus,
    }

    return update.definition.url
            .replace('{ticketStatus}', parsedArgs.ticketStatus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
update.put = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
const updateForm = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
updateForm.put = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
export const destroy = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tickets/statuses/{ticketStatus}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
destroy.url = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticketStatus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticketStatus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticketStatus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticketStatus: typeof args.ticketStatus === 'object'
        ? args.ticketStatus.id
        : args.ticketStatus,
    }

    return destroy.definition.url
            .replace('{ticketStatus}', parsedArgs.ticketStatus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
destroy.delete = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
const destroyForm = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
destroyForm.delete = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const statuses = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default statuses