import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
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
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
* @route '/customer/switch'
*/
switchMethod.url = (options?: RouteQueryOptions) => {
    return switchMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
* @route '/customer/switch'
*/
switchMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
* @route '/customer/switch'
*/
const switchMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
* @route '/customer/switch'
*/
switchMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

switchMethod.form = switchMethodForm

const CustomerSwitcherController = { switchMethod, switch: switchMethod }

export default CustomerSwitcherController