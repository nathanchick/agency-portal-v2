import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Document\Http\Controllers\DocumentController::pending
* @see Modules/Document/app/Http/Controllers/DocumentController.php:23
* @route '/documents/pending'
*/
export const pending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

pending.definition = {
    methods: ["get","head"],
    url: '/documents/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::pending
* @see Modules/Document/app/Http/Controllers/DocumentController.php:23
* @route '/documents/pending'
*/
pending.url = (options?: RouteQueryOptions) => {
    return pending.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::pending
* @see Modules/Document/app/Http/Controllers/DocumentController.php:23
* @route '/documents/pending'
*/
pending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::pending
* @see Modules/Document/app/Http/Controllers/DocumentController.php:23
* @route '/documents/pending'
*/
pending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pending.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::pending
* @see Modules/Document/app/Http/Controllers/DocumentController.php:23
* @route '/documents/pending'
*/
const pendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::pending
* @see Modules/Document/app/Http/Controllers/DocumentController.php:23
* @route '/documents/pending'
*/
pendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::pending
* @see Modules/Document/app/Http/Controllers/DocumentController.php:23
* @route '/documents/pending'
*/
pendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pending.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pending.form = pendingForm

/**
* @see \Modules\Document\Http\Controllers\DocumentController::completed
* @see Modules/Document/app/Http/Controllers/DocumentController.php:73
* @route '/documents/completed'
*/
export const completed = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: completed.url(options),
    method: 'get',
})

completed.definition = {
    methods: ["get","head"],
    url: '/documents/completed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::completed
* @see Modules/Document/app/Http/Controllers/DocumentController.php:73
* @route '/documents/completed'
*/
completed.url = (options?: RouteQueryOptions) => {
    return completed.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::completed
* @see Modules/Document/app/Http/Controllers/DocumentController.php:73
* @route '/documents/completed'
*/
completed.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: completed.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::completed
* @see Modules/Document/app/Http/Controllers/DocumentController.php:73
* @route '/documents/completed'
*/
completed.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: completed.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::completed
* @see Modules/Document/app/Http/Controllers/DocumentController.php:73
* @route '/documents/completed'
*/
const completedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: completed.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::completed
* @see Modules/Document/app/Http/Controllers/DocumentController.php:73
* @route '/documents/completed'
*/
completedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: completed.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::completed
* @see Modules/Document/app/Http/Controllers/DocumentController.php:73
* @route '/documents/completed'
*/
completedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: completed.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

completed.form = completedForm

/**
* @see \Modules\Document\Http\Controllers\DocumentController::create
* @see Modules/Document/app/Http/Controllers/DocumentController.php:123
* @route '/documents/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/documents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::create
* @see Modules/Document/app/Http/Controllers/DocumentController.php:123
* @route '/documents/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::create
* @see Modules/Document/app/Http/Controllers/DocumentController.php:123
* @route '/documents/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::create
* @see Modules/Document/app/Http/Controllers/DocumentController.php:123
* @route '/documents/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::create
* @see Modules/Document/app/Http/Controllers/DocumentController.php:123
* @route '/documents/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::create
* @see Modules/Document/app/Http/Controllers/DocumentController.php:123
* @route '/documents/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::create
* @see Modules/Document/app/Http/Controllers/DocumentController.php:123
* @route '/documents/create'
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
* @see \Modules\Document\Http\Controllers\DocumentController::store
* @see Modules/Document/app/Http/Controllers/DocumentController.php:173
* @route '/documents'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::store
* @see Modules/Document/app/Http/Controllers/DocumentController.php:173
* @route '/documents'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::store
* @see Modules/Document/app/Http/Controllers/DocumentController.php:173
* @route '/documents'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::store
* @see Modules/Document/app/Http/Controllers/DocumentController.php:173
* @route '/documents'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::store
* @see Modules/Document/app/Http/Controllers/DocumentController.php:173
* @route '/documents'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Document\Http\Controllers\DocumentController::edit
* @see Modules/Document/app/Http/Controllers/DocumentController.php:310
* @route '/documents/{documentRequest}/edit'
*/
export const edit = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/documents/{documentRequest}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::edit
* @see Modules/Document/app/Http/Controllers/DocumentController.php:310
* @route '/documents/{documentRequest}/edit'
*/
edit.url = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { documentRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            documentRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        documentRequest: typeof args.documentRequest === 'object'
        ? args.documentRequest.id
        : args.documentRequest,
    }

    return edit.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::edit
* @see Modules/Document/app/Http/Controllers/DocumentController.php:310
* @route '/documents/{documentRequest}/edit'
*/
edit.get = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::edit
* @see Modules/Document/app/Http/Controllers/DocumentController.php:310
* @route '/documents/{documentRequest}/edit'
*/
edit.head = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::edit
* @see Modules/Document/app/Http/Controllers/DocumentController.php:310
* @route '/documents/{documentRequest}/edit'
*/
const editForm = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::edit
* @see Modules/Document/app/Http/Controllers/DocumentController.php:310
* @route '/documents/{documentRequest}/edit'
*/
editForm.get = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::edit
* @see Modules/Document/app/Http/Controllers/DocumentController.php:310
* @route '/documents/{documentRequest}/edit'
*/
editForm.head = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \Modules\Document\Http\Controllers\DocumentController::update
* @see Modules/Document/app/Http/Controllers/DocumentController.php:247
* @route '/documents/{documentRequest}'
*/
export const update = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/documents/{documentRequest}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::update
* @see Modules/Document/app/Http/Controllers/DocumentController.php:247
* @route '/documents/{documentRequest}'
*/
update.url = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { documentRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            documentRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        documentRequest: typeof args.documentRequest === 'object'
        ? args.documentRequest.id
        : args.documentRequest,
    }

    return update.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::update
* @see Modules/Document/app/Http/Controllers/DocumentController.php:247
* @route '/documents/{documentRequest}'
*/
update.put = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::update
* @see Modules/Document/app/Http/Controllers/DocumentController.php:247
* @route '/documents/{documentRequest}'
*/
const updateForm = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::update
* @see Modules/Document/app/Http/Controllers/DocumentController.php:247
* @route '/documents/{documentRequest}'
*/
updateForm.put = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \Modules\Document\Http\Controllers\DocumentController::voidMethod
* @see Modules/Document/app/Http/Controllers/DocumentController.php:272
* @route '/documents/{documentRequest}/void'
*/
export const voidMethod = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidMethod.url(args, options),
    method: 'post',
})

