import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::index
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:15
* @route '/timesheet/reports/saved'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::index
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:15
* @route '/timesheet/reports/saved'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::index
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:15
* @route '/timesheet/reports/saved'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

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
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::store
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:30
* @route '/timesheet/reports/saved'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::store
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:30
* @route '/timesheet/reports/saved'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::update
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:53
* @route '/timesheet/reports/saved/{savedReport}'
*/
export const update = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
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
update.url = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
update.put = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::update
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:53
* @route '/timesheet/reports/saved/{savedReport}'
*/
const updateForm = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::update
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:53
* @route '/timesheet/reports/saved/{savedReport}'
*/
updateForm.put = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:78
* @route '/timesheet/reports/saved/{savedReport}'
*/
export const destroy = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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
destroy.url = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
destroy.delete = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:78
* @route '/timesheet/reports/saved/{savedReport}'
*/
const destroyForm = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::destroy
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:78
* @route '/timesheet/reports/saved/{savedReport}'
*/
destroyForm.delete = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
export const load = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
load.url = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
load.get = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: load.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
load.head = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: load.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
const loadForm = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: load.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
loadForm.get = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: load.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\SavedReportController::load
* @see Modules/Timesheet/app/Http/Controllers/SavedReportController.php:96
* @route '/timesheet/reports/saved/{savedReport}/load'
*/
loadForm.head = (args: { savedReport: string | number | { id: string | number } } | [savedReport: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: load.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

load.form = loadForm

const saved = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    load: Object.assign(load, load),
}

export default saved