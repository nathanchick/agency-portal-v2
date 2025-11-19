import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
const indexa2093136c1f0062d0bc1a24cbb587c8a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'get',
})

indexa2093136c1f0062d0bc1a24cbb587c8a.definition = {
    methods: ["get","head"],
    url: '/api/v1/clickups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
indexa2093136c1f0062d0bc1a24cbb587c8a.url = (options?: RouteQueryOptions) => {
    return indexa2093136c1f0062d0bc1a24cbb587c8a.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
indexa2093136c1f0062d0bc1a24cbb587c8a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
indexa2093136c1f0062d0bc1a24cbb587c8a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
const indexa2093136c1f0062d0bc1a24cbb587c8aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
indexa2093136c1f0062d0bc1a24cbb587c8aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/api/v1/clickups'
*/
indexa2093136c1f0062d0bc1a24cbb587c8aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa2093136c1f0062d0bc1a24cbb587c8a.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexa2093136c1f0062d0bc1a24cbb587c8a.form = indexa2093136c1f0062d0bc1a24cbb587c8aForm
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
const indexd21479f920ae30b826272373a48d7e6a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd21479f920ae30b826272373a48d7e6a.url(options),
    method: 'get',
})

indexd21479f920ae30b826272373a48d7e6a.definition = {
    methods: ["get","head"],
    url: '/clickups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
indexd21479f920ae30b826272373a48d7e6a.url = (options?: RouteQueryOptions) => {
    return indexd21479f920ae30b826272373a48d7e6a.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
indexd21479f920ae30b826272373a48d7e6a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd21479f920ae30b826272373a48d7e6a.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
indexd21479f920ae30b826272373a48d7e6a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd21479f920ae30b826272373a48d7e6a.url(options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
const indexd21479f920ae30b826272373a48d7e6aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd21479f920ae30b826272373a48d7e6a.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
indexd21479f920ae30b826272373a48d7e6aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd21479f920ae30b826272373a48d7e6a.url(options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::index
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:13
* @route '/clickups'
*/
indexd21479f920ae30b826272373a48d7e6aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd21479f920ae30b826272373a48d7e6a.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexd21479f920ae30b826272373a48d7e6a.form = indexd21479f920ae30b826272373a48d7e6aForm

export const index = {
    '/api/v1/clickups': indexa2093136c1f0062d0bc1a24cbb587c8a,
    '/clickups': indexd21479f920ae30b826272373a48d7e6a,
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
const storea2093136c1f0062d0bc1a24cbb587c8a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'post',
})

storea2093136c1f0062d0bc1a24cbb587c8a.definition = {
    methods: ["post"],
    url: '/api/v1/clickups',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
storea2093136c1f0062d0bc1a24cbb587c8a.url = (options?: RouteQueryOptions) => {
    return storea2093136c1f0062d0bc1a24cbb587c8a.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
storea2093136c1f0062d0bc1a24cbb587c8a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
const storea2093136c1f0062d0bc1a24cbb587c8aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/api/v1/clickups'
*/
storea2093136c1f0062d0bc1a24cbb587c8aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea2093136c1f0062d0bc1a24cbb587c8a.url(options),
    method: 'post',
})

storea2093136c1f0062d0bc1a24cbb587c8a.form = storea2093136c1f0062d0bc1a24cbb587c8aForm
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
const stored21479f920ae30b826272373a48d7e6a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored21479f920ae30b826272373a48d7e6a.url(options),
    method: 'post',
})

stored21479f920ae30b826272373a48d7e6a.definition = {
    methods: ["post"],
    url: '/clickups',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
stored21479f920ae30b826272373a48d7e6a.url = (options?: RouteQueryOptions) => {
    return stored21479f920ae30b826272373a48d7e6a.definition.url + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
stored21479f920ae30b826272373a48d7e6a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored21479f920ae30b826272373a48d7e6a.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
const stored21479f920ae30b826272373a48d7e6aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stored21479f920ae30b826272373a48d7e6a.url(options),
    method: 'post',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::store
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:29
* @route '/clickups'
*/
stored21479f920ae30b826272373a48d7e6aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stored21479f920ae30b826272373a48d7e6a.url(options),
    method: 'post',
})

stored21479f920ae30b826272373a48d7e6a.form = stored21479f920ae30b826272373a48d7e6aForm

export const store = {
    '/api/v1/clickups': storea2093136c1f0062d0bc1a24cbb587c8a,
    '/clickups': stored21479f920ae30b826272373a48d7e6a,
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
const show7109f5bbad21bdba550d971173418357 = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'get',
})

show7109f5bbad21bdba550d971173418357.definition = {
    methods: ["get","head"],
    url: '/api/v1/clickups/{clickup}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show7109f5bbad21bdba550d971173418357.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show7109f5bbad21bdba550d971173418357.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show7109f5bbad21bdba550d971173418357.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show7109f5bbad21bdba550d971173418357.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
const show7109f5bbad21bdba550d971173418357Form = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show7109f5bbad21bdba550d971173418357Form.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/api/v1/clickups/{clickup}'
*/
show7109f5bbad21bdba550d971173418357Form.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7109f5bbad21bdba550d971173418357.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show7109f5bbad21bdba550d971173418357.form = show7109f5bbad21bdba550d971173418357Form
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
const show2dbd658b8b7a4686b20fc7442881f90b = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'get',
})

