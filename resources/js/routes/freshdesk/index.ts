import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
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