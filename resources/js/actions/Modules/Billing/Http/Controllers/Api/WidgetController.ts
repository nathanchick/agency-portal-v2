import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overview
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:31
* @route '/api/widgets/billing/overview'
*/
export const overview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.definition = {
    methods: ["get","head"],
    url: '/api/widgets/billing/overview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overview
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:31
* @route '/api/widgets/billing/overview'
*/
overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overview
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:31
* @route '/api/widgets/billing/overview'
*/
overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overview
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:31
* @route '/api/widgets/billing/overview'
*/
overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::outstanding
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widgets/billing/outstanding'
*/
export const outstanding = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: outstanding.url(options),
    method: 'get',
})

outstanding.definition = {
    methods: ["get","head"],
    url: '/api/widgets/billing/outstanding',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::outstanding
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widgets/billing/outstanding'
*/
outstanding.url = (options?: RouteQueryOptions) => {
    return outstanding.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::outstanding
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widgets/billing/outstanding'
*/
outstanding.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: outstanding.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::outstanding
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widgets/billing/outstanding'
*/
outstanding.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: outstanding.url(options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overdue
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:162
* @route '/api/widgets/billing/overdue'
*/
export const overdue = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overdue.url(options),
    method: 'get',
})

overdue.definition = {
    methods: ["get","head"],
    url: '/api/widgets/billing/overdue',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overdue
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:162
* @route '/api/widgets/billing/overdue'
*/
overdue.url = (options?: RouteQueryOptions) => {
    return overdue.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overdue
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:162
* @route '/api/widgets/billing/overdue'
*/
overdue.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overdue.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::overdue
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:162
* @route '/api/widgets/billing/overdue'
*/
overdue.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overdue.url(options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::myBilling
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:230
* @route '/api/widgets/billing/my-billing'
*/
export const myBilling = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myBilling.url(options),
    method: 'get',
})

myBilling.definition = {
    methods: ["get","head"],
    url: '/api/widgets/billing/my-billing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::myBilling
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:230
* @route '/api/widgets/billing/my-billing'
*/
myBilling.url = (options?: RouteQueryOptions) => {
    return myBilling.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::myBilling
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:230
* @route '/api/widgets/billing/my-billing'
*/
myBilling.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myBilling.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Api\WidgetController::myBilling
* @see Modules/Billing/app/Http/Controllers/Api/WidgetController.php:230
* @route '/api/widgets/billing/my-billing'
*/
myBilling.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myBilling.url(options),
    method: 'head',
})

const WidgetController = { overview, outstanding, overdue, myBilling }

export default WidgetController