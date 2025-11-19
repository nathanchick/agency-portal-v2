import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::index
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:13
* @route '/postmarks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/postmarks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::index
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:13
* @route '/postmarks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::index
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:13
* @route '/postmarks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::index
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:13
* @route '/postmarks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::create
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:21
* @route '/postmarks/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/postmarks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::create
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:21
* @route '/postmarks/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::create
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:21
* @route '/postmarks/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::create
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:21
* @route '/postmarks/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::store
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:29
* @route '/postmarks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/postmarks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::store
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:29
* @route '/postmarks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::store
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:29
* @route '/postmarks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::show
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:34
* @route '/postmarks/{postmark}'
*/
export const show = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/postmarks/{postmark}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::show
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:34
* @route '/postmarks/{postmark}'
*/
show.url = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { postmark: args }
    }

    if (Array.isArray(args)) {
        args = {
            postmark: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        postmark: args.postmark,
    }

    return show.definition.url
            .replace('{postmark}', parsedArgs.postmark.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::show
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:34
* @route '/postmarks/{postmark}'
*/
show.get = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::show
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:34
* @route '/postmarks/{postmark}'
*/
show.head = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::edit
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:42
* @route '/postmarks/{postmark}/edit'
*/
export const edit = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/postmarks/{postmark}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::edit
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:42
* @route '/postmarks/{postmark}/edit'
*/
edit.url = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { postmark: args }
    }

    if (Array.isArray(args)) {
        args = {
            postmark: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        postmark: args.postmark,
    }

    return edit.definition.url
            .replace('{postmark}', parsedArgs.postmark.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::edit
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:42
* @route '/postmarks/{postmark}/edit'
*/
edit.get = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::edit
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:42
* @route '/postmarks/{postmark}/edit'
*/
edit.head = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::update
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:50
* @route '/postmarks/{postmark}'
*/
export const update = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/postmarks/{postmark}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::update
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:50
* @route '/postmarks/{postmark}'
*/
update.url = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { postmark: args }
    }

    if (Array.isArray(args)) {
        args = {
            postmark: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        postmark: args.postmark,
    }

    return update.definition.url
            .replace('{postmark}', parsedArgs.postmark.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::update
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:50
* @route '/postmarks/{postmark}'
*/
update.put = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::update
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:50
* @route '/postmarks/{postmark}'
*/
update.patch = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::destroy
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:55
* @route '/postmarks/{postmark}'
*/
export const destroy = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/postmarks/{postmark}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::destroy
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:55
* @route '/postmarks/{postmark}'
*/
destroy.url = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { postmark: args }
    }

    if (Array.isArray(args)) {
        args = {
            postmark: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        postmark: args.postmark,
    }

    return destroy.definition.url
            .replace('{postmark}', parsedArgs.postmark.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\PostMarkController::destroy
* @see Modules/PostMark/app/Http/Controllers/PostMarkController.php:55
* @route '/postmarks/{postmark}'
*/
destroy.delete = (args: { postmark: string | number } | [postmark: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const PostMarkController = { index, create, store, show, edit, update, destroy }

export default PostMarkController