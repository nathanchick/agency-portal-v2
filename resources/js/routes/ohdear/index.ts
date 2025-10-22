import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ohdears',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::create
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:21
* @route '/ohdears/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ohdears/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::create
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:21
* @route '/ohdears/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::create
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:21
* @route '/ohdears/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::create
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:21
* @route '/ohdears/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::create
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:21
* @route '/ohdears/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::create
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:21
* @route '/ohdears/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::create
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:21
* @route '/ohdears/create'
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ohdears',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
export const show = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/ohdears/{ohdear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ohdear: args }
    }

    if (Array.isArray(args)) {
        args = {
            ohdear: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ohdear: args.ohdear,
    }

    return show.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
const showForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
showForm.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
showForm.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::edit
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:42
* @route '/ohdears/{ohdear}/edit'
*/
export const edit = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/ohdears/{ohdear}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::edit
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:42
* @route '/ohdears/{ohdear}/edit'
*/
edit.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ohdear: args }
    }

    if (Array.isArray(args)) {
        args = {
            ohdear: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ohdear: args.ohdear,
    }

    return edit.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::edit
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:42
* @route '/ohdears/{ohdear}/edit'
*/
edit.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::edit
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:42
* @route '/ohdears/{ohdear}/edit'
*/
edit.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::edit
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:42
* @route '/ohdears/{ohdear}/edit'
*/
const editForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::edit
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:42
* @route '/ohdears/{ohdear}/edit'
*/
editForm.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::edit
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:42
* @route '/ohdears/{ohdear}/edit'
*/
editForm.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
export const update = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/ohdears/{ohdear}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
update.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ohdear: args }
    }

    if (Array.isArray(args)) {
        args = {
            ohdear: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ohdear: args.ohdear,
    }

    return update.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
update.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
update.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
const updateForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
updateForm.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
updateForm.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
export const destroy = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ohdears/{ohdear}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
destroy.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ohdear: args }
    }

    if (Array.isArray(args)) {
        args = {
            ohdear: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ohdear: args.ohdear,
    }

    return destroy.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
destroy.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
const destroyForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
destroyForm.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ohdear = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default ohdear