import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CustomerController::index
* @see app/Http/Controllers/CustomerController.php:14
* @route '/customers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerController::index
* @see app/Http/Controllers/CustomerController.php:14
* @route '/customers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::index
* @see app/Http/Controllers/CustomerController.php:14
* @route '/customers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::index
* @see app/Http/Controllers/CustomerController.php:14
* @route '/customers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerController::index
* @see app/Http/Controllers/CustomerController.php:14
* @route '/customers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::index
* @see app/Http/Controllers/CustomerController.php:14
* @route '/customers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::index
* @see app/Http/Controllers/CustomerController.php:14
* @route '/customers'
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
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:46
* @route '/customers/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/customers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:46
* @route '/customers/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:46
* @route '/customers/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:46
* @route '/customers/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:46
* @route '/customers/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:46
* @route '/customers/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::create
* @see app/Http/Controllers/CustomerController.php:46
* @route '/customers/create'
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
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:51
* @route '/customers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/customers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:51
* @route '/customers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:51
* @route '/customers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:51
* @route '/customers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::store
* @see app/Http/Controllers/CustomerController.php:51
* @route '/customers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CustomerController::show
* @see app/Http/Controllers/CustomerController.php:0
* @route '/customers/{customer}'
*/
export const show = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/customers/{customer}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerController::show
* @see app/Http/Controllers/CustomerController.php:0
* @route '/customers/{customer}'
*/
show.url = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customer: args }
    }

    if (Array.isArray(args)) {
        args = {
            customer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customer: args.customer,
    }

    return show.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::show
* @see app/Http/Controllers/CustomerController.php:0
* @route '/customers/{customer}'
*/
show.get = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::show
* @see app/Http/Controllers/CustomerController.php:0
* @route '/customers/{customer}'
*/
show.head = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerController::show
* @see app/Http/Controllers/CustomerController.php:0
* @route '/customers/{customer}'
*/
const showForm = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::show
* @see app/Http/Controllers/CustomerController.php:0
* @route '/customers/{customer}'
*/
showForm.get = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::show
* @see app/Http/Controllers/CustomerController.php:0
* @route '/customers/{customer}'
*/
showForm.head = (args: { customer: string | number } | [customer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CustomerController::edit
* @see app/Http/Controllers/CustomerController.php:77
* @route '/customers/{customer}/edit'
*/
export const edit = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/customers/{customer}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerController::edit
* @see app/Http/Controllers/CustomerController.php:77
* @route '/customers/{customer}/edit'
*/
edit.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::edit
* @see app/Http/Controllers/CustomerController.php:77
* @route '/customers/{customer}/edit'
*/
edit.get = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::edit
* @see app/Http/Controllers/CustomerController.php:77
* @route '/customers/{customer}/edit'
*/
edit.head = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerController::edit
* @see app/Http/Controllers/CustomerController.php:77
* @route '/customers/{customer}/edit'
*/
const editForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::edit
* @see app/Http/Controllers/CustomerController.php:77
* @route '/customers/{customer}/edit'
*/
editForm.get = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerController::edit
* @see app/Http/Controllers/CustomerController.php:77
* @route '/customers/{customer}/edit'
*/
editForm.head = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:147
* @route '/customers/{customer}'
*/
export const update = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/customers/{customer}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:147
* @route '/customers/{customer}'
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
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:147
* @route '/customers/{customer}'
*/
update.put = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:147
* @route '/customers/{customer}'
*/
update.patch = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CustomerController::update
* @see app/Http/Controllers/CustomerController.php:147
* @route '/customers/{customer}'
*/
const updateForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/CustomerController.php:147
* @route '/customers/{customer}'
*/
updateForm.put = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/CustomerController.php:147
* @route '/customers/{customer}'
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

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:167
* @route '/customers/{customer}'
*/
export const destroy = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/customers/{customer}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:167
* @route '/customers/{customer}'
*/
destroy.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:167
* @route '/customers/{customer}'
*/
destroy.delete = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::destroy
* @see app/Http/Controllers/CustomerController.php:167
* @route '/customers/{customer}'
*/
const destroyForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/CustomerController.php:167
* @route '/customers/{customer}'
*/
destroyForm.delete = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\CustomerController::createUser
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
export const createUser = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createUser.url(args, options),
    method: 'post',
})

createUser.definition = {
    methods: ["post"],
    url: '/customers/{customer}/users/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::createUser
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
createUser.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return createUser.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::createUser
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
createUser.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::createUser
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
const createUserForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::createUser
* @see app/Http/Controllers/CustomerController.php:276
* @route '/customers/{customer}/users/create'
*/
createUserForm.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createUser.url(args, options),
    method: 'post',
})

