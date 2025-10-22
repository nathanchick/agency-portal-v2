import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/api/v1/ohdears'
*/
const indexce8b86abdab2828f4a034a8973abfdf7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexce8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'get',
})

indexce8b86abdab2828f4a034a8973abfdf7.definition = {
    methods: ["get","head"],
    url: '/api/v1/ohdears',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/api/v1/ohdears'
*/
indexce8b86abdab2828f4a034a8973abfdf7.url = (options?: RouteQueryOptions) => {
    return indexce8b86abdab2828f4a034a8973abfdf7.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/api/v1/ohdears'
*/
indexce8b86abdab2828f4a034a8973abfdf7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexce8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/api/v1/ohdears'
*/
indexce8b86abdab2828f4a034a8973abfdf7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexce8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/api/v1/ohdears'
*/
const indexce8b86abdab2828f4a034a8973abfdf7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexce8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/api/v1/ohdears'
*/
indexce8b86abdab2828f4a034a8973abfdf7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexce8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/api/v1/ohdears'
*/
indexce8b86abdab2828f4a034a8973abfdf7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexce8b86abdab2828f4a034a8973abfdf7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexce8b86abdab2828f4a034a8973abfdf7.form = indexce8b86abdab2828f4a034a8973abfdf7Form
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
const index8ef0b669daadf03f3bd9c3483f80fe04 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'get',
})

index8ef0b669daadf03f3bd9c3483f80fe04.definition = {
    methods: ["get","head"],
    url: '/ohdears',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index8ef0b669daadf03f3bd9c3483f80fe04.url = (options?: RouteQueryOptions) => {
    return index8ef0b669daadf03f3bd9c3483f80fe04.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index8ef0b669daadf03f3bd9c3483f80fe04.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index8ef0b669daadf03f3bd9c3483f80fe04.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
const index8ef0b669daadf03f3bd9c3483f80fe04Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index8ef0b669daadf03f3bd9c3483f80fe04Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::index
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:13
* @route '/ohdears'
*/
index8ef0b669daadf03f3bd9c3483f80fe04Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8ef0b669daadf03f3bd9c3483f80fe04.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index8ef0b669daadf03f3bd9c3483f80fe04.form = index8ef0b669daadf03f3bd9c3483f80fe04Form

export const index = {
    '/api/v1/ohdears': indexce8b86abdab2828f4a034a8973abfdf7,
    '/ohdears': index8ef0b669daadf03f3bd9c3483f80fe04,
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/api/v1/ohdears'
*/
const storece8b86abdab2828f4a034a8973abfdf7 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storece8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'post',
})

storece8b86abdab2828f4a034a8973abfdf7.definition = {
    methods: ["post"],
    url: '/api/v1/ohdears',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/api/v1/ohdears'
*/
storece8b86abdab2828f4a034a8973abfdf7.url = (options?: RouteQueryOptions) => {
    return storece8b86abdab2828f4a034a8973abfdf7.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/api/v1/ohdears'
*/
storece8b86abdab2828f4a034a8973abfdf7.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storece8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/api/v1/ohdears'
*/
const storece8b86abdab2828f4a034a8973abfdf7Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storece8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/api/v1/ohdears'
*/
storece8b86abdab2828f4a034a8973abfdf7Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storece8b86abdab2828f4a034a8973abfdf7.url(options),
    method: 'post',
})

storece8b86abdab2828f4a034a8973abfdf7.form = storece8b86abdab2828f4a034a8973abfdf7Form
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
const store8ef0b669daadf03f3bd9c3483f80fe04 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'post',
})

store8ef0b669daadf03f3bd9c3483f80fe04.definition = {
    methods: ["post"],
    url: '/ohdears',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
store8ef0b669daadf03f3bd9c3483f80fe04.url = (options?: RouteQueryOptions) => {
    return store8ef0b669daadf03f3bd9c3483f80fe04.definition.url + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
store8ef0b669daadf03f3bd9c3483f80fe04.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
const store8ef0b669daadf03f3bd9c3483f80fe04Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::store
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:29
* @route '/ohdears'
*/
store8ef0b669daadf03f3bd9c3483f80fe04Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store8ef0b669daadf03f3bd9c3483f80fe04.url(options),
    method: 'post',
})

