import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::index
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:15
* @route '/timesheet/reports/saved'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/reports/saved',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::index
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:15
* @route '/timesheet/reports/saved'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::index
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:15
* @route '/timesheet/reports/saved'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::index
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:15
* @route '/timesheet/reports/saved'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::store
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:30
* @route '/timesheet/reports/saved'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheet/reports/saved',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::store
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:30
* @route '/timesheet/reports/saved'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::store
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:30
* @route '/timesheet/reports/saved'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::update
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:53
* @route '/timesheet/reports/saved/{savedReport}'
*/
export const update = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/timesheet/reports/saved/{savedReport}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::update
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:53
* @route '/timesheet/reports/saved/{savedReport}'
*/
update.url = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { savedReport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { savedReport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            savedReport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        savedReport: typeof args.savedReport === 'object'
        ? args.savedReport.id
        : args.savedReport,
    }

    return update.definition.url
            .replace('{savedReport}', parsedArgs.savedReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::update
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:53
* @route '/timesheet/reports/saved/{savedReport}'
*/
update.put = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:78
* @route '/timesheet/reports/saved/{savedReport}'
*/
export const destroy = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheet/reports/saved/{savedReport}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:78
* @route '/timesheet/reports/saved/{savedReport}'
*/
destroy.url = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { savedReport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { savedReport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            savedReport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        savedReport: typeof args.savedReport === 'object'
        ? args.savedReport.id
        : args.savedReport,
    }

    return destroy.definition.url
            .replace('{savedReport}', parsedArgs.savedReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:78
* @route '/timesheet/reports/saved/{savedReport}'
*/
destroy.delete = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
export const load = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: load.url(args, options),
    method: 'get',
})

load.definition = {
    methods: ["get","head"],
    url: '/timesheet/reports/saved/{savedReport}/load',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
load.url = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { savedReport: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { savedReport: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            savedReport: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        savedReport: typeof args.savedReport === 'object'
        ? args.savedReport.id
        : args.savedReport,
    }

    return load.definition.url
            .replace('{savedReport}', parsedArgs.savedReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
load.get = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: load.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
load.head = (args: { savedReport: string | { id: string } } | [savedReport: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: load.url(args, options),
    method: 'head',
})

const saved = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    load: Object.assign(load, load),
}

export default saved