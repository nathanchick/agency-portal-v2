import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerate
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
export const regenerate = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

regenerate.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/summary/regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerate
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
regenerate.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return regenerate.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerate
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
regenerate.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

const summary = {
    regenerate: Object.assign(regenerate, regenerate),
}

export default summary