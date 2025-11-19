import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clickups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::create
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:21
* @route '/clickups/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/clickups/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::create
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:21
* @route '/clickups/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::create
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:21
* @route '/clickups/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::create
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:21
* @route '/clickups/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::create
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:21
* @route '/clickups/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::create
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:21
* @route '/clickups/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::create
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:21
* @route '/clickups/create'
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clickups',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
export const show = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/clickups/{clickup}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { clickup: args }
    }

    if (Array.isArray(args)) {
        args = {
            clickup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        clickup: args.clickup,
    }

    return show.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
const showForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
showForm.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
showForm.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::edit
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:42
* @route '/clickups/{clickup}/edit'
*/
export const edit = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/clickups/{clickup}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::edit
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:42
* @route '/clickups/{clickup}/edit'
*/
edit.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { clickup: args }
    }

    if (Array.isArray(args)) {
        args = {
            clickup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        clickup: args.clickup,
    }

    return edit.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::edit
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:42
* @route '/clickups/{clickup}/edit'
*/
edit.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::edit
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:42
* @route '/clickups/{clickup}/edit'
*/
edit.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::edit
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:42
* @route '/clickups/{clickup}/edit'
*/
const editForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::edit
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:42
* @route '/clickups/{clickup}/edit'
*/
editForm.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::edit
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:42
* @route '/clickups/{clickup}/edit'
*/
editForm.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
export const update = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/clickups/{clickup}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
update.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { clickup: args }
    }

    if (Array.isArray(args)) {
        args = {
            clickup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        clickup: args.clickup,
    }

    return update.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
update.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
update.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
const updateForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
updateForm.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
updateForm.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
export const destroy = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/clickups/{clickup}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
destroy.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { clickup: args }
    }

    if (Array.isArray(args)) {
        args = {
            clickup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        clickup: args.clickup,
    }

    return destroy.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
destroy.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
const destroyForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
destroyForm.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const clickup = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default clickup