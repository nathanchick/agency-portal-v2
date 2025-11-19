import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::all
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
const allForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: all.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::all
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
allForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: all.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::all
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
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

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closed
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
const closedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: closed.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closed
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: closed.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closed
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: closed.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

closed.form = closedForm

const view = {
    all: Object.assign(all, all),
    closed: Object.assign(closed, closed),
}

export default view