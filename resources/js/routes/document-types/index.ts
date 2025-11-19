import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::index
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:19
* @route '/document-types'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/document-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::index
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:19
* @route '/document-types'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::index
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:19
* @route '/document-types'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::index
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:19
* @route '/document-types'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::create
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:35
* @route '/document-types/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/document-types/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::create
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:35
* @route '/document-types/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::create
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:35
* @route '/document-types/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::create
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:35
* @route '/document-types/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::store
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:43
* @route '/document-types'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/document-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::store
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:43
* @route '/document-types'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::store
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:43
* @route '/document-types'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::show
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:0
* @route '/document-types/{document_type}'
*/
export const show = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/document-types/{document_type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::show
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:0
* @route '/document-types/{document_type}'
*/
show.url = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_type: args }
    }

    if (Array.isArray(args)) {
        args = {
            document_type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document_type: args.document_type,
    }

    return show.definition.url
            .replace('{document_type}', parsedArgs.document_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::show
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:0
* @route '/document-types/{document_type}'
*/
show.get = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::show
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:0
* @route '/document-types/{document_type}'
*/
show.head = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::edit
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:80
* @route '/document-types/{document_type}/edit'
*/
export const edit = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/document-types/{document_type}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::edit
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:80
* @route '/document-types/{document_type}/edit'
*/
edit.url = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_type: args }
    }

    if (Array.isArray(args)) {
        args = {
            document_type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document_type: args.document_type,
    }

    return edit.definition.url
            .replace('{document_type}', parsedArgs.document_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::edit
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:80
* @route '/document-types/{document_type}/edit'
*/
edit.get = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::edit
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:80
* @route '/document-types/{document_type}/edit'
*/
edit.head = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::update
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:102
* @route '/document-types/{document_type}'
*/
export const update = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/document-types/{document_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::update
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:102
* @route '/document-types/{document_type}'
*/
update.url = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_type: args }
    }

    if (Array.isArray(args)) {
        args = {
            document_type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document_type: args.document_type,
    }

    return update.definition.url
            .replace('{document_type}', parsedArgs.document_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::update
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:102
* @route '/document-types/{document_type}'
*/
update.put = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::update
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:102
* @route '/document-types/{document_type}'
*/
update.patch = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::destroy
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:154
* @route '/document-types/{document_type}'
*/
export const destroy = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/document-types/{document_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::destroy
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:154
* @route '/document-types/{document_type}'
*/
destroy.url = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_type: args }
    }

    if (Array.isArray(args)) {
        args = {
            document_type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document_type: args.document_type,
    }

    return destroy.definition.url
            .replace('{document_type}', parsedArgs.document_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::destroy
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:154
* @route '/document-types/{document_type}'
*/
destroy.delete = (args: { document_type: string | number } | [document_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::download
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:201
* @route '/document-types/{document}/download'
*/
export const download = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/document-types/{document}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::download
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:201
* @route '/document-types/{document}/download'
*/
download.url = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: args.document,
    }

    return download.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::download
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:201
* @route '/document-types/{document}/download'
*/
download.get = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::download
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:201
* @route '/document-types/{document}/download'
*/
download.head = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::preview
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:227
* @route '/document-types/{document}/preview'
*/
export const preview = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/document-types/{document}/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::preview
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:227
* @route '/document-types/{document}/preview'
*/
preview.url = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: args.document,
    }

    return preview.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::preview
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:227
* @route '/document-types/{document}/preview'
*/
preview.get = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentTypeController::preview
* @see Modules/Document/app/Http/Controllers/DocumentTypeController.php:227
* @route '/document-types/{document}/preview'
*/
preview.head = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

const documentTypes = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    download: Object.assign(download, download),
    preview: Object.assign(preview, preview),
}

export default documentTypes