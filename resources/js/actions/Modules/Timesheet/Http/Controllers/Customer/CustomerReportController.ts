import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:23
* @route '/customer/timesheet/services/{service}/report/generate'
*/
export const generate = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(args, options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/customer/timesheet/services/{service}/report/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:23
* @route '/customer/timesheet/services/{service}/report/generate'
*/
generate.url = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: args.service,
    }

    return generate.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:23
* @route '/customer/timesheet/services/{service}/report/generate'
*/
generate.post = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:47
* @route '/customer/timesheet/services/{service}/report/export'
*/
export const exportMethod = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportMethod.url(args, options),
    method: 'post',
})

exportMethod.definition = {
    methods: ["post"],
    url: '/customer/timesheet/services/{service}/report/export',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:47
* @route '/customer/timesheet/services/{service}/report/export'
*/
exportMethod.url = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: args.service,
    }

    return exportMethod.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:47
* @route '/customer/timesheet/services/{service}/report/export'
*/
exportMethod.post = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportMethod.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::getExternalReferenceReport
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:76
* @route '/customer/timesheet/services/{service}/external-reference'
*/
export const getExternalReferenceReport = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getExternalReferenceReport.url(args, options),
    method: 'get',
})

getExternalReferenceReport.definition = {
    methods: ["get","head"],
    url: '/customer/timesheet/services/{service}/external-reference',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::getExternalReferenceReport
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:76
* @route '/customer/timesheet/services/{service}/external-reference'
*/
getExternalReferenceReport.url = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: args.service,
    }

    return getExternalReferenceReport.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::getExternalReferenceReport
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:76
* @route '/customer/timesheet/services/{service}/external-reference'
*/
getExternalReferenceReport.get = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getExternalReferenceReport.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::getExternalReferenceReport
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:76
* @route '/customer/timesheet/services/{service}/external-reference'
*/
getExternalReferenceReport.head = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getExternalReferenceReport.url(args, options),
    method: 'head',
})

const CustomerReportController = { generate, exportMethod, getExternalReferenceReport, export: exportMethod }

export default CustomerReportController