import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
export const edit = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
edit.url = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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
edit.get = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:311
* @route '/timesheet/entries/{timeEntry}/edit'
*/
edit.head = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::update
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:352
* @route '/timesheet/entries/{timeEntry}'
*/
export const update = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
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
update.url = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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
update.put = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimeEntryController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimeEntryController.php:389
* @route '/timesheet/entries/{timeEntry}'
*/
export const destroy = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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
destroy.url = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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
destroy.delete = (args: { timeEntry: string | { id: string } } | [timeEntry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const entries = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default entries