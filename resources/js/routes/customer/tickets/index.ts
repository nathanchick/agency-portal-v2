import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import view381131 from './view'
/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::view
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
export const view = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/customer/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::view
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
view.url = (options?: RouteQueryOptions) => {
    return view.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::view
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
view.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::view
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
view.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::view
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
const viewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::view
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
viewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::view
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:15
* @route '/customer/tickets'
*/
viewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

view.form = viewForm

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
export const show = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
show.url = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
show.get = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
show.head = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
const showForm = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
showForm.get = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Customer\CustomerTicketController::show
* @see Modules/Ticket/app/Http/Controllers/Customer/CustomerTicketController.php:254
* @route '/customer/tickets/{ticket}'
*/
showForm.head = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const tickets = {
    view: Object.assign(view, view381131),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
}

export default tickets