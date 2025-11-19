import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::create
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/extension/time-entries',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::create
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::create
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::create
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: create.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::create
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
createForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: create.url(options),
    method: 'post',
})

create.form = createForm

const timeEntries = {
    create: Object.assign(create, create),
}

export default timeEntries