import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::start
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
export const start = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/timesheet/timer/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::start
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
start.url = (options?: RouteQueryOptions) => {
    return start.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::start
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
start.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stop
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
export const stop = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

stop.definition = {
    methods: ["post"],
    url: '/timesheet/timer/{timeEntry}/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stop
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
stop.url = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timeEntry: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { timeEntry: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            timeEntry: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timeEntry: typeof args.timeEntry === 'object'
        ? args.timeEntry.id
        : args.timeEntry,
    }

    return stop.definition.url
            .replace('{timeEntry}', parsedArgs.timeEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stop
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
stop.post = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

const timer = {
    start: Object.assign(start, start),
    stop: Object.assign(stop, stop),
}

export default timer