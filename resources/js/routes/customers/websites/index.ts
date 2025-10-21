import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
export const store = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customers/{customer}/websites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
store.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customer: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customer: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
    }

    return store.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
store.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
const storeForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
storeForm.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
export const update = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/customers/{customer}/websites/{website}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
update.url = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            customer: args[0],
            website: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
        website: args.website,
    }

    return update.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
update.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
const updateForm = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
updateForm.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
export const updateProject = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProject.url(args, options),
    method: 'put',
})

updateProject.definition = {
    methods: ["put"],
    url: '/customers/{customer}/websites/{website}/project',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
updateProject.url = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            customer: args[0],
            website: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
        website: args.website,
    }

    return updateProject.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
updateProject.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProject.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
const updateProjectForm = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateProject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
updateProjectForm.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateProject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateProject.form = updateProjectForm

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
export const destroy = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/websites/{website}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
destroy.url = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            customer: args[0],
            website: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
        website: args.website,
    }

    return destroy.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
destroy.delete = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
const destroyForm = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
destroyForm.delete = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const websites = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    updateProject: Object.assign(updateProject, updateProject),
    destroy: Object.assign(destroy, destroy),
}

export default websites