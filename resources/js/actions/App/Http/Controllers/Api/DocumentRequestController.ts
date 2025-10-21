import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DocumentRequestController::index
* @see app/Http/Controllers/Api/DocumentRequestController.php:26
* @route '/api/organisations/{organisation}/document-requests'
*/
export const index = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/document-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::index
* @see app/Http/Controllers/Api/DocumentRequestController.php:26
* @route '/api/organisations/{organisation}/document-requests'
*/
index.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organisation: args }
    }

    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
    }

    return index.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::index
* @see app/Http/Controllers/Api/DocumentRequestController.php:26
* @route '/api/organisations/{organisation}/document-requests'
*/
index.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::index
* @see app/Http/Controllers/Api/DocumentRequestController.php:26
* @route '/api/organisations/{organisation}/document-requests'
*/
index.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::index
* @see app/Http/Controllers/Api/DocumentRequestController.php:26
* @route '/api/organisations/{organisation}/document-requests'
*/
const indexForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::index
* @see app/Http/Controllers/Api/DocumentRequestController.php:26
* @route '/api/organisations/{organisation}/document-requests'
*/
indexForm.get = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::index
* @see app/Http/Controllers/Api/DocumentRequestController.php:26
* @route '/api/organisations/{organisation}/document-requests'
*/
indexForm.head = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::store
* @see app/Http/Controllers/Api/DocumentRequestController.php:48
* @route '/api/organisations/{organisation}/document-requests'
*/
export const store = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/organisations/{organisation}/document-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::store
* @see app/Http/Controllers/Api/DocumentRequestController.php:48
* @route '/api/organisations/{organisation}/document-requests'
*/
store.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organisation: args }
    }

    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
    }

    return store.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::store
* @see app/Http/Controllers/Api/DocumentRequestController.php:48
* @route '/api/organisations/{organisation}/document-requests'
*/
store.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::store
* @see app/Http/Controllers/Api/DocumentRequestController.php:48
* @route '/api/organisations/{organisation}/document-requests'
*/
const storeForm = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::store
* @see app/Http/Controllers/Api/DocumentRequestController.php:48
* @route '/api/organisations/{organisation}/document-requests'
*/
storeForm.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::show
* @see app/Http/Controllers/Api/DocumentRequestController.php:85
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
export const show = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/organisations/{organisation}/document-requests/{document_request}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::show
* @see app/Http/Controllers/Api/DocumentRequestController.php:85
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
show.url = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            document_request: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        document_request: args.document_request,
    }

    return show.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{document_request}', parsedArgs.document_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::show
* @see app/Http/Controllers/Api/DocumentRequestController.php:85
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
show.get = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::show
* @see app/Http/Controllers/Api/DocumentRequestController.php:85
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
show.head = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::show
* @see app/Http/Controllers/Api/DocumentRequestController.php:85
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
const showForm = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::show
* @see app/Http/Controllers/Api/DocumentRequestController.php:85
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
showForm.get = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::show
* @see app/Http/Controllers/Api/DocumentRequestController.php:85
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
showForm.head = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::update
* @see app/Http/Controllers/Api/DocumentRequestController.php:107
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
export const update = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/organisations/{organisation}/document-requests/{document_request}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::update
* @see app/Http/Controllers/Api/DocumentRequestController.php:107
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
update.url = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            document_request: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        document_request: args.document_request,
    }

    return update.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{document_request}', parsedArgs.document_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::update
* @see app/Http/Controllers/Api/DocumentRequestController.php:107
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
update.put = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::update
* @see app/Http/Controllers/Api/DocumentRequestController.php:107
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
update.patch = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::update
* @see app/Http/Controllers/Api/DocumentRequestController.php:107
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
const updateForm = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::update
* @see app/Http/Controllers/Api/DocumentRequestController.php:107
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
updateForm.put = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::update
* @see app/Http/Controllers/Api/DocumentRequestController.php:107
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
updateForm.patch = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::destroy
* @see app/Http/Controllers/Api/DocumentRequestController.php:144
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
export const destroy = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/organisations/{organisation}/document-requests/{document_request}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::destroy
* @see app/Http/Controllers/Api/DocumentRequestController.php:144
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
destroy.url = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
            document_request: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
        document_request: args.document_request,
    }

    return destroy.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace('{document_request}', parsedArgs.document_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::destroy
* @see app/Http/Controllers/Api/DocumentRequestController.php:144
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
destroy.delete = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::destroy
* @see app/Http/Controllers/Api/DocumentRequestController.php:144
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
const destroyForm = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DocumentRequestController::destroy
* @see app/Http/Controllers/Api/DocumentRequestController.php:144
* @route '/api/organisations/{organisation}/document-requests/{document_request}'
*/
destroyForm.delete = (args: { organisation: string | number, document_request: string | number } | [organisation: string | number, document_request: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const DocumentRequestController = { index, store, show, update, destroy }

export default DocumentRequestController