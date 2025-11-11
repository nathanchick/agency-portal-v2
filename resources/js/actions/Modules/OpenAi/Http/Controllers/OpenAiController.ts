import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/api/v1/openais'
*/
const index94775ba2b6f81c2ce9b24feb101f9d3e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'get',
})

index94775ba2b6f81c2ce9b24feb101f9d3e.definition = {
    methods: ["get","head"],
    url: '/api/v1/openais',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/api/v1/openais'
*/
index94775ba2b6f81c2ce9b24feb101f9d3e.url = (options?: RouteQueryOptions) => {
    return index94775ba2b6f81c2ce9b24feb101f9d3e.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/api/v1/openais'
*/
index94775ba2b6f81c2ce9b24feb101f9d3e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/api/v1/openais'
*/
index94775ba2b6f81c2ce9b24feb101f9d3e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/api/v1/openais'
*/
const index94775ba2b6f81c2ce9b24feb101f9d3eForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/api/v1/openais'
*/
index94775ba2b6f81c2ce9b24feb101f9d3eForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/api/v1/openais'
*/
index94775ba2b6f81c2ce9b24feb101f9d3eForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index94775ba2b6f81c2ce9b24feb101f9d3e.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index94775ba2b6f81c2ce9b24feb101f9d3e.form = index94775ba2b6f81c2ce9b24feb101f9d3eForm
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/openais'
*/
const index9f6cdd85b774eeb8f4cb0259ce9e3b04 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'get',
})

index9f6cdd85b774eeb8f4cb0259ce9e3b04.definition = {
    methods: ["get","head"],
    url: '/openais',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/openais'
*/
index9f6cdd85b774eeb8f4cb0259ce9e3b04.url = (options?: RouteQueryOptions) => {
    return index9f6cdd85b774eeb8f4cb0259ce9e3b04.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/openais'
*/
index9f6cdd85b774eeb8f4cb0259ce9e3b04.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/openais'
*/
index9f6cdd85b774eeb8f4cb0259ce9e3b04.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/openais'
*/
const index9f6cdd85b774eeb8f4cb0259ce9e3b04Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/openais'
*/
index9f6cdd85b774eeb8f4cb0259ce9e3b04Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:13
* @route '/openais'
*/
index9f6cdd85b774eeb8f4cb0259ce9e3b04Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index9f6cdd85b774eeb8f4cb0259ce9e3b04.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index9f6cdd85b774eeb8f4cb0259ce9e3b04.form = index9f6cdd85b774eeb8f4cb0259ce9e3b04Form

export const index = {
    '/api/v1/openais': index94775ba2b6f81c2ce9b24feb101f9d3e,
    '/openais': index9f6cdd85b774eeb8f4cb0259ce9e3b04,
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/api/v1/openais'
*/
const store94775ba2b6f81c2ce9b24feb101f9d3e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'post',
})

store94775ba2b6f81c2ce9b24feb101f9d3e.definition = {
    methods: ["post"],
    url: '/api/v1/openais',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/api/v1/openais'
*/
store94775ba2b6f81c2ce9b24feb101f9d3e.url = (options?: RouteQueryOptions) => {
    return store94775ba2b6f81c2ce9b24feb101f9d3e.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/api/v1/openais'
*/
store94775ba2b6f81c2ce9b24feb101f9d3e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/api/v1/openais'
*/
const store94775ba2b6f81c2ce9b24feb101f9d3eForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/api/v1/openais'
*/
store94775ba2b6f81c2ce9b24feb101f9d3eForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store94775ba2b6f81c2ce9b24feb101f9d3e.url(options),
    method: 'post',
})

store94775ba2b6f81c2ce9b24feb101f9d3e.form = store94775ba2b6f81c2ce9b24feb101f9d3eForm
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/openais'
*/
const store9f6cdd85b774eeb8f4cb0259ce9e3b04 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'post',
})

store9f6cdd85b774eeb8f4cb0259ce9e3b04.definition = {
    methods: ["post"],
    url: '/openais',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/openais'
*/
store9f6cdd85b774eeb8f4cb0259ce9e3b04.url = (options?: RouteQueryOptions) => {
    return store9f6cdd85b774eeb8f4cb0259ce9e3b04.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/openais'
*/
store9f6cdd85b774eeb8f4cb0259ce9e3b04.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/openais'
*/
const store9f6cdd85b774eeb8f4cb0259ce9e3b04Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:29
* @route '/openais'
*/
store9f6cdd85b774eeb8f4cb0259ce9e3b04Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store9f6cdd85b774eeb8f4cb0259ce9e3b04.url(options),
    method: 'post',
})

store9f6cdd85b774eeb8f4cb0259ce9e3b04.form = store9f6cdd85b774eeb8f4cb0259ce9e3b04Form

