import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::recent
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:28
* @route '/api/widgets/tickets/recent'
*/
export const recent = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recent.url(options),
    method: 'get',
})

recent.definition = {
    methods: ["get","head"],
    url: '/api/widgets/tickets/recent',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::recent
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:28
* @route '/api/widgets/tickets/recent'
*/
recent.url = (options?: RouteQueryOptions) => {
    return recent.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::recent
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:28
* @route '/api/widgets/tickets/recent'
*/
recent.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recent.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::recent
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:28
* @route '/api/widgets/tickets/recent'
*/
recent.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recent.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::statistics
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:105
* @route '/api/widgets/tickets/statistics'
*/
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/api/widgets/tickets/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::statistics
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:105
* @route '/api/widgets/tickets/statistics'
*/
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::statistics
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:105
* @route '/api/widgets/tickets/statistics'
*/
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::statistics
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:105
* @route '/api/widgets/tickets/statistics'
*/
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:180
* @route '/api/widgets/tickets/my-tickets'
*/
export const myTickets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

myTickets.definition = {
    methods: ["get","head"],
    url: '/api/widgets/tickets/my-tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:180
* @route '/api/widgets/tickets/my-tickets'
*/
myTickets.url = (options?: RouteQueryOptions) => {
    return myTickets.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:180
* @route '/api/widgets/tickets/my-tickets'
*/
myTickets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myTickets.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController::myTickets
* @see Modules/Ticket/app/Http/Controllers/Api/Widget/TicketWidgetController.php:180
* @route '/api/widgets/tickets/my-tickets'
*/
myTickets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myTickets.url(options),
    method: 'head',
})

const TicketWidgetController = { recent, statistics, myTickets }

export default TicketWidgetController