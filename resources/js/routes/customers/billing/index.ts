import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import customer from './customer'
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

const billing = {
    overview: Object.assign(overview, overview),
    customer: Object.assign(customer, customer),
}

export default billing