import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:296
* @route '/customers/{customer}/projects'
*/
export const store = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customers/{customer}/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:296
* @route '/customers/{customer}/projects'
*/
store.url = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/CustomerController.php:296
* @route '/customers/{customer}/projects'
*/
store.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:296
* @route '/customers/{customer}/projects'
*/
const storeForm = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:296
* @route '/customers/{customer}/projects'
*/
storeForm.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:315
* @route '/customers/{customer}/projects/{project}'
*/
export const destroy = (args: { customer: string | number | { id: string | number }, project: string | number } | [customer: string | number | { id: string | number }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/projects/{project}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:315
* @route '/customers/{customer}/projects/{project}'
*/
destroy.url = (args: { customer: string | number | { id: string | number }, project: string | number } | [customer: string | number | { id: string | number }, project: string | number ], options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:315
* @route '/customers/{customer}/projects/{project}'
*/
destroy.delete = (args: { customer: string | number | { id: string | number }, project: string | number } | [customer: string | number | { id: string | number }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:315
* @route '/customers/{customer}/projects/{project}'
*/
const destroyForm = (args: { customer: string | number | { id: string | number }, project: string | number } | [customer: string | number | { id: string | number }, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/CustomerController.php:315
* @route '/customers/{customer}/projects/{project}'
*/
destroyForm.delete = (args: { customer: string | number | { id: string | number }, project: string | number } | [customer: string | number | { id: string | number }, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const projects = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default projects