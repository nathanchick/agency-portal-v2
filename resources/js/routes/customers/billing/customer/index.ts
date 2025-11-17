import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
export const stats = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/customers/billing/{customer}/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
stats.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return stats.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
stats.get = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
stats.head = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
const statsForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
statsForm.get = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/BillingController.php:121
* @route '/customers/billing/{customer}/stats'
*/
statsForm.head = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stats.form = statsForm

const customer = {
    stats: Object.assign(stats, stats),
}

export default customer