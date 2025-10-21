import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:14
* @route '/tickets'
*/
export const myTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

myTickets.definition = {
    methods: ["get","head"],
    url: '/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:14
* @route '/tickets'
*/
myTickets.url = (options?: RouteQueryOptions) => {
    return myTickets.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:14
* @route '/tickets'
*/
myTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:14
* @route '/tickets'
*/
myTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myTickets.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:14
* @route '/tickets'
*/
const myTicketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:14
* @route '/tickets'
*/
myTicketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::myTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:14
* @route '/tickets'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
export const allTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTickets.url(options),
    method: 'get',
})

allTickets.definition = {
    methods: ["get","head"],
    url: '/tickets/view/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
allTickets.url = (options?: RouteQueryOptions) => {
    return allTickets.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
allTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
allTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allTickets.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
const allTicketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
*/
allTicketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::allTickets
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:27
* @route '/tickets/view/all'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:39
* @route '/tickets/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:39
* @route '/tickets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:39
* @route '/tickets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:39
* @route '/tickets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:39
* @route '/tickets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:39
* @route '/tickets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:39
* @route '/tickets/create'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:50
* @route '/tickets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:50
* @route '/tickets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:50
* @route '/tickets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:50
* @route '/tickets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:50
* @route '/tickets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const TicketController = { myTickets, allTickets, create, store }

export default TicketController