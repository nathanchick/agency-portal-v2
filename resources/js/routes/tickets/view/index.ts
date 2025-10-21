import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::all
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
export const all = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

all.definition = {
    methods: ["get","head"],
    url: '/tickets/view/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::all
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
all.url = (options?: RouteQueryOptions) => {
    return all.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::all
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
all.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::all
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
all.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: all.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::all
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
const allForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: all.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::all
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
allForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: all.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::all
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
allForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: all.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

all.form = allForm

const view = {
    all: Object.assign(all, all),
}

export default view