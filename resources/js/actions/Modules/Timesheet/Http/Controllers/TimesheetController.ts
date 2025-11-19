import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/timesheets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/timesheets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
export const show = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/timesheets/{timesheet}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return show.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
export const update = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/timesheets/{timesheet}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return update.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update.put = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update.patch = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
export const destroy = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/timesheets/{timesheet}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
destroy.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return destroy.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
destroy.delete = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const TimesheetController = { index, store, show, update, destroy }

export default TimesheetController