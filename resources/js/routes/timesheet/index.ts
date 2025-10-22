import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/timesheets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
export const show = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/timesheets/{timesheet}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
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
* @route '/timesheets/{timesheet}'
*/
show.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
show.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
const showForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
showForm.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
export const edit = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/timesheets/{timesheet}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
edit.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
edit.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
edit.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
const editForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
editForm.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
editForm.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
export const update = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/timesheets/{timesheet}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
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
* @route '/timesheets/{timesheet}'
*/
update.put = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
update.patch = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
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
* @route '/timesheets/{timesheet}'
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
* @route '/timesheets/{timesheet}'
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
* @route '/timesheets/{timesheet}'
*/
export const destroy = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheets/{timesheet}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/timesheets/{timesheet}'
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
* @route '/timesheets/{timesheet}'
*/
destroy.delete = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/timesheets/{timesheet}'
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
* @route '/timesheets/{timesheet}'
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
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default timesheet