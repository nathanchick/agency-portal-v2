import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\CustomerController::switchMethod
* @see app/Http/Controllers/Customer/CustomerController.php:13
* @route '/customer/switch'
*/
export const switchMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

switchMethod.definition = {
    methods: ["post"],
    url: '/customer/switch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CustomerController::switchMethod
* @see app/Http/Controllers/Customer/CustomerController.php:13
* @route '/customer/switch'
*/
switchMethod.url = (options?: RouteQueryOptions) => {
    return switchMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CustomerController::switchMethod
* @see app/Http/Controllers/Customer/CustomerController.php:13
* @route '/customer/switch'
*/
switchMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::switchMethod
* @see app/Http/Controllers/Customer/CustomerController.php:13
* @route '/customer/switch'
*/
const switchMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CustomerController::switchMethod
* @see app/Http/Controllers/Customer/CustomerController.php:13
* @route '/customer/switch'
*/
switchMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

switchMethod.form = switchMethodForm

const CustomerController = { switchMethod, switch: switchMethod }

export default CustomerController