import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
export const create = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/customers/{customer}/users/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
create.url = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
create.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
const createForm = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: create.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
createForm.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: create.url(args, options),
    method: 'post',
})

create.form = createForm

/**
* @see \App\Http\Controllers\CustomerController::attach
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
export const attach = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

attach.definition = {
    methods: ["post"],
    url: '/customers/{customer}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::attach
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
attach.url = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return attach.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::attach
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
attach.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::attach
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
const attachForm = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attach.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::attach
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
attachForm.post = (args: { customer: string | number | { id: string | number } } | [customer: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attach.url(args, options),
    method: 'post',
})

attach.form = attachForm

/**
* @see \App\Http\Controllers\CustomerController::updateRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
export const updateRole = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

updateRole.definition = {
    methods: ["put"],
    url: '/customers/{customer}/users/{user}/role',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CustomerController::updateRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
updateRole.url = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            customer: args[0],
            user: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
        user: args.user,
    }

    return updateRole.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::updateRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
updateRole.put = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::updateRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
const updateRoleForm = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRole.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::updateRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
updateRoleForm.put = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRole.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateRole.form = updateRoleForm

/**
* @see \App\Http\Controllers\CustomerController::detach
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
export const detach = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

detach.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::detach
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
detach.url = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            customer: args[0],
            user: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: typeof args.customer === 'object'
        ? args.customer.id
        : args.customer,
        user: args.user,
    }

    return detach.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::detach
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
detach.delete = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::detach
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
const detachForm = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: detach.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::detach
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
detachForm.delete = (args: { customer: string | number | { id: string | number }, user: string | number } | [customer: string | number | { id: string | number }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: detach.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

detach.form = detachForm

const users = {
    create: Object.assign(create, create),
    attach: Object.assign(attach, attach),
    updateRole: Object.assign(updateRole, updateRole),
    detach: Object.assign(detach, detach),
}

export default users