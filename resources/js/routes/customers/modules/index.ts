import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:220
* @route '/customers/{customer}/modules'
*/
export const update = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/customers/{customer}/modules',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:220
* @route '/customers/{customer}/modules'
*/
update.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:220
* @route '/customers/{customer}/modules'
*/
update.patch = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:220
* @route '/customers/{customer}/modules'
*/
const updateForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Customer\Http\Controllers\CustomerController::update
* @see Modules/Customer/app/Http/Controllers/CustomerController.php:220
* @route '/customers/{customer}/modules'
*/
updateForm.patch = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const modules = {
    update: Object.assign(update, update),
}

export default modules