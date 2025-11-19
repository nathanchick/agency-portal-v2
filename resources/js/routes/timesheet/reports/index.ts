import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import saved from './saved'
import scheduled from './scheduled'
/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:26
* @route '/timesheet/reports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:26
* @route '/timesheet/reports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:26
* @route '/timesheet/reports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:26
* @route '/timesheet/reports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:57
* @route '/timesheet/reports/generate'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/timesheet/reports/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:57
* @route '/timesheet/reports/generate'
*/
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::generate
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:57
* @route '/timesheet/reports/generate'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:81
* @route '/timesheet/reports/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportMethod.url(options),
    method: 'post',
})

exportMethod.definition = {
    methods: ["post"],
    url: '/timesheet/reports/export',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:81
* @route '/timesheet/reports/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ReportController::exportMethod
* @see Modules/Timesheet/app/Http/Controllers/ReportController.php:81
* @route '/timesheet/reports/export'
*/
exportMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: exportMethod.url(options),
    method: 'post',
})

const reports = {
    index: Object.assign(index, index),
    generate: Object.assign(generate, generate),
    export: Object.assign(exportMethod, exportMethod),
    saved: Object.assign(saved, saved),
    scheduled: Object.assign(scheduled, scheduled),
}

export default reports