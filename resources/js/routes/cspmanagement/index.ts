import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cspmanagements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
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
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cspmanagements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
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
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cspmanagements',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
export const show = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return show.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
const showForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
showForm.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
showForm.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
export const edit = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/cspmanagements/{cspmanagement}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
edit.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return edit.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
edit.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
edit.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
const editForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
editForm.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
editForm.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
export const update = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return update.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update.put = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update.patch = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
const updateForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
updateForm.put = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
updateForm.patch = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
export const destroy = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
destroy.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return destroy.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
destroy.delete = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
const destroyForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
destroyForm.delete = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const cspmanagement = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default cspmanagement