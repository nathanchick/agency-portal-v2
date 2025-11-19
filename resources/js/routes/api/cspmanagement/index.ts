import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/cspmanagements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
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
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/cspmanagements',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
export const show = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
show.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
show.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
const showForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
showForm.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
export const update = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
update.put = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
update.patch = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
export const destroy = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
destroy.delete = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
* @route '/api/v1/cspmanagements/{cspmanagement}'
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
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default cspmanagement