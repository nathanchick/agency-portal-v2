import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets/labels',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
export const update = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/tickets/labels/{label}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
update.url = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { label: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { label: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            label: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        label: typeof args.label === 'object'
        ? args.label.id
        : args.label,
    }

    return update.definition.url
            .replace('{label}', parsedArgs.label.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
update.put = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
export const destroy = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tickets/labels/{label}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
destroy.url = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { label: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { label: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            label: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        label: typeof args.label === 'object'
        ? args.label.id
        : args.label,
    }

    return destroy.definition.url
            .replace('{label}', parsedArgs.label.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
destroy.delete = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const labels = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default labels