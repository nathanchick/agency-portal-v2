import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TicketController::myTickets
* @see app/Http/Controllers/TicketController.php:13
* @route '/my-tickets'
*/
export const myTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

myTickets.definition = {
    methods: ["get","head"],
    url: '/my-tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::myTickets
* @see app/Http/Controllers/TicketController.php:13
* @route '/my-tickets'
*/
myTickets.url = (options?: RouteQueryOptions) => {
    return myTickets.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::myTickets
* @see app/Http/Controllers/TicketController.php:13
* @route '/my-tickets'
*/
myTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::myTickets
* @see app/Http/Controllers/TicketController.php:13
* @route '/my-tickets'
*/
myTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myTickets.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TicketController::myTickets
* @see app/Http/Controllers/TicketController.php:13
* @route '/my-tickets'
*/
const myTicketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myTickets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::myTickets
* @see app/Http/Controllers/TicketController.php:13
* @route '/my-tickets'
*/
myTicketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myTickets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::myTickets
* @see app/Http/Controllers/TicketController.php:13
* @route '/my-tickets'
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
* @see \App\Http\Controllers\TicketController::allTickets
* @see app/Http/Controllers/TicketController.php:26
* @route '/all-tickets'
*/
export const allTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTickets.url(options),
    method: 'get',
})

allTickets.definition = {
    methods: ["get","head"],
    url: '/all-tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicketController::allTickets
* @see app/Http/Controllers/TicketController.php:26
* @route '/all-tickets'
*/
allTickets.url = (options?: RouteQueryOptions) => {
    return allTickets.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::allTickets
* @see app/Http/Controllers/TicketController.php:26
* @route '/all-tickets'
*/
allTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTickets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::allTickets
* @see app/Http/Controllers/TicketController.php:26
* @route '/all-tickets'
*/
allTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allTickets.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TicketController::allTickets
* @see app/Http/Controllers/TicketController.php:26
* @route '/all-tickets'
*/
const allTicketsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTickets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::allTickets
* @see app/Http/Controllers/TicketController.php:26
* @route '/all-tickets'
*/
allTicketsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTickets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::allTickets
* @see app/Http/Controllers/TicketController.php:26
* @route '/all-tickets'
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
* @see \App\Http\Controllers\TicketController::create
* @see app/Http/Controllers/TicketController.php:38
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
* @see \App\Http\Controllers\TicketController::create
* @see app/Http/Controllers/TicketController.php:38
* @route '/tickets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::create
* @see app/Http/Controllers/TicketController.php:38
* @route '/tickets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::create
* @see app/Http/Controllers/TicketController.php:38
* @route '/tickets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TicketController::create
* @see app/Http/Controllers/TicketController.php:38
* @route '/tickets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::create
* @see app/Http/Controllers/TicketController.php:38
* @route '/tickets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TicketController::create
* @see app/Http/Controllers/TicketController.php:38
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
* @see \App\Http\Controllers\TicketController::store
* @see app/Http/Controllers/TicketController.php:49
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
* @see \App\Http\Controllers\TicketController::store
* @see app/Http/Controllers/TicketController.php:49
* @route '/tickets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicketController::store
* @see app/Http/Controllers/TicketController.php:49
* @route '/tickets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TicketController::store
* @see app/Http/Controllers/TicketController.php:49
* @route '/tickets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TicketController::store
* @see app/Http/Controllers/TicketController.php:49
* @route '/tickets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const TicketController = { myTickets, allTickets, create, store }

export default TicketController