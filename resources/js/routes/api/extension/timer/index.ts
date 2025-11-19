import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::current
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
export const current = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: current.url(options),
    method: 'get',
})

current.definition = {
    methods: ["get","head"],
    url: '/api/extension/timer/current',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::current
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
current.url = (options?: RouteQueryOptions) => {
    return current.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::current
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
current.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: current.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::current
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
current.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: current.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::start
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
export const start = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/api/extension/timer/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::start
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
start.url = (options?: RouteQueryOptions) => {
    return start.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::start
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
start.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stop
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
export const stop = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

stop.definition = {
    methods: ["post"],
    url: '/api/extension/timer/{timer}/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stop
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
stop.url = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timer: args }
    }

    if (Array.isArray(args)) {
        args = {
            timer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timer: args.timer,
    }

    return stop.definition.url
            .replace('{timer}', parsedArgs.timer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stop
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
stop.post = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

const timer = {
    current: Object.assign(current, current),
    start: Object.assign(start, start),
    stop: Object.assign(stop, stop),
}

export default timer