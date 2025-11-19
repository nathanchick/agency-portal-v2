import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
const showForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
showForm.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
showForm.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
const updateForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
updateForm.put = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
updateForm.patch = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

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

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
const destroyForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
destroyForm.delete = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const timesheet = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default timesheet