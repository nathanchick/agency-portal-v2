import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/api/v1/xeros'
*/
const index6f26db068773fff6c44a743cfc278e45 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6f26db068773fff6c44a743cfc278e45.url(options),
    method: 'get',
})

index6f26db068773fff6c44a743cfc278e45.definition = {
    methods: ["get","head"],
    url: '/api/v1/xeros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/api/v1/xeros'
*/
index6f26db068773fff6c44a743cfc278e45.url = (options?: RouteQueryOptions) => {
    return index6f26db068773fff6c44a743cfc278e45.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/api/v1/xeros'
*/
index6f26db068773fff6c44a743cfc278e45.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6f26db068773fff6c44a743cfc278e45.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/api/v1/xeros'
*/
index6f26db068773fff6c44a743cfc278e45.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index6f26db068773fff6c44a743cfc278e45.url(options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
const index48ef0d7ef8bacfda908ef505e6d0cefe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index48ef0d7ef8bacfda908ef505e6d0cefe.url(options),
    method: 'get',
})

index48ef0d7ef8bacfda908ef505e6d0cefe.definition = {
    methods: ["get","head"],
    url: '/xeros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
index48ef0d7ef8bacfda908ef505e6d0cefe.url = (options?: RouteQueryOptions) => {
    return index48ef0d7ef8bacfda908ef505e6d0cefe.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
index48ef0d7ef8bacfda908ef505e6d0cefe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index48ef0d7ef8bacfda908ef505e6d0cefe.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::index
* @see Modules/Xero/app/Http/Controllers/XeroController.php:13
* @route '/xeros'
*/
index48ef0d7ef8bacfda908ef505e6d0cefe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index48ef0d7ef8bacfda908ef505e6d0cefe.url(options),
    method: 'head',
})

export const index = {
    '/api/v1/xeros': index6f26db068773fff6c44a743cfc278e45,
    '/xeros': index48ef0d7ef8bacfda908ef505e6d0cefe,
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/api/v1/xeros'
*/
const store6f26db068773fff6c44a743cfc278e45 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6f26db068773fff6c44a743cfc278e45.url(options),
    method: 'post',
})

store6f26db068773fff6c44a743cfc278e45.definition = {
    methods: ["post"],
    url: '/api/v1/xeros',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/api/v1/xeros'
*/
store6f26db068773fff6c44a743cfc278e45.url = (options?: RouteQueryOptions) => {
    return store6f26db068773fff6c44a743cfc278e45.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/api/v1/xeros'
*/
store6f26db068773fff6c44a743cfc278e45.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6f26db068773fff6c44a743cfc278e45.url(options),
    method: 'post',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/xeros'
*/
const store48ef0d7ef8bacfda908ef505e6d0cefe = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store48ef0d7ef8bacfda908ef505e6d0cefe.url(options),
    method: 'post',
})

store48ef0d7ef8bacfda908ef505e6d0cefe.definition = {
    methods: ["post"],
    url: '/xeros',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/xeros'
*/
store48ef0d7ef8bacfda908ef505e6d0cefe.url = (options?: RouteQueryOptions) => {
    return store48ef0d7ef8bacfda908ef505e6d0cefe.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::store
* @see Modules/Xero/app/Http/Controllers/XeroController.php:29
* @route '/xeros'
*/
store48ef0d7ef8bacfda908ef505e6d0cefe.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store48ef0d7ef8bacfda908ef505e6d0cefe.url(options),
    method: 'post',
})

export const store = {
    '/api/v1/xeros': store6f26db068773fff6c44a743cfc278e45,
    '/xeros': store48ef0d7ef8bacfda908ef505e6d0cefe,
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/api/v1/xeros/{xero}'
*/
const showd454a860a046aa94d3c9d3bdcdd01a2d = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showd454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'get',
})

showd454a860a046aa94d3c9d3bdcdd01a2d.definition = {
    methods: ["get","head"],
    url: '/api/v1/xeros/{xero}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/api/v1/xeros/{xero}'
*/
showd454a860a046aa94d3c9d3bdcdd01a2d.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showd454a860a046aa94d3c9d3bdcdd01a2d.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/api/v1/xeros/{xero}'
*/
showd454a860a046aa94d3c9d3bdcdd01a2d.get = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showd454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/api/v1/xeros/{xero}'
*/
showd454a860a046aa94d3c9d3bdcdd01a2d.head = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showd454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
const show738e2cfe8594046426c6760fd149f277 = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'get',
})