store8ef0b669daadf03f3bd9c3483f80fe04.form = store8ef0b669daadf03f3bd9c3483f80fe04Form

export const store = {
    '/api/v1/ohdears': storece8b86abdab2828f4a034a8973abfdf7,
    '/ohdears': store8ef0b669daadf03f3bd9c3483f80fe04,
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/api/v1/ohdears/{ohdear}'
*/
const show45935be1ff904bca902b9f1b41d71d5f = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'get',
})

show45935be1ff904bca902b9f1b41d71d5f.definition = {
    methods: ["get","head"],
    url: '/api/v1/ohdears/{ohdear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/api/v1/ohdears/{ohdear}'
*/
show45935be1ff904bca902b9f1b41d71d5f.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show45935be1ff904bca902b9f1b41d71d5f.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/api/v1/ohdears/{ohdear}'
*/
show45935be1ff904bca902b9f1b41d71d5f.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/api/v1/ohdears/{ohdear}'
*/
show45935be1ff904bca902b9f1b41d71d5f.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/api/v1/ohdears/{ohdear}'
*/
const show45935be1ff904bca902b9f1b41d71d5fForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/api/v1/ohdears/{ohdear}'
*/
show45935be1ff904bca902b9f1b41d71d5fForm.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/api/v1/ohdears/{ohdear}'
*/
show45935be1ff904bca902b9f1b41d71d5fForm.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show45935be1ff904bca902b9f1b41d71d5f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show45935be1ff904bca902b9f1b41d71d5f.form = show45935be1ff904bca902b9f1b41d71d5fForm
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
const show1ec37c116ff90c607d4e59ae86181f26 = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'get',
})

show1ec37c116ff90c607d4e59ae86181f26.definition = {
    methods: ["get","head"],
    url: '/ohdears/{ohdear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show1ec37c116ff90c607d4e59ae86181f26.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show1ec37c116ff90c607d4e59ae86181f26.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show1ec37c116ff90c607d4e59ae86181f26.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show1ec37c116ff90c607d4e59ae86181f26.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
const show1ec37c116ff90c607d4e59ae86181f26Form = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show1ec37c116ff90c607d4e59ae86181f26Form.get = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::show
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:34
* @route '/ohdears/{ohdear}'
*/
show1ec37c116ff90c607d4e59ae86181f26Form.head = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1ec37c116ff90c607d4e59ae86181f26.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show1ec37c116ff90c607d4e59ae86181f26.form = show1ec37c116ff90c607d4e59ae86181f26Form

export const show = {
    '/api/v1/ohdears/{ohdear}': show45935be1ff904bca902b9f1b41d71d5f,
    '/ohdears/{ohdear}': show1ec37c116ff90c607d4e59ae86181f26,
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/api/v1/ohdears/{ohdear}'
*/
const update45935be1ff904bca902b9f1b41d71d5f = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'put',
})

