import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:23
* @route '/customer/timesheet/services/{service}/report/generate'
*/
const generateForm = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:23
* @route '/customer/timesheet/services/{service}/report/generate'
*/
generateForm.post = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(args, options),
    method: 'post',
})

generate.form = generateForm

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
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:47
* @route '/customer/timesheet/services/{service}/report/export'
*/
const exportMethodForm = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: exportMethod.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:47
* @route '/customer/timesheet/services/{service}/report/export'
*/
exportMethodForm.post = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: exportMethod.url(args, options),
    method: 'post',
})

exportMethod.form = exportMethodForm

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

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::getExternalReferenceReport
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:76
* @route '/customer/timesheet/services/{service}/external-reference'
*/
const getExternalReferenceReportForm = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getExternalReferenceReport.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::getExternalReferenceReport
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:76
* @route '/customer/timesheet/services/{service}/external-reference'
*/
getExternalReferenceReportForm.get = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getExternalReferenceReport.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerReportController::getExternalReferenceReport
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerReportController.php:76
* @route '/customer/timesheet/services/{service}/external-reference'
*/
getExternalReferenceReportForm.head = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getExternalReferenceReport.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getExternalReferenceReport.form = getExternalReferenceReportForm

const CustomerReportController = { generate, exportMethod, getExternalReferenceReport, export: exportMethod }

export default CustomerReportController