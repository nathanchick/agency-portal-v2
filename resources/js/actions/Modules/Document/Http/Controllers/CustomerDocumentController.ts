import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:18
* @route '/customer/documents/my-pending'
*/
export const myPending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myPending.url(options),
    method: 'get',
})

myPending.definition = {
    methods: ["get","head"],
    url: '/customer/documents/my-pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:18
* @route '/customer/documents/my-pending'
*/
myPending.url = (options?: RouteQueryOptions) => {
    return myPending.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:18
* @route '/customer/documents/my-pending'
*/
myPending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myPending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:18
* @route '/customer/documents/my-pending'
*/
myPending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myPending.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:18
* @route '/customer/documents/my-pending'
*/
const myPendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myPending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:18
* @route '/customer/documents/my-pending'
*/
myPendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myPending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:18
* @route '/customer/documents/my-pending'
*/
myPendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myPending.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myPending.form = myPendingForm

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:36
* @route '/customer/documents/my-completed'
*/
export const myCompleted = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myCompleted.url(options),
    method: 'get',
})

myCompleted.definition = {
    methods: ["get","head"],
    url: '/customer/documents/my-completed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:36
* @route '/customer/documents/my-completed'
*/
myCompleted.url = (options?: RouteQueryOptions) => {
    return myCompleted.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:36
* @route '/customer/documents/my-completed'
*/
myCompleted.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myCompleted.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:36
* @route '/customer/documents/my-completed'
*/
myCompleted.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myCompleted.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:36
* @route '/customer/documents/my-completed'
*/
const myCompletedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myCompleted.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:36
* @route '/customer/documents/my-completed'
*/
myCompletedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myCompleted.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::myCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:36
* @route '/customer/documents/my-completed'
*/
myCompletedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myCompleted.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myCompleted.form = myCompletedForm

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:54
* @route '/customer/documents/all-pending'
*/
export const allPending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allPending.url(options),
    method: 'get',
})

allPending.definition = {
    methods: ["get","head"],
    url: '/customer/documents/all-pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:54
* @route '/customer/documents/all-pending'
*/
allPending.url = (options?: RouteQueryOptions) => {
    return allPending.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:54
* @route '/customer/documents/all-pending'
*/
allPending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allPending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:54
* @route '/customer/documents/all-pending'
*/
allPending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allPending.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:54
* @route '/customer/documents/all-pending'
*/
const allPendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allPending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:54
* @route '/customer/documents/all-pending'
*/
allPendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allPending.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allPending
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:54
* @route '/customer/documents/all-pending'
*/
allPendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allPending.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allPending.form = allPendingForm

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:75
* @route '/customer/documents/all-completed'
*/
export const allCompleted = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allCompleted.url(options),
    method: 'get',
})

allCompleted.definition = {
    methods: ["get","head"],
    url: '/customer/documents/all-completed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:75
* @route '/customer/documents/all-completed'
*/
allCompleted.url = (options?: RouteQueryOptions) => {
    return allCompleted.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:75
* @route '/customer/documents/all-completed'
*/
allCompleted.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allCompleted.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:75
* @route '/customer/documents/all-completed'
*/
allCompleted.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allCompleted.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:75
* @route '/customer/documents/all-completed'
*/
const allCompletedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allCompleted.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:75
* @route '/customer/documents/all-completed'
*/
allCompletedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allCompleted.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::allCompleted
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:75
* @route '/customer/documents/all-completed'
*/
allCompletedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allCompleted.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allCompleted.form = allCompletedForm

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::viewSign
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:96
* @route '/customer/documents/{id}/view-sign'
*/
export const viewSign = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewSign.url(args, options),
    method: 'get',
})

viewSign.definition = {
    methods: ["get","head"],
    url: '/customer/documents/{id}/view-sign',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::viewSign
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:96
* @route '/customer/documents/{id}/view-sign'
*/
viewSign.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return viewSign.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::viewSign
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:96
* @route '/customer/documents/{id}/view-sign'
*/
viewSign.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewSign.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::viewSign
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:96
* @route '/customer/documents/{id}/view-sign'
*/
viewSign.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewSign.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::viewSign
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:96
* @route '/customer/documents/{id}/view-sign'
*/
const viewSignForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewSign.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::viewSign
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:96
* @route '/customer/documents/{id}/view-sign'
*/
viewSignForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewSign.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::viewSign
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:96
* @route '/customer/documents/{id}/view-sign'
*/
viewSignForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewSign.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

viewSign.form = viewSignForm

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::approve
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:198
* @route '/customer/documents/{id}/approve'
*/
export const approve = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/customer/documents/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::approve
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:198
* @route '/customer/documents/{id}/approve'
*/
approve.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return approve.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::approve
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:198
* @route '/customer/documents/{id}/approve'
*/
approve.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::approve
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:198
* @route '/customer/documents/{id}/approve'
*/
const approveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::approve
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:198
* @route '/customer/documents/{id}/approve'
*/
approveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::decline
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:265
* @route '/customer/documents/{id}/decline'
*/
export const decline = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: decline.url(args, options),
    method: 'post',
})

decline.definition = {
    methods: ["post"],
    url: '/customer/documents/{id}/decline',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::decline
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:265
* @route '/customer/documents/{id}/decline'
*/
decline.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return decline.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::decline
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:265
* @route '/customer/documents/{id}/decline'
*/
decline.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: decline.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::decline
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:265
* @route '/customer/documents/{id}/decline'
*/
const declineForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: decline.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Document\Http\Controllers\CustomerDocumentController::decline
* @see Modules/Document/app/Http/Controllers/CustomerDocumentController.php:265
* @route '/customer/documents/{id}/decline'
*/
declineForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: decline.url(args, options),
    method: 'post',
})

decline.form = declineForm

const CustomerDocumentController = { myPending, myCompleted, allPending, allCompleted, viewSign, approve, decline }

export default CustomerDocumentController