export const store = {
    '/api/v1/openais': store94775ba2b6f81c2ce9b24feb101f9d3e,
    '/openais': store9f6cdd85b774eeb8f4cb0259ce9e3b04,
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/api/v1/openais/{openai}'
*/
const show54c8f1c505caf721ae116a4eecdd9b44 = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'get',
})

show54c8f1c505caf721ae116a4eecdd9b44.definition = {
    methods: ["get","head"],
    url: '/api/v1/openais/{openai}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/api/v1/openais/{openai}'
*/
show54c8f1c505caf721ae116a4eecdd9b44.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { openai: args }
    }

    if (Array.isArray(args)) {
        args = {
            openai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        openai: args.openai,
    }

    return show54c8f1c505caf721ae116a4eecdd9b44.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/api/v1/openais/{openai}'
*/
show54c8f1c505caf721ae116a4eecdd9b44.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/api/v1/openais/{openai}'
*/
show54c8f1c505caf721ae116a4eecdd9b44.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/api/v1/openais/{openai}'
*/
const show54c8f1c505caf721ae116a4eecdd9b44Form = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/api/v1/openais/{openai}'
*/
show54c8f1c505caf721ae116a4eecdd9b44Form.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/api/v1/openais/{openai}'
*/
show54c8f1c505caf721ae116a4eecdd9b44Form.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show54c8f1c505caf721ae116a4eecdd9b44.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show54c8f1c505caf721ae116a4eecdd9b44.form = show54c8f1c505caf721ae116a4eecdd9b44Form
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/openais/{openai}'
*/
const showb88027ba1f5be153a24fb7e14ad44888 = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'get',
})

showb88027ba1f5be153a24fb7e14ad44888.definition = {
    methods: ["get","head"],
    url: '/openais/{openai}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/openais/{openai}'
*/
showb88027ba1f5be153a24fb7e14ad44888.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { openai: args }
    }

    if (Array.isArray(args)) {
        args = {
            openai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        openai: args.openai,
    }

    return showb88027ba1f5be153a24fb7e14ad44888.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/openais/{openai}'
*/
showb88027ba1f5be153a24fb7e14ad44888.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/openais/{openai}'
*/
showb88027ba1f5be153a24fb7e14ad44888.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/openais/{openai}'
*/
const showb88027ba1f5be153a24fb7e14ad44888Form = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/openais/{openai}'
*/
showb88027ba1f5be153a24fb7e14ad44888Form.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:34
* @route '/openais/{openai}'
*/
showb88027ba1f5be153a24fb7e14ad44888Form.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showb88027ba1f5be153a24fb7e14ad44888.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showb88027ba1f5be153a24fb7e14ad44888.form = showb88027ba1f5be153a24fb7e14ad44888Form

export const show = {
    '/api/v1/openais/{openai}': show54c8f1c505caf721ae116a4eecdd9b44,
    '/openais/{openai}': showb88027ba1f5be153a24fb7e14ad44888,
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/api/v1/openais/{openai}'
*/
const update54c8f1c505caf721ae116a4eecdd9b44 = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'put',
})

update54c8f1c505caf721ae116a4eecdd9b44.definition = {
    methods: ["put","patch"],
    url: '/api/v1/openais/{openai}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/api/v1/openais/{openai}'
*/
update54c8f1c505caf721ae116a4eecdd9b44.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { openai: args }
    }

    if (Array.isArray(args)) {
        args = {
            openai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        openai: args.openai,
    }

    return update54c8f1c505caf721ae116a4eecdd9b44.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/api/v1/openais/{openai}'
*/
update54c8f1c505caf721ae116a4eecdd9b44.put = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'put',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/api/v1/openais/{openai}'
*/
update54c8f1c505caf721ae116a4eecdd9b44.patch = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/api/v1/openais/{openai}'
*/
const update54c8f1c505caf721ae116a4eecdd9b44Form = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update54c8f1c505caf721ae116a4eecdd9b44.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/api/v1/openais/{openai}'
*/
update54c8f1c505caf721ae116a4eecdd9b44Form.put = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update54c8f1c505caf721ae116a4eecdd9b44.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/api/v1/openais/{openai}'
*/
update54c8f1c505caf721ae116a4eecdd9b44Form.patch = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update54c8f1c505caf721ae116a4eecdd9b44.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update54c8f1c505caf721ae116a4eecdd9b44.form = update54c8f1c505caf721ae116a4eecdd9b44Form
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/openais/{openai}'
*/
const updateb88027ba1f5be153a24fb7e14ad44888 = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'put',
})

