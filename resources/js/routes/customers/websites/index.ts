import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:326
* @route '/customers/{customer}/websites'
*/
export const store = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customers/{customer}/websites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:326
* @route '/customers/{customer}/websites'
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
* @see app/Http/Controllers/CustomerController.php:326
* @route '/customers/{customer}/websites'
*/
store.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:326
* @route '/customers/{customer}/websites'
*/
const storeForm = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:326
* @route '/customers/{customer}/websites'
*/
storeForm.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:346
* @route '/customers/{customer}/websites/{website}'
*/
export const destroy = (args: { customer: string | number | { id: string | number }, website: string | number } | [customer: string | number | { id: string | number }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/websites/{website}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:346
* @route '/customers/{customer}/websites/{website}'
*/
destroy.url = (args: { customer: string | number | { id: string | number }, website: string | number } | [customer: string | number | { id: string | number }, website: string | number ], options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/CustomerController.php:346
* @route '/customers/{customer}/websites/{website}'
*/
destroy.delete = (args: { customer: string | number | { id: string | number }, website: string | number } | [customer: string | number | { id: string | number }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:346
* @route '/customers/{customer}/websites/{website}'
*/
const destroyForm = (args: { customer: string | number | { id: string | number }, website: string | number } | [customer: string | number | { id: string | number }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/CustomerController.php:346
* @route '/customers/{customer}/websites/{website}'
*/
destroyForm.delete = (args: { customer: string | number | { id: string | number }, website: string | number } | [customer: string | number | { id: string | number }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
    destroy: Object.assign(destroy, destroy),
}

export default websites