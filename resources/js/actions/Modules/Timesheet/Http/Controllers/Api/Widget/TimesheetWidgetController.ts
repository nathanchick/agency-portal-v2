import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController::weeklySummary
* @see Modules/Timesheet/app/Http/Controllers/Api/Widget/TimesheetWidgetController.php:33
* @route '/api/widgets/timesheet/weekly-summary'
*/
export const weeklySummary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: weeklySummary.url(options),
    method: 'get',
})

weeklySummary.definition = {
    methods: ["get","head"],
    url: '/api/widgets/timesheet/weekly-summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController::weeklySummary
* @see Modules/Timesheet/app/Http/Controllers/Api/Widget/TimesheetWidgetController.php:33
* @route '/api/widgets/timesheet/weekly-summary'
*/
weeklySummary.url = (options?: RouteQueryOptions) => {
    return weeklySummary.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController::weeklySummary
* @see Modules/Timesheet/app/Http/Controllers/Api/Widget/TimesheetWidgetController.php:33
* @route '/api/widgets/timesheet/weekly-summary'
*/
weeklySummary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: weeklySummary.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController::weeklySummary
* @see Modules/Timesheet/app/Http/Controllers/Api/Widget/TimesheetWidgetController.php:33
* @route '/api/widgets/timesheet/weekly-summary'
*/
weeklySummary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: weeklySummary.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController::weeklySummary
* @see Modules/Timesheet/app/Http/Controllers/Api/Widget/TimesheetWidgetController.php:33
* @route '/api/widgets/timesheet/weekly-summary'
*/
const weeklySummaryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: weeklySummary.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController::weeklySummary
* @see Modules/Timesheet/app/Http/Controllers/Api/Widget/TimesheetWidgetController.php:33
* @route '/api/widgets/timesheet/weekly-summary'
*/
weeklySummaryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: weeklySummary.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController::weeklySummary
* @see Modules/Timesheet/app/Http/Controllers/Api/Widget/TimesheetWidgetController.php:33
* @route '/api/widgets/timesheet/weekly-summary'
*/
weeklySummaryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: weeklySummary.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

weeklySummary.form = weeklySummaryForm

const TimesheetWidgetController = { weeklySummary }

export default TimesheetWidgetController