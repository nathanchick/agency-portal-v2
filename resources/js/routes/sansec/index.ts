import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sansecs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::create
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:21
* @route '/sansecs/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sansecs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::create
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:21
* @route '/sansecs/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::create
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:21
* @route '/sansecs/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::create
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:21
* @route '/sansecs/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/sansecs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sansecs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/sansecs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/sansecs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
export const show = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sansecs/{sansec}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
show.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sansec: args }
    }

    if (Array.isArray(args)) {
        args = {
            sansec: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sansec: args.sansec,
    }

    return show.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
show.get = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
show.head = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::edit
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:42
* @route '/sansecs/{sansec}/edit'
*/
export const edit = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sansecs/{sansec}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::edit
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:42
* @route '/sansecs/{sansec}/edit'
*/
edit.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sansec: args }
    }

    if (Array.isArray(args)) {
        args = {
            sansec: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sansec: args.sansec,
    }

    return edit.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::edit
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:42
* @route '/sansecs/{sansec}/edit'
*/
edit.get = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::edit
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:42
* @route '/sansecs/{sansec}/edit'
*/
edit.head = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
export const update = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sansecs/{sansec}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
update.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sansec: args }
    }

    if (Array.isArray(args)) {
        args = {
            sansec: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sansec: args.sansec,
    }

    return update.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
update.put = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
update.patch = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/sansecs/{sansec}'
*/
export const destroy = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sansecs/{sansec}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/sansecs/{sansec}'
*/
destroy.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sansec: args }
    }

    if (Array.isArray(args)) {
        args = {
            sansec: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sansec: args.sansec,
    }

    return destroy.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/sansecs/{sansec}'
*/
destroy.delete = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const sansec = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default sansec