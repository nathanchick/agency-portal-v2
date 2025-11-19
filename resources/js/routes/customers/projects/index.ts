import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Customer\Http\Controllers\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:441
* @route '/customers/{customer}/projects'
*/
export const store = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customers/{customer}/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:441
* @route '/customers/{customer}/projects'
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
* @see \Modules\Customer\Http\Controllers\CustomerController::store
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:441
* @route '/customers/{customer}/projects'
*/
store.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:467
* @route '/customers/{customer}/projects/{project}'
*/
export const update = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/customers/{customer}/projects/{project}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:467
* @route '/customers/{customer}/projects/{project}'
*/
update.url = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            customer: args[0],
            project: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
        project: args.project,
    }

    return update.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:467
* @route '/customers/{customer}/projects/{project}'
*/
update.put = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:491
* @route '/customers/{customer}/projects/{project}'
*/
export const destroy = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/projects/{project}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:491
* @route '/customers/{customer}/projects/{project}'
*/
destroy.url = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            customer: args[0],
            project: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
        project: args.project,
    }

    return destroy.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::destroy
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:491
* @route '/customers/{customer}/projects/{project}'
*/
destroy.delete = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const projects = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default projects