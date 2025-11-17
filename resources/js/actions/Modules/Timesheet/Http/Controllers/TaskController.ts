import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::index
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:16
* @route '/timesheet/tasks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/tasks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::index
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:16
* @route '/timesheet/tasks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::index
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:16
* @route '/timesheet/tasks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::index
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:16
* @route '/timesheet/tasks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::index
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:16
* @route '/timesheet/tasks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::index
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:16
* @route '/timesheet/tasks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::index
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:16
* @route '/timesheet/tasks'
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
* @see \Modules\Timesheet\Http\Controllers\TaskController::create
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:33
* @route '/timesheet/tasks/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/timesheet/tasks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::create
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:33
* @route '/timesheet/tasks/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::create
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:33
* @route '/timesheet/tasks/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::create
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:33
* @route '/timesheet/tasks/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::create
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:33
* @route '/timesheet/tasks/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::create
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:33
* @route '/timesheet/tasks/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::create
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:33
* @route '/timesheet/tasks/create'
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
* @see \Modules\Timesheet\Http\Controllers\TaskController::store
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:48
* @route '/timesheet/tasks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheet/tasks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::store
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:48
* @route '/timesheet/tasks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::store
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:48
* @route '/timesheet/tasks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::store
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:48
* @route '/timesheet/tasks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::store
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:48
* @route '/timesheet/tasks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::edit
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:80
* @route '/timesheet/tasks/{task}/edit'
*/
export const edit = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/timesheet/tasks/{task}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::edit
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:80
* @route '/timesheet/tasks/{task}/edit'
*/
edit.url = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { task: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: typeof args.task === 'object'
        ? args.task.id
        : args.task,
    }

    return edit.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::edit
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:80
* @route '/timesheet/tasks/{task}/edit'
*/
edit.get = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::edit
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:80
* @route '/timesheet/tasks/{task}/edit'
*/
edit.head = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::edit
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:80
* @route '/timesheet/tasks/{task}/edit'
*/
const editForm = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::edit
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:80
* @route '/timesheet/tasks/{task}/edit'
*/
editForm.get = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::edit
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:80
* @route '/timesheet/tasks/{task}/edit'
*/
editForm.head = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\TaskController::update
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:100
* @route '/timesheet/tasks/{task}'
*/
export const update = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/timesheet/tasks/{task}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::update
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:100
* @route '/timesheet/tasks/{task}'
*/
update.url = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { task: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: typeof args.task === 'object'
        ? args.task.id
        : args.task,
    }

    return update.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::update
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:100
* @route '/timesheet/tasks/{task}'
*/
update.put = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::update
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:100
* @route '/timesheet/tasks/{task}'
*/
const updateForm = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::update
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:100
* @route '/timesheet/tasks/{task}'
*/
updateForm.put = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\TaskController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:131
* @route '/timesheet/tasks/{task}'
*/
export const destroy = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheet/tasks/{task}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:131
* @route '/timesheet/tasks/{task}'
*/
destroy.url = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { task: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        task: typeof args.task === 'object'
        ? args.task.id
        : args.task,
    }

    return destroy.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:131
* @route '/timesheet/tasks/{task}'
*/
destroy.delete = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:131
* @route '/timesheet/tasks/{task}'
*/
const destroyForm = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TaskController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TaskController.php:131
* @route '/timesheet/tasks/{task}'
*/
destroyForm.delete = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TaskController = { index, create, store, edit, update, destroy }

export default TaskController