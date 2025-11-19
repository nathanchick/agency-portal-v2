import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:16
* @route '/timesheet/reports/scheduled'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/reports/scheduled',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:16
* @route '/timesheet/reports/scheduled'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:16
* @route '/timesheet/reports/scheduled'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::index
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:16
* @route '/timesheet/reports/scheduled'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::store
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:40
* @route '/timesheet/reports/scheduled'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheet/reports/scheduled',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::store
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:40
* @route '/timesheet/reports/scheduled'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::store
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:40
* @route '/timesheet/reports/scheduled'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::update
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:90
* @route '/timesheet/reports/scheduled/{scheduledReport}'
*/
export const update = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/timesheet/reports/scheduled/{scheduledReport}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::update
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:90
* @route '/timesheet/reports/scheduled/{scheduledReport}'
*/
update.url = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheduledReport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheduledReport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheduledReport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheduledReport: typeof args.scheduledReport === 'object'
        ? args.scheduledReport.id
        : args.scheduledReport,
    }

    return update.definition.url
            .replace('{scheduledReport}', parsedArgs.scheduledReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::update
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:90
* @route '/timesheet/reports/scheduled/{scheduledReport}'
*/
update.put = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:132
* @route '/timesheet/reports/scheduled/{scheduledReport}'
*/
export const destroy = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheet/reports/scheduled/{scheduledReport}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:132
* @route '/timesheet/reports/scheduled/{scheduledReport}'
*/
destroy.url = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheduledReport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheduledReport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheduledReport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheduledReport: typeof args.scheduledReport === 'object'
        ? args.scheduledReport.id
        : args.scheduledReport,
    }

    return destroy.definition.url
            .replace('{scheduledReport}', parsedArgs.scheduledReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:132
* @route '/timesheet/reports/scheduled/{scheduledReport}'
*/
destroy.delete = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::toggle
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:150
* @route '/timesheet/reports/scheduled/{scheduledReport}/toggle'
*/
export const toggle = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/timesheet/reports/scheduled/{scheduledReport}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::toggle
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:150
* @route '/timesheet/reports/scheduled/{scheduledReport}/toggle'
*/
toggle.url = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheduledReport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { scheduledReport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            scheduledReport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        scheduledReport: typeof args.scheduledReport === 'object'
        ? args.scheduledReport.id
        : args.scheduledReport,
    }

    return toggle.definition.url
            .replace('{scheduledReport}', parsedArgs.scheduledReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ScheduledReportController::toggle
* @see Modules/Timesheet/app/Http/Controllers/ScheduledReportController.php:150
* @route '/timesheet/reports/scheduled/{scheduledReport}/toggle'
*/
toggle.post = (args: { scheduledReport: string | { id: string } } | [scheduledReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

const scheduled = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggle: Object.assign(toggle, toggle),
}

export default scheduled