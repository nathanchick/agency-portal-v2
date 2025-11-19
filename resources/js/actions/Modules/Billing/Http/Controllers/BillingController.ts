import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\BillingController::overview
* @see Modules/Billing/app/Http/Controllers/BillingController.php:31
* @route '/customers/billing'
*/
export const overview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.definition = {
    methods: ["get","head"],
    url: '/customers/billing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\BillingController::overview
* @see Modules/Billing/app/Http/Controllers/BillingController.php:31
* @route '/customers/billing'
*/
overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\BillingController::overview
* @see Modules/Billing/app/Http/Controllers/BillingController.php:31
* @route '/customers/billing'
*/
overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::overview
* @see Modules/Billing/app/Http/Controllers/BillingController.php:31
* @route '/customers/billing'
*/
overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
export const customerStats = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: customerStats.url(args, options),
    method: 'get',
})

customerStats.definition = {
    methods: ["get","head"],
    url: '/customers/billing/{customer}/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
customerStats.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customer: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customer: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
    }

    return customerStats.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
customerStats.get = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: customerStats.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
customerStats.head = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: customerStats.url(args, options),
    method: 'head',
})

const BillingController = { overview, customerStats }

export default BillingController