show2dbd658b8b7a4686b20fc7442881f90b.definition = {
    methods: ["get","head"],
    url: '/clickups/{clickup}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show2dbd658b8b7a4686b20fc7442881f90b.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show2dbd658b8b7a4686b20fc7442881f90b.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show2dbd658b8b7a4686b20fc7442881f90b.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show2dbd658b8b7a4686b20fc7442881f90b.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
const show2dbd658b8b7a4686b20fc7442881f90bForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show2dbd658b8b7a4686b20fc7442881f90bForm.get = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::show
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:34
* @route '/clickups/{clickup}'
*/
show2dbd658b8b7a4686b20fc7442881f90bForm.head = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2dbd658b8b7a4686b20fc7442881f90b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show2dbd658b8b7a4686b20fc7442881f90b.form = show2dbd658b8b7a4686b20fc7442881f90bForm

export const show = {
    '/api/v1/clickups/{clickup}': show7109f5bbad21bdba550d971173418357,
    '/clickups/{clickup}': show2dbd658b8b7a4686b20fc7442881f90b,
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
const update7109f5bbad21bdba550d971173418357 = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'put',
})

update7109f5bbad21bdba550d971173418357.definition = {
    methods: ["put","patch"],
    url: '/api/v1/clickups/{clickup}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
update7109f5bbad21bdba550d971173418357.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update7109f5bbad21bdba550d971173418357.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
update7109f5bbad21bdba550d971173418357.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
update7109f5bbad21bdba550d971173418357.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/api/v1/clickups/{clickup}'
*/
const update7109f5bbad21bdba550d971173418357Form = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update7109f5bbad21bdba550d971173418357.url(args, {
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
* @route '/api/v1/clickups/{clickup}'
*/
update7109f5bbad21bdba550d971173418357Form.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update7109f5bbad21bdba550d971173418357.url(args, {
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
* @route '/api/v1/clickups/{clickup}'
*/
update7109f5bbad21bdba550d971173418357Form.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update7109f5bbad21bdba550d971173418357.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update7109f5bbad21bdba550d971173418357.form = update7109f5bbad21bdba550d971173418357Form
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
const update2dbd658b8b7a4686b20fc7442881f90b = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'put',
})

update2dbd658b8b7a4686b20fc7442881f90b.definition = {
    methods: ["put","patch"],
    url: '/clickups/{clickup}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
update2dbd658b8b7a4686b20fc7442881f90b.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update2dbd658b8b7a4686b20fc7442881f90b.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
update2dbd658b8b7a4686b20fc7442881f90b.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
update2dbd658b8b7a4686b20fc7442881f90b.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::update
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:50
* @route '/clickups/{clickup}'
*/
const update2dbd658b8b7a4686b20fc7442881f90bForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2dbd658b8b7a4686b20fc7442881f90b.url(args, {
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
update2dbd658b8b7a4686b20fc7442881f90bForm.put = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2dbd658b8b7a4686b20fc7442881f90b.url(args, {
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
update2dbd658b8b7a4686b20fc7442881f90bForm.patch = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2dbd658b8b7a4686b20fc7442881f90b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update2dbd658b8b7a4686b20fc7442881f90b.form = update2dbd658b8b7a4686b20fc7442881f90bForm

export const update = {
    '/api/v1/clickups/{clickup}': update7109f5bbad21bdba550d971173418357,
    '/clickups/{clickup}': update2dbd658b8b7a4686b20fc7442881f90b,
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
const destroy7109f5bbad21bdba550d971173418357 = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'delete',
})

destroy7109f5bbad21bdba550d971173418357.definition = {
    methods: ["delete"],
    url: '/api/v1/clickups/{clickup}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
destroy7109f5bbad21bdba550d971173418357.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy7109f5bbad21bdba550d971173418357.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
destroy7109f5bbad21bdba550d971173418357.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7109f5bbad21bdba550d971173418357.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/api/v1/clickups/{clickup}'
*/
const destroy7109f5bbad21bdba550d971173418357Form = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy7109f5bbad21bdba550d971173418357.url(args, {
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
* @route '/api/v1/clickups/{clickup}'
*/
destroy7109f5bbad21bdba550d971173418357Form.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy7109f5bbad21bdba550d971173418357.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy7109f5bbad21bdba550d971173418357.form = destroy7109f5bbad21bdba550d971173418357Form
/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
const destroy2dbd658b8b7a4686b20fc7442881f90b = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'delete',
})

destroy2dbd658b8b7a4686b20fc7442881f90b.definition = {
    methods: ["delete"],
    url: '/clickups/{clickup}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
destroy2dbd658b8b7a4686b20fc7442881f90b.url = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy2dbd658b8b7a4686b20fc7442881f90b.definition.url
            .replace('{clickup}', parsedArgs.clickup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
destroy2dbd658b8b7a4686b20fc7442881f90b.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy2dbd658b8b7a4686b20fc7442881f90b.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Clickup\Http\Controllers\ClickupController::destroy
* @see Modules/Clickup/app/Http/Controllers/ClickupController.php:55
* @route '/clickups/{clickup}'
*/
const destroy2dbd658b8b7a4686b20fc7442881f90bForm = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy2dbd658b8b7a4686b20fc7442881f90b.url(args, {
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
destroy2dbd658b8b7a4686b20fc7442881f90bForm.delete = (args: { clickup: string | number } | [clickup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy2dbd658b8b7a4686b20fc7442881f90b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy2dbd658b8b7a4686b20fc7442881f90b.form = destroy2dbd658b8b7a4686b20fc7442881f90bForm

export const destroy = {
    '/api/v1/clickups/{clickup}': destroy7109f5bbad21bdba550d971173418357,
    '/clickups/{clickup}': destroy2dbd658b8b7a4686b20fc7442881f90b,
}

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

const ClickupController = { index, store, show, update, destroy, create, edit }

export default ClickupController