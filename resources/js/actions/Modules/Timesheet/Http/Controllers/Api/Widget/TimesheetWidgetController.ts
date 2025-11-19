import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../../wayfinder'
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

const TimesheetWidgetController = { weeklySummary }

export default TimesheetWidgetController