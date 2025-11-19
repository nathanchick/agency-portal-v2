import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
const index64b02d782cdf70a0aa086c4fefffcb01 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index64b02d782cdf70a0aa086c4fefffcb01.url(options),
    method: 'get',
})

index64b02d782cdf70a0aa086c4fefffcb01.definition = {
    methods: ["get","head"],
    url: '/api/v1/sansecs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
index64b02d782cdf70a0aa086c4fefffcb01.url = (options?: RouteQueryOptions) => {
    return index64b02d782cdf70a0aa086c4fefffcb01.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
index64b02d782cdf70a0aa086c4fefffcb01.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index64b02d782cdf70a0aa086c4fefffcb01.url(options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/api/v1/sansecs'
*/
index64b02d782cdf70a0aa086c4fefffcb01.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index64b02d782cdf70a0aa086c4fefffcb01.url(options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
const index9b44562c85e52ddb925783c76ac28146 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9b44562c85e52ddb925783c76ac28146.url(options),
    method: 'get',
})

index9b44562c85e52ddb925783c76ac28146.definition = {
    methods: ["get","head"],
    url: '/sansecs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
index9b44562c85e52ddb925783c76ac28146.url = (options?: RouteQueryOptions) => {
    return index9b44562c85e52ddb925783c76ac28146.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
index9b44562c85e52ddb925783c76ac28146.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9b44562c85e52ddb925783c76ac28146.url(options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::index
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:13
* @route '/sansecs'
*/
index9b44562c85e52ddb925783c76ac28146.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index9b44562c85e52ddb925783c76ac28146.url(options),
    method: 'head',
})

export const index = {
    '/api/v1/sansecs': index64b02d782cdf70a0aa086c4fefffcb01,
    '/sansecs': index9b44562c85e52ddb925783c76ac28146,
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
const store64b02d782cdf70a0aa086c4fefffcb01 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store64b02d782cdf70a0aa086c4fefffcb01.url(options),
    method: 'post',
})

store64b02d782cdf70a0aa086c4fefffcb01.definition = {
    methods: ["post"],
    url: '/api/v1/sansecs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
store64b02d782cdf70a0aa086c4fefffcb01.url = (options?: RouteQueryOptions) => {
    return store64b02d782cdf70a0aa086c4fefffcb01.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/api/v1/sansecs'
*/
store64b02d782cdf70a0aa086c4fefffcb01.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store64b02d782cdf70a0aa086c4fefffcb01.url(options),
    method: 'post',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/sansecs'
*/
const store9b44562c85e52ddb925783c76ac28146 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9b44562c85e52ddb925783c76ac28146.url(options),
    method: 'post',
})

store9b44562c85e52ddb925783c76ac28146.definition = {
    methods: ["post"],
    url: '/sansecs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/sansecs'
*/
store9b44562c85e52ddb925783c76ac28146.url = (options?: RouteQueryOptions) => {
    return store9b44562c85e52ddb925783c76ac28146.definition.url + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::store
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:29
* @route '/sansecs'
*/
store9b44562c85e52ddb925783c76ac28146.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9b44562c85e52ddb925783c76ac28146.url(options),
    method: 'post',
})

export const store = {
    '/api/v1/sansecs': store64b02d782cdf70a0aa086c4fefffcb01,
    '/sansecs': store9b44562c85e52ddb925783c76ac28146,
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
const show4ac092ae2ed3360544fa4251bb4c3950 = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'get',
})

show4ac092ae2ed3360544fa4251bb4c3950.definition = {
    methods: ["get","head"],
    url: '/api/v1/sansecs/{sansec}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
show4ac092ae2ed3360544fa4251bb4c3950.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show4ac092ae2ed3360544fa4251bb4c3950.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
show4ac092ae2ed3360544fa4251bb4c3950.get = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/api/v1/sansecs/{sansec}'
*/
show4ac092ae2ed3360544fa4251bb4c3950.head = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
const showb129a39a9ec294f0c5769b168de9a312 = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'get',
})