show738e2cfe8594046426c6760fd149f277.definition = {
    methods: ["get","head"],
    url: '/xeros/{xero}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
show738e2cfe8594046426c6760fd149f277.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show738e2cfe8594046426c6760fd149f277.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
show738e2cfe8594046426c6760fd149f277.get = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::show
* @see Modules/Xero/app/Http/Controllers/XeroController.php:34
* @route '/xeros/{xero}'
*/
show738e2cfe8594046426c6760fd149f277.head = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'head',
})

export const show = {
    '/api/v1/xeros/{xero}': showd454a860a046aa94d3c9d3bdcdd01a2d,
    '/xeros/{xero}': show738e2cfe8594046426c6760fd149f277,
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/api/v1/xeros/{xero}'
*/
const updated454a860a046aa94d3c9d3bdcdd01a2d = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'put',
})

updated454a860a046aa94d3c9d3bdcdd01a2d.definition = {
    methods: ["put","patch"],
    url: '/api/v1/xeros/{xero}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/api/v1/xeros/{xero}'
*/
updated454a860a046aa94d3c9d3bdcdd01a2d.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updated454a860a046aa94d3c9d3bdcdd01a2d.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/api/v1/xeros/{xero}'
*/
updated454a860a046aa94d3c9d3bdcdd01a2d.put = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/api/v1/xeros/{xero}'
*/
updated454a860a046aa94d3c9d3bdcdd01a2d.patch = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
const update738e2cfe8594046426c6760fd149f277 = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'put',
})

update738e2cfe8594046426c6760fd149f277.definition = {
    methods: ["put","patch"],
    url: '/xeros/{xero}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
update738e2cfe8594046426c6760fd149f277.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update738e2cfe8594046426c6760fd149f277.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
update738e2cfe8594046426c6760fd149f277.put = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::update
* @see Modules/Xero/app/Http/Controllers/XeroController.php:50
* @route '/xeros/{xero}'
*/
update738e2cfe8594046426c6760fd149f277.patch = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'patch',
})

export const update = {
    '/api/v1/xeros/{xero}': updated454a860a046aa94d3c9d3bdcdd01a2d,
    '/xeros/{xero}': update738e2cfe8594046426c6760fd149f277,
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/api/v1/xeros/{xero}'
*/
const destroyd454a860a046aa94d3c9d3bdcdd01a2d = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyd454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'delete',
})

destroyd454a860a046aa94d3c9d3bdcdd01a2d.definition = {
    methods: ["delete"],
    url: '/api/v1/xeros/{xero}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/api/v1/xeros/{xero}'
*/
destroyd454a860a046aa94d3c9d3bdcdd01a2d.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyd454a860a046aa94d3c9d3bdcdd01a2d.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/api/v1/xeros/{xero}'
*/
destroyd454a860a046aa94d3c9d3bdcdd01a2d.delete = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyd454a860a046aa94d3c9d3bdcdd01a2d.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/xeros/{xero}'
*/
const destroy738e2cfe8594046426c6760fd149f277 = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'delete',
})

destroy738e2cfe8594046426c6760fd149f277.definition = {
    methods: ["delete"],
    url: '/xeros/{xero}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/xeros/{xero}'
*/
destroy738e2cfe8594046426c6760fd149f277.url = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy738e2cfe8594046426c6760fd149f277.definition.url
            .replace('{xero}', parsedArgs.xero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroController::destroy
* @see Modules/Xero/app/Http/Controllers/XeroController.php:55
* @route '/xeros/{xero}'
*/
destroy738e2cfe8594046426c6760fd149f277.delete = (args: { xero: string | number } | [xero: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy738e2cfe8594046426c6760fd149f277.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/api/v1/xeros/{xero}': destroyd454a860a046aa94d3c9d3bdcdd01a2d,
    '/xeros/{xero}': destroy738e2cfe8594046426c6760fd149f277,
}

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

const XeroController = { index, store, show, update, destroy, create, edit }

export default XeroController