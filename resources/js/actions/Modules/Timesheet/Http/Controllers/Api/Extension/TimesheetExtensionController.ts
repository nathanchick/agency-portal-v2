import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../../wayfinder'
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
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:141
* @route '/api/extension/user'
*/
const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:141
* @route '/api/extension/user'
*/
userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:141
* @route '/api/extension/user'
*/
userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

user.form = userForm

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
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::services
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:17
* @route '/api/extension/services'
*/
const servicesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: services.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::services
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:17
* @route '/api/extension/services'
*/
servicesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: services.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::services
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:17
* @route '/api/extension/services'
*/
servicesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: services.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

services.form = servicesForm

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
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:60
* @route '/api/extension/recent-entries'
*/
const recentEntriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentEntries.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:60
* @route '/api/extension/recent-entries'
*/
recentEntriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentEntries.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:60
* @route '/api/extension/recent-entries'
*/
recentEntriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentEntries.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

recentEntries.form = recentEntriesForm

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
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
const createEntryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createEntry.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:96
* @route '/api/extension/time-entries'
*/
createEntryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createEntry.url(options),
    method: 'post',
})

createEntry.form = createEntryForm

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
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::currentTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
const currentTimerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: currentTimer.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::currentTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
currentTimerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: currentTimer.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::currentTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:170
* @route '/api/extension/timer/current'
*/
currentTimerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: currentTimer.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

currentTimer.form = currentTimerForm

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
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
const startTimerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: startTimer.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:209
* @route '/api/extension/timer/start'
*/
startTimerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: startTimer.url(options),
    method: 'post',
})

startTimer.form = startTimerForm

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

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
const stopTimerForm = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stopTimer.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:293
* @route '/api/extension/timer/{timer}/stop'
*/
stopTimerForm.post = (args: { timer: string | number } | [timer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stopTimer.url(args, options),
    method: 'post',
})

stopTimer.form = stopTimerForm

const TimesheetExtensionController = { user, services, recentEntries, createEntry, currentTimer, startTimer, stopTimer }

export default TimesheetExtensionController