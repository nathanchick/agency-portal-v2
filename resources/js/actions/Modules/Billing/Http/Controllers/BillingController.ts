import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \Modules\Billing\Http\Controllers\BillingController::overview
* @see Modules/Billing/app/Http/Controllers/BillingController.php:31
* @route '/customers/billing'
*/
const overviewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::overview
* @see Modules/Billing/app/Http/Controllers/BillingController.php:31
* @route '/customers/billing'
*/
overviewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::overview
* @see Modules/Billing/app/Http/Controllers/BillingController.php:31
* @route '/customers/billing'
*/
overviewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

overview.form = overviewForm

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
export const customerStats = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
customerStats.url = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
customerStats.get = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: customerStats.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
customerStats.head = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: customerStats.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
const customerStatsForm = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: customerStats.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
customerStatsForm.get = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: customerStats.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::customerStats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
customerStatsForm.head = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: customerStats.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

customerStats.form = customerStatsForm

const BillingController = { overview, customerStats }

export default BillingController