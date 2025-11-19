import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:141
* @route '/api/extension/user'
*/
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/api/extension/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:141
* @route '/api/extension/user'
*/
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:141
* @route '/api/extension/user'
*/
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:141
* @route '/api/extension/user'
*/
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::services
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:17
* @route '/api/extension/services'
*/
export const services = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: services.url(options),
    method: 'get',
})

services.definition = {
    methods: ["get","head"],
    url: '/api/extension/services',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::services
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:17
* @route '/api/extension/services'
*/
services.url = (options?: RouteQueryOptions) => {
    return services.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::services
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:17
* @route '/api/extension/services'
*/
services.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: services.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::services
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:17
* @route '/api/extension/services'
*/
services.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: services.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:60
* @route '/api/extension/recent-entries'
*/
export const recentEntries = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentEntries.url(options),
    method: 'get',
})

recentEntries.definition = {
    methods: ["get","head"],
    url: '/api/extension/recent-entries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:60
* @route '/api/extension/recent-entries'
*/
recentEntries.url = (options?: RouteQueryOptions) => {
    return recentEntries.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:60
* @route '/api/extension/recent-entries'
*/
recentEntries.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentEntries.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:60
* @route '/api/extension/recent-entries'
*/
recentEntries.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recentEntries.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
export const createEntry = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEntry.url(options),
    method: 'post',
})

createEntry.definition = {
    methods: ["post"],
    url: '/api/extension/time-entries',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
createEntry.url = (options?: RouteQueryOptions) => {
    return createEntry.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
createEntry.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEntry.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::currentTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
export const currentTimer = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: currentTimer.url(options),
    method: 'get',
})

currentTimer.definition = {
    methods: ["get","head"],
    url: '/api/extension/timer/current',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::currentTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
currentTimer.url = (options?: RouteQueryOptions) => {
    return currentTimer.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::currentTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
currentTimer.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: currentTimer.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::currentTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
currentTimer.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: currentTimer.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
export const startTimer = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startTimer.url(options),
    method: 'post',
})

startTimer.definition = {
    methods: ["post"],
    url: '/api/extension/timer/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
startTimer.url = (options?: RouteQueryOptions) => {
    return startTimer.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
startTimer.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startTimer.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
export const stopTimer = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopTimer.url(args, options),
    method: 'post',
})

stopTimer.definition = {
    methods: ["post"],
    url: '/api/extension/timer/{timer}/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
stopTimer.url = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return stopTimer.definition.url
            .replace('{timer}', parsedArgs.timer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
stopTimer.post = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopTimer.url(args, options),
    method: 'post',
})

const TimesheetExtensionController = { user, services, recentEntries, createEntry, currentTimer, startTimer, stopTimer }

export default TimesheetExtensionController