update45935be1ff904bca902b9f1b41d71d5f.definition = {
    methods: ["put","patch"],
    url: '/api/v1/ohdears/{ohdear}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/api/v1/ohdears/{ohdear}'
*/
update45935be1ff904bca902b9f1b41d71d5f.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update45935be1ff904bca902b9f1b41d71d5f.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/api/v1/ohdears/{ohdear}'
*/
update45935be1ff904bca902b9f1b41d71d5f.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/api/v1/ohdears/{ohdear}'
*/
update45935be1ff904bca902b9f1b41d71d5f.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/api/v1/ohdears/{ohdear}'
*/
const update45935be1ff904bca902b9f1b41d71d5fForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update45935be1ff904bca902b9f1b41d71d5f.url(args, {
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
* @route '/api/v1/ohdears/{ohdear}'
*/
update45935be1ff904bca902b9f1b41d71d5fForm.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update45935be1ff904bca902b9f1b41d71d5f.url(args, {
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
* @route '/api/v1/ohdears/{ohdear}'
*/
update45935be1ff904bca902b9f1b41d71d5fForm.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update45935be1ff904bca902b9f1b41d71d5f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update45935be1ff904bca902b9f1b41d71d5f.form = update45935be1ff904bca902b9f1b41d71d5fForm
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
const update1ec37c116ff90c607d4e59ae86181f26 = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'put',
})

update1ec37c116ff90c607d4e59ae86181f26.definition = {
    methods: ["put","patch"],
    url: '/ohdears/{ohdear}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
update1ec37c116ff90c607d4e59ae86181f26.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update1ec37c116ff90c607d4e59ae86181f26.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
update1ec37c116ff90c607d4e59ae86181f26.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
update1ec37c116ff90c607d4e59ae86181f26.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::update
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:50
* @route '/ohdears/{ohdear}'
*/
const update1ec37c116ff90c607d4e59ae86181f26Form = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1ec37c116ff90c607d4e59ae86181f26.url(args, {
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
update1ec37c116ff90c607d4e59ae86181f26Form.put = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1ec37c116ff90c607d4e59ae86181f26.url(args, {
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
update1ec37c116ff90c607d4e59ae86181f26Form.patch = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1ec37c116ff90c607d4e59ae86181f26.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update1ec37c116ff90c607d4e59ae86181f26.form = update1ec37c116ff90c607d4e59ae86181f26Form

export const update = {
    '/api/v1/ohdears/{ohdear}': update45935be1ff904bca902b9f1b41d71d5f,
    '/ohdears/{ohdear}': update1ec37c116ff90c607d4e59ae86181f26,
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/api/v1/ohdears/{ohdear}'
*/
const destroy45935be1ff904bca902b9f1b41d71d5f = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'delete',
})

destroy45935be1ff904bca902b9f1b41d71d5f.definition = {
    methods: ["delete"],
    url: '/api/v1/ohdears/{ohdear}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/api/v1/ohdears/{ohdear}'
*/
destroy45935be1ff904bca902b9f1b41d71d5f.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy45935be1ff904bca902b9f1b41d71d5f.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/api/v1/ohdears/{ohdear}'
*/
destroy45935be1ff904bca902b9f1b41d71d5f.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy45935be1ff904bca902b9f1b41d71d5f.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/api/v1/ohdears/{ohdear}'
*/
const destroy45935be1ff904bca902b9f1b41d71d5fForm = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy45935be1ff904bca902b9f1b41d71d5f.url(args, {
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
* @route '/api/v1/ohdears/{ohdear}'
*/
destroy45935be1ff904bca902b9f1b41d71d5fForm.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy45935be1ff904bca902b9f1b41d71d5f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy45935be1ff904bca902b9f1b41d71d5f.form = destroy45935be1ff904bca902b9f1b41d71d5fForm
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
const destroy1ec37c116ff90c607d4e59ae86181f26 = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'delete',
})

destroy1ec37c116ff90c607d4e59ae86181f26.definition = {
    methods: ["delete"],
    url: '/ohdears/{ohdear}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
destroy1ec37c116ff90c607d4e59ae86181f26.url = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy1ec37c116ff90c607d4e59ae86181f26.definition.url
            .replace('{ohdear}', parsedArgs.ohdear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
destroy1ec37c116ff90c607d4e59ae86181f26.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1ec37c116ff90c607d4e59ae86181f26.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::destroy
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:55
* @route '/ohdears/{ohdear}'
*/
const destroy1ec37c116ff90c607d4e59ae86181f26Form = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy1ec37c116ff90c607d4e59ae86181f26.url(args, {
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
destroy1ec37c116ff90c607d4e59ae86181f26Form.delete = (args: { ohdear: string | number } | [ohdear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy1ec37c116ff90c607d4e59ae86181f26.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy1ec37c116ff90c607d4e59ae86181f26.form = destroy1ec37c116ff90c607d4e59ae86181f26Form

export const destroy = {
    '/api/v1/ohdears/{ohdear}': destroy45935be1ff904bca902b9f1b41d71d5f,
    '/ohdears/{ohdear}': destroy1ec37c116ff90c607d4e59ae86181f26,
}

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

const OhdearController = { index, store, show, update, destroy, create, edit }

export default OhdearController