updateb88027ba1f5be153a24fb7e14ad44888.definition = {
    methods: ["put","patch"],
    url: '/openais/{openai}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/openais/{openai}'
*/
updateb88027ba1f5be153a24fb7e14ad44888.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { openai: args }
    }

    if (Array.isArray(args)) {
        args = {
            openai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        openai: args.openai,
    }

    return updateb88027ba1f5be153a24fb7e14ad44888.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/openais/{openai}'
*/
updateb88027ba1f5be153a24fb7e14ad44888.put = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'put',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/openais/{openai}'
*/
updateb88027ba1f5be153a24fb7e14ad44888.patch = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/openais/{openai}'
*/
const updateb88027ba1f5be153a24fb7e14ad44888Form = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateb88027ba1f5be153a24fb7e14ad44888.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/openais/{openai}'
*/
updateb88027ba1f5be153a24fb7e14ad44888Form.put = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateb88027ba1f5be153a24fb7e14ad44888.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:50
* @route '/openais/{openai}'
*/
updateb88027ba1f5be153a24fb7e14ad44888Form.patch = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateb88027ba1f5be153a24fb7e14ad44888.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateb88027ba1f5be153a24fb7e14ad44888.form = updateb88027ba1f5be153a24fb7e14ad44888Form

export const update = {
    '/api/v1/openais/{openai}': update54c8f1c505caf721ae116a4eecdd9b44,
    '/openais/{openai}': updateb88027ba1f5be153a24fb7e14ad44888,
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/api/v1/openais/{openai}'
*/
const destroy54c8f1c505caf721ae116a4eecdd9b44 = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'delete',
})

destroy54c8f1c505caf721ae116a4eecdd9b44.definition = {
    methods: ["delete"],
    url: '/api/v1/openais/{openai}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/api/v1/openais/{openai}'
*/
destroy54c8f1c505caf721ae116a4eecdd9b44.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { openai: args }
    }

    if (Array.isArray(args)) {
        args = {
            openai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        openai: args.openai,
    }

    return destroy54c8f1c505caf721ae116a4eecdd9b44.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/api/v1/openais/{openai}'
*/
destroy54c8f1c505caf721ae116a4eecdd9b44.delete = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy54c8f1c505caf721ae116a4eecdd9b44.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/api/v1/openais/{openai}'
*/
const destroy54c8f1c505caf721ae116a4eecdd9b44Form = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy54c8f1c505caf721ae116a4eecdd9b44.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/api/v1/openais/{openai}'
*/
destroy54c8f1c505caf721ae116a4eecdd9b44Form.delete = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy54c8f1c505caf721ae116a4eecdd9b44.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy54c8f1c505caf721ae116a4eecdd9b44.form = destroy54c8f1c505caf721ae116a4eecdd9b44Form
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/openais/{openai}'
*/
const destroyb88027ba1f5be153a24fb7e14ad44888 = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'delete',
})

destroyb88027ba1f5be153a24fb7e14ad44888.definition = {
    methods: ["delete"],
    url: '/openais/{openai}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/openais/{openai}'
*/
destroyb88027ba1f5be153a24fb7e14ad44888.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { openai: args }
    }

    if (Array.isArray(args)) {
        args = {
            openai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        openai: args.openai,
    }

    return destroyb88027ba1f5be153a24fb7e14ad44888.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/openais/{openai}'
*/
destroyb88027ba1f5be153a24fb7e14ad44888.delete = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyb88027ba1f5be153a24fb7e14ad44888.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/openais/{openai}'
*/
const destroyb88027ba1f5be153a24fb7e14ad44888Form = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyb88027ba1f5be153a24fb7e14ad44888.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:55
* @route '/openais/{openai}'
*/
destroyb88027ba1f5be153a24fb7e14ad44888Form.delete = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyb88027ba1f5be153a24fb7e14ad44888.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyb88027ba1f5be153a24fb7e14ad44888.form = destroyb88027ba1f5be153a24fb7e14ad44888Form

export const destroy = {
    '/api/v1/openais/{openai}': destroy54c8f1c505caf721ae116a4eecdd9b44,
    '/openais/{openai}': destroyb88027ba1f5be153a24fb7e14ad44888,
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:21
* @route '/openais/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/openais/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:21
* @route '/openais/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:21
* @route '/openais/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:21
* @route '/openais/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:21
* @route '/openais/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:21
* @route '/openais/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:21
* @route '/openais/create'
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
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:42
* @route '/openais/{openai}/edit'
*/
export const edit = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/openais/{openai}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:42
* @route '/openais/{openai}/edit'
*/
edit.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { openai: args }
    }

    if (Array.isArray(args)) {
        args = {
            openai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        openai: args.openai,
    }

    return edit.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:42
* @route '/openais/{openai}/edit'
*/
edit.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:42
* @route '/openais/{openai}/edit'
*/
edit.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:42
* @route '/openais/{openai}/edit'
*/
const editForm = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:42
* @route '/openais/{openai}/edit'
*/
editForm.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:42
* @route '/openais/{openai}/edit'
*/
editForm.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

const OpenAiController = { index, store, show, update, destroy, create, edit }

export default OpenAiController