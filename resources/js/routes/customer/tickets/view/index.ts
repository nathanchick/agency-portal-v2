import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::all
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
export const all = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

all.definition = {
    methods: ["get","head"],
    url: '/customer/tickets/view/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::all
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
all.url = (options?: RouteQueryOptions) => {
    return all.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::all
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
all.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::all
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
all.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: all.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closed
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
export const closed = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: closed.url(options),
    method: 'get',
})

closed.definition = {
    methods: ["get","head"],
    url: '/customer/tickets/view/closed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closed
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closed.url = (options?: RouteQueryOptions) => {
    return closed.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closed
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closed.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: closed.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closed
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closed.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: closed.url(options),
    method: 'head',
})

const view = {
    all: Object.assign(all, all),
    closed: Object.assign(closed, closed),
}

export default view