showb129a39a9ec294f0c5769b168de9a312.definition = {
    methods: ["get","head"],
    url: '/sansecs/{sansec}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
showb129a39a9ec294f0c5769b168de9a312.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showb129a39a9ec294f0c5769b168de9a312.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
showb129a39a9ec294f0c5769b168de9a312.get = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::show
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:34
* @route '/sansecs/{sansec}'
*/
showb129a39a9ec294f0c5769b168de9a312.head = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'head',
})

export const show = {
    '/api/v1/sansecs/{sansec}': show4ac092ae2ed3360544fa4251bb4c3950,
    '/sansecs/{sansec}': showb129a39a9ec294f0c5769b168de9a312,
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
const update4ac092ae2ed3360544fa4251bb4c3950 = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'put',
})

update4ac092ae2ed3360544fa4251bb4c3950.definition = {
    methods: ["put","patch"],
    url: '/api/v1/sansecs/{sansec}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
update4ac092ae2ed3360544fa4251bb4c3950.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update4ac092ae2ed3360544fa4251bb4c3950.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
update4ac092ae2ed3360544fa4251bb4c3950.put = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/api/v1/sansecs/{sansec}'
*/
update4ac092ae2ed3360544fa4251bb4c3950.patch = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
const updateb129a39a9ec294f0c5769b168de9a312 = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'put',
})

updateb129a39a9ec294f0c5769b168de9a312.definition = {
    methods: ["put","patch"],
    url: '/sansecs/{sansec}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
updateb129a39a9ec294f0c5769b168de9a312.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateb129a39a9ec294f0c5769b168de9a312.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
updateb129a39a9ec294f0c5769b168de9a312.put = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::update
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:50
* @route '/sansecs/{sansec}'
*/
updateb129a39a9ec294f0c5769b168de9a312.patch = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'patch',
})

export const update = {
    '/api/v1/sansecs/{sansec}': update4ac092ae2ed3360544fa4251bb4c3950,
    '/sansecs/{sansec}': updateb129a39a9ec294f0c5769b168de9a312,
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
const destroy4ac092ae2ed3360544fa4251bb4c3950 = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'delete',
})

destroy4ac092ae2ed3360544fa4251bb4c3950.definition = {
    methods: ["delete"],
    url: '/api/v1/sansecs/{sansec}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
destroy4ac092ae2ed3360544fa4251bb4c3950.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy4ac092ae2ed3360544fa4251bb4c3950.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/api/v1/sansecs/{sansec}'
*/
destroy4ac092ae2ed3360544fa4251bb4c3950.delete = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4ac092ae2ed3360544fa4251bb4c3950.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/sansecs/{sansec}'
*/
const destroyb129a39a9ec294f0c5769b168de9a312 = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'delete',
})

destroyb129a39a9ec294f0c5769b168de9a312.definition = {
    methods: ["delete"],
    url: '/sansecs/{sansec}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/sansecs/{sansec}'
*/
destroyb129a39a9ec294f0c5769b168de9a312.url = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyb129a39a9ec294f0c5769b168de9a312.definition.url
            .replace('{sansec}', parsedArgs.sansec.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Sansec\Http\Controllers\SansecController::destroy
* @see Modules/Sansec/app/Http/Controllers/SansecController.php:55
* @route '/sansecs/{sansec}'
*/
destroyb129a39a9ec294f0c5769b168de9a312.delete = (args: { sansec: string | number } | [sansec: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb129a39a9ec294f0c5769b168de9a312.url(args, options),
    method: 'delete',
})

export const destroy = {
    '/api/v1/sansecs/{sansec}': destroy4ac092ae2ed3360544fa4251bb4c3950,
    '/sansecs/{sansec}': destroyb129a39a9ec294f0c5769b168de9a312,
}

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

const SansecController = { index, store, show, update, destroy, create, edit }

export default SansecController