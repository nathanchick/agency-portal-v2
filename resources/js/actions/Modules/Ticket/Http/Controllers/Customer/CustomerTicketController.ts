import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
export const myTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

myTickets.definition = {
    methods: ["get","head"],
    url: '/customer/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
myTickets.url = (options?: RouteQueryOptions) => {
    return myTickets.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
myTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
myTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myTickets.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
const myTicketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
myTicketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
myTicketsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myTickets.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myTickets.form = myTicketsForm

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
export const allTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTickets.url(options),
    method: 'get',
})

allTickets.definition = {
    methods: ["get","head"],
    url: '/customer/tickets/view/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
allTickets.url = (options?: RouteQueryOptions) => {
    return allTickets.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
allTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
allTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allTickets.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
const allTicketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
allTicketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:179
* @route '/customer/tickets/view/all'
*/
allTicketsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTickets.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allTickets.form = allTicketsForm

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closedTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
export const closedTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: closedTickets.url(options),
    method: 'get',
})

closedTickets.definition = {
    methods: ["get","head"],
    url: '/customer/tickets/view/closed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closedTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closedTickets.url = (options?: RouteQueryOptions) => {
    return closedTickets.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closedTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closedTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: closedTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closedTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closedTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: closedTickets.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closedTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
const closedTicketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: closedTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closedTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closedTicketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: closedTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::closedTickets
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:97
* @route '/customer/tickets/view/closed'
*/
closedTicketsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: closedTickets.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

closedTickets.form = closedTicketsForm

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::create
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:283
* @route '/customer/tickets/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/customer/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::create
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:283
* @route '/customer/tickets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::create
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:283
* @route '/customer/tickets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::create
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:283
* @route '/customer/tickets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::create
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:283
* @route '/customer/tickets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::create
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:283
* @route '/customer/tickets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::create
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:283
* @route '/customer/tickets/create'
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
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::store
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:321
* @route '/customer/tickets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customer/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::store
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:321
* @route '/customer/tickets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::store
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:321
* @route '/customer/tickets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::store
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:321
* @route '/customer/tickets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::store
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:321
* @route '/customer/tickets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
export const show = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/customer/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
show.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
show.get = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
show.head = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
const showForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
showForm.get = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
showForm.head = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const CustomerTicketController = { myTickets, allTickets, closedTickets, create, store, show }

export default CustomerTicketController