import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
const index4d685da6f41d9553ad7286a665b7e26d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'get',
})

index4d685da6f41d9553ad7286a665b7e26d.definition = {
    methods: ["get","head"],
    url: '/api/v1/freshdesks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index4d685da6f41d9553ad7286a665b7e26d.url = (options?: RouteQueryOptions) => {
    return index4d685da6f41d9553ad7286a665b7e26d.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index4d685da6f41d9553ad7286a665b7e26d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index4d685da6f41d9553ad7286a665b7e26d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
const index4d685da6f41d9553ad7286a665b7e26dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index4d685da6f41d9553ad7286a665b7e26dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/api/v1/freshdesks'
*/
index4d685da6f41d9553ad7286a665b7e26dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d685da6f41d9553ad7286a665b7e26d.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index4d685da6f41d9553ad7286a665b7e26d.form = index4d685da6f41d9553ad7286a665b7e26dForm
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
const indexd8ce8aac60ffff090a4ca2e3c29e5ab6 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'get',
})

indexd8ce8aac60ffff090a4ca2e3c29e5ab6.definition = {
    methods: ["get","head"],
    url: '/freshdesks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
indexd8ce8aac60ffff090a4ca2e3c29e5ab6.url = (options?: RouteQueryOptions) => {
    return indexd8ce8aac60ffff090a4ca2e3c29e5ab6.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
indexd8ce8aac60ffff090a4ca2e3c29e5ab6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
indexd8ce8aac60ffff090a4ca2e3c29e5ab6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
const indexd8ce8aac60ffff090a4ca2e3c29e5ab6Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
indexd8ce8aac60ffff090a4ca2e3c29e5ab6Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::index
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:13
* @route '/freshdesks'
*/
indexd8ce8aac60ffff090a4ca2e3c29e5ab6Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexd8ce8aac60ffff090a4ca2e3c29e5ab6.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexd8ce8aac60ffff090a4ca2e3c29e5ab6.form = indexd8ce8aac60ffff090a4ca2e3c29e5ab6Form

export const index = {
    '/api/v1/freshdesks': index4d685da6f41d9553ad7286a665b7e26d,
    '/freshdesks': indexd8ce8aac60ffff090a4ca2e3c29e5ab6,
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
const store4d685da6f41d9553ad7286a665b7e26d = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'post',
})

store4d685da6f41d9553ad7286a665b7e26d.definition = {
    methods: ["post"],
    url: '/api/v1/freshdesks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
store4d685da6f41d9553ad7286a665b7e26d.url = (options?: RouteQueryOptions) => {
    return store4d685da6f41d9553ad7286a665b7e26d.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
store4d685da6f41d9553ad7286a665b7e26d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
const store4d685da6f41d9553ad7286a665b7e26dForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/api/v1/freshdesks'
*/
store4d685da6f41d9553ad7286a665b7e26dForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store4d685da6f41d9553ad7286a665b7e26d.url(options),
    method: 'post',
})

store4d685da6f41d9553ad7286a665b7e26d.form = store4d685da6f41d9553ad7286a665b7e26dForm
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
const stored8ce8aac60ffff090a4ca2e3c29e5ab6 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'post',
})

stored8ce8aac60ffff090a4ca2e3c29e5ab6.definition = {
    methods: ["post"],
    url: '/freshdesks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
stored8ce8aac60ffff090a4ca2e3c29e5ab6.url = (options?: RouteQueryOptions) => {
    return stored8ce8aac60ffff090a4ca2e3c29e5ab6.definition.url + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
stored8ce8aac60ffff090a4ca2e3c29e5ab6.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
const stored8ce8aac60ffff090a4ca2e3c29e5ab6Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stored8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'post',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::store
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:29
* @route '/freshdesks'
*/
stored8ce8aac60ffff090a4ca2e3c29e5ab6Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stored8ce8aac60ffff090a4ca2e3c29e5ab6.url(options),
    method: 'post',
})

stored8ce8aac60ffff090a4ca2e3c29e5ab6.form = stored8ce8aac60ffff090a4ca2e3c29e5ab6Form

export const store = {
    '/api/v1/freshdesks': store4d685da6f41d9553ad7286a665b7e26d,
    '/freshdesks': stored8ce8aac60ffff090a4ca2e3c29e5ab6,
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const show8e2f6ef127af5fed2820e44584ed157e = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'get',
})

show8e2f6ef127af5fed2820e44584ed157e.definition = {
    methods: ["get","head"],
    url: '/api/v1/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show8e2f6ef127af5fed2820e44584ed157e.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show8e2f6ef127af5fed2820e44584ed157e.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show8e2f6ef127af5fed2820e44584ed157e.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show8e2f6ef127af5fed2820e44584ed157e.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const show8e2f6ef127af5fed2820e44584ed157eForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show8e2f6ef127af5fed2820e44584ed157eForm.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/api/v1/freshdesks/{freshdesk}'
*/
show8e2f6ef127af5fed2820e44584ed157eForm.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8e2f6ef127af5fed2820e44584ed157e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show8e2f6ef127af5fed2820e44584ed157e.form = show8e2f6ef127af5fed2820e44584ed157eForm
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
const show7f6b73a3716ef2338042f82aa3902e71 = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'get',
})

