import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import tasks from './tasks'
import users from './users'
import budgetAdjustments from './budget-adjustments'
import budgetPeriods from './budget-periods'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/services',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
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
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
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
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheet/services',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
export const show = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/{service}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
show.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { service: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
    }

    return show.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
show.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
show.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
const showForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
showForm.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
showForm.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
export const edit = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/{service}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
edit.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { service: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
    }

    return edit.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
edit.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
edit.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
const editForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
editForm.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
editForm.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
export const update = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/timesheet/services/{service}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
update.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { service: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
    }

    return update.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
update.put = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
const updateForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
updateForm.put = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
export const destroy = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
destroy.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { service: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
    }

    return destroy.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
destroy.delete = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
const destroyForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
destroyForm.delete = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const services = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    tasks: Object.assign(tasks, tasks),
    users: Object.assign(users, users),
    budgetAdjustments: Object.assign(budgetAdjustments, budgetAdjustments),
    budgetPeriods: Object.assign(budgetPeriods, budgetPeriods),
}

export default services