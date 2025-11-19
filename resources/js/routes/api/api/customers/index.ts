import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::index
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:26
* @route '/api/organisations/{organisation}/customers'
*/
export const index = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::index
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:26
* @route '/api/organisations/{organisation}/customers'
*/
index.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organisation: args }
    }

    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
    }

    return index.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::index
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:26
* @route '/api/organisations/{organisation}/customers'
*/
index.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::index
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:26
* @route '/api/organisations/{organisation}/customers'
*/
index.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::index
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:26
* @route '/api/organisations/{organisation}/customers'
*/
const indexForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::index
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:26
* @route '/api/organisations/{organisation}/customers'
*/
indexForm.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::index
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:26
* @route '/api/organisations/{organisation}/customers'
*/
indexForm.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:47
* @route '/api/organisations/{organisation}/customers'
*/
export const store = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/organisations/{organisation}/customers',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:47
* @route '/api/organisations/{organisation}/customers'
*/
store.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organisation: args }
    }

    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
    }

    return store.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:47
* @route '/api/organisations/{organisation}/customers'
*/
store.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:47
* @route '/api/organisations/{organisation}/customers'
*/
const storeForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:47
* @route '/api/organisations/{organisation}/customers'
*/
storeForm.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::show
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:76
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
export const show = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/customers/{customer}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::show
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:76
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
show.url = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            customer: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        customer: args.customer,
    }

    return show.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::show
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:76
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
show.get = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::show
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:76
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
show.head = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::show
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:76
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
const showForm = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::show
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:76
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
showForm.get = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::show
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:76
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
showForm.head = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:97
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
export const update = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/organisations/{organisation}/customers/{customer}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:97
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
update.url = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            customer: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        customer: args.customer,
    }

    return update.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:97
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
update.put = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:97
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
update.patch = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:97
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
const updateForm = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:97
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
updateForm.put = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:97
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
updateForm.patch = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:126
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
export const destroy = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/organisations/{organisation}/customers/{customer}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:126
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
destroy.url = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            customer: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        customer: args.customer,
    }

    return destroy.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:126
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
destroy.delete = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:126
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
const destroyForm = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\Api\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/Api/CustomerController.php:126
* @route '/api/organisations/{organisation}/customers/{customer}'
*/
destroyForm.delete = (args: { organisation: string | number, customer: string | number } | [organisation: string | number, customer: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const customers = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default customers