show7f6b73a3716ef2338042f82aa3902e71.definition = {
    methods: ["get","head"],
    url: '/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show7f6b73a3716ef2338042f82aa3902e71.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show7f6b73a3716ef2338042f82aa3902e71.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show7f6b73a3716ef2338042f82aa3902e71.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show7f6b73a3716ef2338042f82aa3902e71.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
const show7f6b73a3716ef2338042f82aa3902e71Form = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show7f6b73a3716ef2338042f82aa3902e71Form.get = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::show
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:34
* @route '/freshdesks/{freshdesk}'
*/
show7f6b73a3716ef2338042f82aa3902e71Form.head = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show7f6b73a3716ef2338042f82aa3902e71.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show7f6b73a3716ef2338042f82aa3902e71.form = show7f6b73a3716ef2338042f82aa3902e71Form

export const show = {
    '/api/v1/freshdesks/{freshdesk}': show8e2f6ef127af5fed2820e44584ed157e,
    '/freshdesks/{freshdesk}': show7f6b73a3716ef2338042f82aa3902e71,
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const update8e2f6ef127af5fed2820e44584ed157e = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'put',
})

update8e2f6ef127af5fed2820e44584ed157e.definition = {
    methods: ["put","patch"],
    url: '/api/v1/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update8e2f6ef127af5fed2820e44584ed157e.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update8e2f6ef127af5fed2820e44584ed157e.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update8e2f6ef127af5fed2820e44584ed157e.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update8e2f6ef127af5fed2820e44584ed157e.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const update8e2f6ef127af5fed2820e44584ed157eForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8e2f6ef127af5fed2820e44584ed157e.url(args, {
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
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update8e2f6ef127af5fed2820e44584ed157eForm.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8e2f6ef127af5fed2820e44584ed157e.url(args, {
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
* @route '/api/v1/freshdesks/{freshdesk}'
*/
update8e2f6ef127af5fed2820e44584ed157eForm.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8e2f6ef127af5fed2820e44584ed157e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update8e2f6ef127af5fed2820e44584ed157e.form = update8e2f6ef127af5fed2820e44584ed157eForm
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
const update7f6b73a3716ef2338042f82aa3902e71 = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'put',
})

update7f6b73a3716ef2338042f82aa3902e71.definition = {
    methods: ["put","patch"],
    url: '/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
update7f6b73a3716ef2338042f82aa3902e71.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update7f6b73a3716ef2338042f82aa3902e71.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
update7f6b73a3716ef2338042f82aa3902e71.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
update7f6b73a3716ef2338042f82aa3902e71.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::update
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:50
* @route '/freshdesks/{freshdesk}'
*/
const update7f6b73a3716ef2338042f82aa3902e71Form = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update7f6b73a3716ef2338042f82aa3902e71.url(args, {
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
update7f6b73a3716ef2338042f82aa3902e71Form.put = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update7f6b73a3716ef2338042f82aa3902e71.url(args, {
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
update7f6b73a3716ef2338042f82aa3902e71Form.patch = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update7f6b73a3716ef2338042f82aa3902e71.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update7f6b73a3716ef2338042f82aa3902e71.form = update7f6b73a3716ef2338042f82aa3902e71Form

export const update = {
    '/api/v1/freshdesks/{freshdesk}': update8e2f6ef127af5fed2820e44584ed157e,
    '/freshdesks/{freshdesk}': update7f6b73a3716ef2338042f82aa3902e71,
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const destroy8e2f6ef127af5fed2820e44584ed157e = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'delete',
})

destroy8e2f6ef127af5fed2820e44584ed157e.definition = {
    methods: ["delete"],
    url: '/api/v1/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
destroy8e2f6ef127af5fed2820e44584ed157e.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy8e2f6ef127af5fed2820e44584ed157e.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
destroy8e2f6ef127af5fed2820e44584ed157e.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy8e2f6ef127af5fed2820e44584ed157e.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/api/v1/freshdesks/{freshdesk}'
*/
const destroy8e2f6ef127af5fed2820e44584ed157eForm = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy8e2f6ef127af5fed2820e44584ed157e.url(args, {
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
* @route '/api/v1/freshdesks/{freshdesk}'
*/
destroy8e2f6ef127af5fed2820e44584ed157eForm.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy8e2f6ef127af5fed2820e44584ed157e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy8e2f6ef127af5fed2820e44584ed157e.form = destroy8e2f6ef127af5fed2820e44584ed157eForm
/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
const destroy7f6b73a3716ef2338042f82aa3902e71 = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'delete',
})

destroy7f6b73a3716ef2338042f82aa3902e71.definition = {
    methods: ["delete"],
    url: '/freshdesks/{freshdesk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
destroy7f6b73a3716ef2338042f82aa3902e71.url = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy7f6b73a3716ef2338042f82aa3902e71.definition.url
            .replace('{freshdesk}', parsedArgs.freshdesk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
destroy7f6b73a3716ef2338042f82aa3902e71.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy7f6b73a3716ef2338042f82aa3902e71.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Freshdesk\Http\Controllers\FreshdeskController::destroy
* @see Modules/Freshdesk/app/Http/Controllers/FreshdeskController.php:55
* @route '/freshdesks/{freshdesk}'
*/
const destroy7f6b73a3716ef2338042f82aa3902e71Form = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy7f6b73a3716ef2338042f82aa3902e71.url(args, {
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
destroy7f6b73a3716ef2338042f82aa3902e71Form.delete = (args: { freshdesk: string | number } | [freshdesk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy7f6b73a3716ef2338042f82aa3902e71.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy7f6b73a3716ef2338042f82aa3902e71.form = destroy7f6b73a3716ef2338042f82aa3902e71Form

export const destroy = {
    '/api/v1/freshdesks/{freshdesk}': destroy8e2f6ef127af5fed2820e44584ed157e,
    '/freshdesks/{freshdesk}': destroy7f6b73a3716ef2338042f82aa3902e71,
}

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

const FreshdeskController = { index, store, show, update, destroy, create, edit }

export default FreshdeskController