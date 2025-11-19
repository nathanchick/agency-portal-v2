import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import oauth from './oauth'
import invoices from './invoices'
/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/xeros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::create
* @see Modules/Xero/app/Http/Controllers/XeroController.php:21
* @route '/xeros/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/xeros/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::create
* @see Modules/Xero/app/Http/Controllers/XeroController.php:21
* @route '/xeros/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::create
* @see Modules/Xero/app/Http/Controllers/XeroController.php:21
* @route '/xeros/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::create
* @see Modules/Xero/app/Http/Controllers/XeroController.php:21
* @route '/xeros/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/xeros'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/xeros',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/xeros'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/xeros'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
export const show = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/xeros/{xero}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
show.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { xero: args }
    }

    if (Array.isArray(args)) {
        args = {
            xero: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        xero: args.xero,
    }

    return show.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
show.get = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
show.head = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::edit
* @see Modules/Xero/app/Http/Controllers/XeroController.php:42
* @route '/xeros/{xero}/edit'
*/
export const edit = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/xeros/{xero}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::edit
* @see Modules/Xero/app/Http/Controllers/XeroController.php:42
* @route '/xeros/{xero}/edit'
*/
edit.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { xero: args }
    }

    if (Array.isArray(args)) {
        args = {
            xero: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        xero: args.xero,
    }

    return edit.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::edit
* @see Modules/Xero/app/Http/Controllers/XeroController.php:42
* @route '/xeros/{xero}/edit'
*/
edit.get = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::edit
* @see Modules/Xero/app/Http/Controllers/XeroController.php:42
* @route '/xeros/{xero}/edit'
*/
edit.head = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
export const update = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/xeros/{xero}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
update.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { xero: args }
    }

    if (Array.isArray(args)) {
        args = {
            xero: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        xero: args.xero,
    }

    return update.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
update.put = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
update.patch = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/xeros/{xero}'
*/
export const destroy = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/xeros/{xero}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/xeros/{xero}'
*/
destroy.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { xero: args }
    }

    if (Array.isArray(args)) {
        args = {
            xero: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        xero: args.xero,
    }

    return destroy.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/xeros/{xero}'
*/
destroy.delete = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const xero = {
    oauth: Object.assign(oauth, oauth),
    invoices: Object.assign(invoices, invoices),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default xero