import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportMethod
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/audit/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportMethod
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportMethod
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportMethod
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportMethod
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportMethod
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportMethod
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

const audit = {
    export: Object.assign(exportMethod, exportMethod),
}

export default audit