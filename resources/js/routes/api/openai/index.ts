import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/api/v1/openais'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/openais',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/api/v1/openais'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/api/v1/openais'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/api/v1/openais'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:39
* @route '/api/v1/openais'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/openais',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:39
* @route '/api/v1/openais'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:39
* @route '/api/v1/openais'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:44
* @route '/api/v1/openais/{openai}'
*/
export const show = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/openais/{openai}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:44
* @route '/api/v1/openais/{openai}'
*/
show.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:44
* @route '/api/v1/openais/{openai}'
*/
show.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:44
* @route '/api/v1/openais/{openai}'
*/
show.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:60
* @route '/api/v1/openais/{openai}'
*/
export const update = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/openais/{openai}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:60
* @route '/api/v1/openais/{openai}'
*/
update.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:60
* @route '/api/v1/openais/{openai}'
*/
update.put = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:60
* @route '/api/v1/openais/{openai}'
*/
update.patch = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:65
* @route '/api/v1/openais/{openai}'
*/
export const destroy = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/openais/{openai}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:65
* @route '/api/v1/openais/{openai}'
*/
destroy.url = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{openai}', parsedArgs.openai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:65
* @route '/api/v1/openais/{openai}'
*/
destroy.delete = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeTicket
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:70
* @route '/api/v1/openai/analyze-ticket'
*/
export const analyzeTicket = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeTicket.url(options),
    method: 'post',
})

analyzeTicket.definition = {
    methods: ["post"],
    url: '/api/v1/openai/analyze-ticket',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeTicket
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:70
* @route '/api/v1/openai/analyze-ticket'
*/
analyzeTicket.url = (options?: RouteQueryOptions) => {
    return analyzeTicket.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeTicket
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:70
* @route '/api/v1/openai/analyze-ticket'
*/
analyzeTicket.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeTicket.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeCspViolation
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:201
* @route '/api/v1/openai/analyze-csp-violation'
*/
export const analyzeCspViolation = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCspViolation.url(options),
    method: 'post',
})

analyzeCspViolation.definition = {
    methods: ["post"],
    url: '/api/v1/openai/analyze-csp-violation',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeCspViolation
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:201
* @route '/api/v1/openai/analyze-csp-violation'
*/
analyzeCspViolation.url = (options?: RouteQueryOptions) => {
    return analyzeCspViolation.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeCspViolation
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:201
* @route '/api/v1/openai/analyze-csp-violation'
*/
analyzeCspViolation.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCspViolation.url(options),
    method: 'post',
})

const openai = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    analyzeTicket: Object.assign(analyzeTicket, analyzeTicket),
    analyzeCspViolation: Object.assign(analyzeCspViolation, analyzeCspViolation),
}

export default openai