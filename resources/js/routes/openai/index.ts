import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/openais'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/openais',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/openais'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/openais'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::index
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:23
* @route '/openais'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:31
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
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:31
* @route '/openais/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:31
* @route '/openais/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::create
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:31
* @route '/openais/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:39
* @route '/openais'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/openais',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:39
* @route '/openais'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::store
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:39
* @route '/openais'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:44
* @route '/openais/{openai}'
*/
export const show = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/openais/{openai}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:44
* @route '/openais/{openai}'
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
* @route '/openais/{openai}'
*/
show.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::show
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:44
* @route '/openais/{openai}'
*/
show.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:52
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
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:52
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
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:52
* @route '/openais/{openai}/edit'
*/
edit.get = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::edit
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:52
* @route '/openais/{openai}/edit'
*/
edit.head = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:60
* @route '/openais/{openai}'
*/
export const update = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/openais/{openai}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:60
* @route '/openais/{openai}'
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
* @route '/openais/{openai}'
*/
update.put = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::update
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:60
* @route '/openais/{openai}'
*/
update.patch = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:65
* @route '/openais/{openai}'
*/
export const destroy = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/openais/{openai}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::destroy
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:65
* @route '/openais/{openai}'
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
* @route '/openais/{openai}'
*/
destroy.delete = (args: { openai: string | number } | [openai: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeTicket
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:70
* @route '/openai/analyze-ticket'
*/
export const analyzeTicket = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeTicket.url(options),
    method: 'post',
})

analyzeTicket.definition = {
    methods: ["post"],
    url: '/openai/analyze-ticket',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeTicket
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:70
* @route '/openai/analyze-ticket'
*/
analyzeTicket.url = (options?: RouteQueryOptions) => {
    return analyzeTicket.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeTicket
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:70
* @route '/openai/analyze-ticket'
*/
analyzeTicket.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeTicket.url(options),
    method: 'post',
})

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeCspViolation
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:201
* @route '/openai/analyze-csp-violation'
*/
export const analyzeCspViolation = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCspViolation.url(options),
    method: 'post',
})

analyzeCspViolation.definition = {
    methods: ["post"],
    url: '/openai/analyze-csp-violation',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeCspViolation
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:201
* @route '/openai/analyze-csp-violation'
*/
analyzeCspViolation.url = (options?: RouteQueryOptions) => {
    return analyzeCspViolation.definition.url + queryParams(options)
}

/**
* @see \Modules\OpenAi\Http\Controllers\OpenAiController::analyzeCspViolation
* @see Modules/OpenAi/app/Http/Controllers/OpenAiController.php:201
* @route '/openai/analyze-csp-violation'
*/
analyzeCspViolation.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCspViolation.url(options),
    method: 'post',
})

const openai = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    analyzeTicket: Object.assign(analyzeTicket, analyzeTicket),
    analyzeCspViolation: Object.assign(analyzeCspViolation, analyzeCspViolation),
}

export default openai