import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::index
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:36
* @route '/customer/billing'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/customer/billing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::index
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:36
* @route '/customer/billing'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::index
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:36
* @route '/customer/billing'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::index
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:36
* @route '/customer/billing'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::index
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:36
* @route '/customer/billing'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::index
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:36
* @route '/customer/billing'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::index
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:36
* @route '/customer/billing'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:106
* @route '/customer/billing/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/customer/billing/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:106
* @route '/customer/billing/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:106
* @route '/customer/billing/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:106
* @route '/customer/billing/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:106
* @route '/customer/billing/stats'
*/
const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:106
* @route '/customer/billing/stats'
*/
statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::stats
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:106
* @route '/customer/billing/stats'
*/
statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stats.form = statsForm

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::show
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:84
* @route '/customer/billing/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/customer/billing/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::show
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:84
* @route '/customer/billing/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::show
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:84
* @route '/customer/billing/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::show
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:84
* @route '/customer/billing/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::show
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:84
* @route '/customer/billing/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::show
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:84
* @route '/customer/billing/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Billing\Http\Controllers\Customer\BillingController::show
* @see Modules/Billing/app/Http/Controllers/Customer/BillingController.php:84
* @route '/customer/billing/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const billing = {
    index: Object.assign(index, index),
    stats: Object.assign(stats, stats),
    show: Object.assign(show, show),
}

export default billing