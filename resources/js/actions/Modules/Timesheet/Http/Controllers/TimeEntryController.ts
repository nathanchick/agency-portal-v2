import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::index
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:18
* @route '/timesheet/entries'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/entries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::index
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:18
* @route '/timesheet/entries'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::index
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:18
* @route '/timesheet/entries'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::index
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:18
* @route '/timesheet/entries'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::index
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:18
* @route '/timesheet/entries'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::index
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:18
* @route '/timesheet/entries'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::index
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:18
* @route '/timesheet/entries'
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
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::create
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:149
* @route '/timesheet/entries/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/timesheet/entries/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::create
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:149
* @route '/timesheet/entries/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::create
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:149
* @route '/timesheet/entries/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::create
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:149
* @route '/timesheet/entries/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::create
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:149
* @route '/timesheet/entries/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::create
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:149
* @route '/timesheet/entries/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::create
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:149
* @route '/timesheet/entries/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::store
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:181
* @route '/timesheet/entries'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheet/entries',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::store
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:181
* @route '/timesheet/entries'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::store
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:181
* @route '/timesheet/entries'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::store
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:181
* @route '/timesheet/entries'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::store
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:181
* @route '/timesheet/entries'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
export const edit = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/timesheet/entries/{timeEntry}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
edit.url = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{timeEntry}', parsedArgs.timeEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
edit.get = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
edit.head = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
const editForm = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
editForm.get = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
editForm.head = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::update
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:352
* @route '/timesheet/entries/{timeEntry}'
*/
export const update = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/timesheet/entries/{timeEntry}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::update
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:352
* @route '/timesheet/entries/{timeEntry}'
*/
update.url = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{timeEntry}', parsedArgs.timeEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::update
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:352
* @route '/timesheet/entries/{timeEntry}'
*/
update.put = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::update
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:352
* @route '/timesheet/entries/{timeEntry}'
*/
const updateForm = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::update
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:352
* @route '/timesheet/entries/{timeEntry}'
*/
updateForm.put = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:389
* @route '/timesheet/entries/{timeEntry}'
*/
export const destroy = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheet/entries/{timeEntry}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:389
* @route '/timesheet/entries/{timeEntry}'
*/
destroy.url = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{timeEntry}', parsedArgs.timeEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:389
* @route '/timesheet/entries/{timeEntry}'
*/
destroy.delete = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:389
* @route '/timesheet/entries/{timeEntry}'
*/
const destroyForm = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:389
* @route '/timesheet/entries/{timeEntry}'
*/
destroyForm.delete = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
export const startTimer = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startTimer.url(options),
    method: 'post',
})

startTimer.definition = {
    methods: ["post"],
    url: '/timesheet/timer/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
startTimer.url = (options?: RouteQueryOptions) => {
    return startTimer.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
startTimer.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startTimer.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
const startTimerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: startTimer.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::startTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:225
* @route '/timesheet/timer/start'
*/
startTimerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: startTimer.url(options),
    method: 'post',
})

startTimer.form = startTimerForm

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
export const stopTimer = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopTimer.url(args, options),
    method: 'post',
})

stopTimer.definition = {
    methods: ["post"],
    url: '/timesheet/timer/{timeEntry}/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
stopTimer.url = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return stopTimer.definition.url
            .replace('{timeEntry}', parsedArgs.timeEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
stopTimer.post = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopTimer.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
const stopTimerForm = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stopTimer.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::stopTimer
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:271
* @route '/timesheet/timer/{timeEntry}/stop'
*/
stopTimerForm.post = (args: { timeEntry: string | number | { id: string | number } } | [timeEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stopTimer.url(args, options),
    method: 'post',
})

stopTimer.form = stopTimerForm

const TimeEntryController = { index, create, store, edit, update, destroy, startTimer, stopTimer }

export default TimeEntryController