import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:127
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
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:127
* @route '/api/extension/user'
*/
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:127
* @route '/api/extension/user'
*/
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:127
* @route '/api/extension/user'
*/
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:127
* @route '/api/extension/user'
*/
const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:127
* @route '/api/extension/user'
*/
userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::user
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:127
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
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:49
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
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:49
* @route '/api/extension/recent-entries'
*/
recentEntries.url = (options?: RouteQueryOptions) => {
    return recentEntries.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:49
* @route '/api/extension/recent-entries'
*/
recentEntries.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentEntries.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:49
* @route '/api/extension/recent-entries'
*/
recentEntries.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recentEntries.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:49
* @route '/api/extension/recent-entries'
*/
const recentEntriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentEntries.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:49
* @route '/api/extension/recent-entries'
*/
recentEntriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentEntries.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::recentEntries
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:49
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
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:82
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
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:82
* @route '/api/extension/time-entries'
*/
createEntry.url = (options?: RouteQueryOptions) => {
    return createEntry.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:82
* @route '/api/extension/time-entries'
*/
createEntry.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createEntry.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:82
* @route '/api/extension/time-entries'
*/
const createEntryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createEntry.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController::createEntry
* @see Modules/Timesheet/app/Http/Controllers/Api/Extension/TimesheetExtensionController.php:82
* @route '/api/extension/time-entries'
*/
createEntryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createEntry.url(options),
    method: 'post',
})

createEntry.form = createEntryForm

const TimesheetExtensionController = { user, services, recentEntries, createEntry }

export default TimesheetExtensionController