createUser.form = createUserForm

/**
* @see \App\Http\Controllers\CustomerController::attachUser
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
export const attachUser = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachUser.url(args, options),
    method: 'post',
})

attachUser.definition = {
    methods: ["post"],
    url: '/customers/{customer}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::attachUser
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
attachUser.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return attachUser.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::attachUser
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
attachUser.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::attachUser
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
const attachUserForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attachUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::attachUser
* @see app/Http/Controllers/CustomerController.php:181
* @route '/customers/{customer}/users'
*/
attachUserForm.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attachUser.url(args, options),
    method: 'post',
})

attachUser.form = attachUserForm

/**
* @see \App\Http\Controllers\CustomerController::updateUserRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
export const updateUserRole = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUserRole.url(args, options),
    method: 'put',
})

updateUserRole.definition = {
    methods: ["put"],
    url: '/customers/{customer}/users/{user}/role',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CustomerController::updateUserRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
updateUserRole.url = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions) => {
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

    return updateUserRole.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::updateUserRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
updateUserRole.put = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUserRole.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::updateUserRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
const updateUserRoleForm = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUserRole.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::updateUserRole
* @see app/Http/Controllers/CustomerController.php:241
* @route '/customers/{customer}/users/{user}/role'
*/
updateUserRoleForm.put = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUserRole.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateUserRole.form = updateUserRoleForm

/**
* @see \App\Http\Controllers\CustomerController::detachUser
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
export const detachUser = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachUser.url(args, options),
    method: 'delete',
})

detachUser.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::detachUser
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
detachUser.url = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions) => {
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

    return detachUser.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::detachUser
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
detachUser.delete = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachUser.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::detachUser
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
const detachUserForm = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: detachUser.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::detachUser
* @see app/Http/Controllers/CustomerController.php:227
* @route '/customers/{customer}/users/{user}'
*/
detachUserForm.delete = (args: { customer: string | { id: string }, user: string | number } | [customer: string | { id: string }, user: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: detachUser.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

detachUser.form = detachUserForm

/**
* @see \App\Http\Controllers\CustomerController::storeProject
* @see app/Http/Controllers/CustomerController.php:376
* @route '/customers/{customer}/projects'
*/
export const storeProject = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeProject.url(args, options),
    method: 'post',
})

storeProject.definition = {
    methods: ["post"],
    url: '/customers/{customer}/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::storeProject
* @see app/Http/Controllers/CustomerController.php:376
* @route '/customers/{customer}/projects'
*/
storeProject.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return storeProject.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::storeProject
* @see app/Http/Controllers/CustomerController.php:376
* @route '/customers/{customer}/projects'
*/
storeProject.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeProject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::storeProject
* @see app/Http/Controllers/CustomerController.php:376
* @route '/customers/{customer}/projects'
*/
const storeProjectForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeProject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::storeProject
* @see app/Http/Controllers/CustomerController.php:376
* @route '/customers/{customer}/projects'
*/
storeProjectForm.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeProject.url(args, options),
    method: 'post',
})

storeProject.form = storeProjectForm

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:400
* @route '/customers/{customer}/projects/{project}'
*/
export const updateProject = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProject.url(args, options),
    method: 'put',
})

updateProject.definition = {
    methods: ["put"],
    url: '/customers/{customer}/projects/{project}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:400
* @route '/customers/{customer}/projects/{project}'
*/
updateProject.url = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions) => {
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

    return updateProject.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:400
* @route '/customers/{customer}/projects/{project}'
*/
updateProject.put = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProject.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::updateProject
* @see app/Http/Controllers/CustomerController.php:400
* @route '/customers/{customer}/projects/{project}'
*/
const updateProjectForm = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/CustomerController.php:400
* @route '/customers/{customer}/projects/{project}'
*/
updateProjectForm.put = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CustomerController::destroyProject
* @see app/Http/Controllers/CustomerController.php:423
* @route '/customers/{customer}/projects/{project}'
*/
export const destroyProject = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyProject.url(args, options),
    method: 'delete',
})

