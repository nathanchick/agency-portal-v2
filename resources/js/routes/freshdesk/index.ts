import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/freshdesks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::create
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:21
* @route '/freshdesks/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/freshdesks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::create
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:21
* @route '/freshdesks/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::create
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:21
* @route '/freshdesks/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::create
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:21
* @route '/freshdesks/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::create
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:21
* @route '/freshdesks/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::create
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:21
* @route '/freshdesks/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::create
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:21
* @route '/freshdesks/create'
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/freshdesks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
export const show = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freshdesk: args }
    }

    if (Array.isArray(args)) {
        args = {
            freshdesk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        freshdesk: args.freshdesk,
    }

    return show.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
const showForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
showForm.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
showForm.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::edit
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:42
* @route '/freshdesks/{freshdesk}/edit'
*/
export const edit = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/freshdesks/{freshdesk}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::edit
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:42
* @route '/freshdesks/{freshdesk}/edit'
*/
edit.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freshdesk: args }
    }

    if (Array.isArray(args)) {
        args = {
            freshdesk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        freshdesk: args.freshdesk,
    }

    return edit.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::edit
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:42
* @route '/freshdesks/{freshdesk}/edit'
*/
edit.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::edit
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:42
* @route '/freshdesks/{freshdesk}/edit'
*/
edit.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::edit
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:42
* @route '/freshdesks/{freshdesk}/edit'
*/
const editForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::edit
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:42
* @route '/freshdesks/{freshdesk}/edit'
*/
editForm.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::edit
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:42
* @route '/freshdesks/{freshdesk}/edit'
*/
editForm.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
export const update = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
update.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freshdesk: args }
    }

    if (Array.isArray(args)) {
        args = {
            freshdesk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        freshdesk: args.freshdesk,
    }

    return update.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
update.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
update.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
const updateForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
updateForm.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
updateForm.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
export const destroy = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
destroy.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freshdesk: args }
    }

    if (Array.isArray(args)) {
        args = {
            freshdesk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        freshdesk: args.freshdesk,
    }

    return destroy.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
destroy.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
const destroyForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
destroyForm.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const freshdesk = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default freshdesk