voidMethod.definition = {
    methods: ["post"],
    url: '/documents/{documentRequest}/void',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::voidMethod
* @see Modules/Document/app/Http/Controllers/DocumentController.php:272
* @route '/documents/{documentRequest}/void'
*/
voidMethod.url = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { documentRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            documentRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        documentRequest: typeof args.documentRequest === 'object'
        ? args.documentRequest.id
        : args.documentRequest,
    }

    return voidMethod.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::voidMethod
* @see Modules/Document/app/Http/Controllers/DocumentController.php:272
* @route '/documents/{documentRequest}/void'
*/
voidMethod.post = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidMethod.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::voidMethod
* @see Modules/Document/app/Http/Controllers/DocumentController.php:272
* @route '/documents/{documentRequest}/void'
*/
const voidMethodForm = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voidMethod.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::voidMethod
* @see Modules/Document/app/Http/Controllers/DocumentController.php:272
* @route '/documents/{documentRequest}/void'
*/
voidMethodForm.post = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voidMethod.url(args, options),
    method: 'post',
})

voidMethod.form = voidMethodForm

/**
* @see \Modules\Document\Http\Controllers\DocumentController::resend
* @see Modules/Document/app/Http/Controllers/DocumentController.php:289
* @route '/documents/{documentRequest}/resend'
*/
export const resend = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

resend.definition = {
    methods: ["post"],
    url: '/documents/{documentRequest}/resend',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Document\Http\Controllers\DocumentController::resend
* @see Modules/Document/app/Http/Controllers/DocumentController.php:289
* @route '/documents/{documentRequest}/resend'
*/
resend.url = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { documentRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            documentRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        documentRequest: typeof args.documentRequest === 'object'
        ? args.documentRequest.id
        : args.documentRequest,
    }

    return resend.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\DocumentController::resend
* @see Modules/Document/app/Http/Controllers/DocumentController.php:289
* @route '/documents/{documentRequest}/resend'
*/
resend.post = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::resend
* @see Modules/Document/app/Http/Controllers/DocumentController.php:289
* @route '/documents/{documentRequest}/resend'
*/
const resendForm = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resend.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\DocumentController::resend
* @see Modules/Document/app/Http/Controllers/DocumentController.php:289
* @route '/documents/{documentRequest}/resend'
*/
resendForm.post = (args: { documentRequest: string | number | { id: string | number } } | [documentRequest: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resend.url(args, options),
    method: 'post',
})

resend.form = resendForm

const documents = {
    pending: Object.assign(pending, pending),
    completed: Object.assign(completed, completed),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    void: Object.assign(voidMethod, voidMethod),
    resend: Object.assign(resend, resend),
}

export default documents