destroyProject.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/projects/{project}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::destroyProject
* @see app/Http/Controllers/CustomerController.php:423
* @route '/customers/{customer}/projects/{project}'
*/
destroyProject.url = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions) => {
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

    return destroyProject.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::destroyProject
* @see app/Http/Controllers/CustomerController.php:423
* @route '/customers/{customer}/projects/{project}'
*/
destroyProject.delete = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyProject.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::destroyProject
* @see app/Http/Controllers/CustomerController.php:423
* @route '/customers/{customer}/projects/{project}'
*/
const destroyProjectForm = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyProject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::destroyProject
* @see app/Http/Controllers/CustomerController.php:423
* @route '/customers/{customer}/projects/{project}'
*/
destroyProjectForm.delete = (args: { customer: string | { id: string }, project: string | number } | [customer: string | { id: string }, project: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyProject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyProject.form = destroyProjectForm

/**
* @see \App\Http\Controllers\CustomerController::storeWebsite
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
export const storeWebsite = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeWebsite.url(args, options),
    method: 'post',
})

storeWebsite.definition = {
    methods: ["post"],
    url: '/customers/{customer}/websites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerController::storeWebsite
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
storeWebsite.url = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return storeWebsite.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::storeWebsite
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
storeWebsite.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeWebsite.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::storeWebsite
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
const storeWebsiteForm = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeWebsite.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::storeWebsite
* @see app/Http/Controllers/CustomerController.php:445
* @route '/customers/{customer}/websites'
*/
storeWebsiteForm.post = (args: { customer: string | { id: string } } | [customer: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeWebsite.url(args, options),
    method: 'post',
})

storeWebsite.form = storeWebsiteForm

/**
* @see \App\Http\Controllers\CustomerController::updateWebsite
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
export const updateWebsite = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateWebsite.url(args, options),
    method: 'put',
})

updateWebsite.definition = {
    methods: ["put"],
    url: '/customers/{customer}/websites/{website}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CustomerController::updateWebsite
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
updateWebsite.url = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions) => {
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

    return updateWebsite.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::updateWebsite
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
updateWebsite.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateWebsite.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::updateWebsite
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
const updateWebsiteForm = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateWebsite.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::updateWebsite
* @see app/Http/Controllers/CustomerController.php:472
* @route '/customers/{customer}/websites/{website}'
*/
updateWebsiteForm.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateWebsite.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateWebsite.form = updateWebsiteForm

/**
* @see \App\Http\Controllers\CustomerController::updateWebsiteProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
export const updateWebsiteProject = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateWebsiteProject.url(args, options),
    method: 'put',
})

updateWebsiteProject.definition = {
    methods: ["put"],
    url: '/customers/{customer}/websites/{website}/project',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CustomerController::updateWebsiteProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
updateWebsiteProject.url = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions) => {
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

    return updateWebsiteProject.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::updateWebsiteProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
updateWebsiteProject.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateWebsiteProject.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CustomerController::updateWebsiteProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
const updateWebsiteProjectForm = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateWebsiteProject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::updateWebsiteProject
* @see app/Http/Controllers/CustomerController.php:515
* @route '/customers/{customer}/websites/{website}/project'
*/
updateWebsiteProjectForm.put = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateWebsiteProject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateWebsiteProject.form = updateWebsiteProjectForm

/**
* @see \App\Http\Controllers\CustomerController::destroyWebsite
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
export const destroyWebsite = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyWebsite.url(args, options),
    method: 'delete',
})

destroyWebsite.definition = {
    methods: ["delete"],
    url: '/customers/{customer}/websites/{website}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CustomerController::destroyWebsite
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
destroyWebsite.url = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions) => {
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

    return destroyWebsite.definition.url
            .replace('{customer}', parsedArgs.customer.toString())
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::destroyWebsite
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
destroyWebsite.delete = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyWebsite.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CustomerController::destroyWebsite
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
const destroyWebsiteForm = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyWebsite.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerController::destroyWebsite
* @see app/Http/Controllers/CustomerController.php:497
* @route '/customers/{customer}/websites/{website}'
*/
destroyWebsiteForm.delete = (args: { customer: string | { id: string }, website: string | number } | [customer: string | { id: string }, website: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyWebsite.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyWebsite.form = destroyWebsiteForm

const CustomerController = { index, create, store, show, edit, update, destroy, createUser, attachUser, updateUserRole, detachUser, storeProject, updateProject, destroyProject, storeWebsite, updateWebsite, updateWebsiteProject, destroyWebsite }

export default CustomerController