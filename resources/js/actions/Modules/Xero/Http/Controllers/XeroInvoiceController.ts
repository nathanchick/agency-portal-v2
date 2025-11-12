import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::index
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:38
* @route '/xero/invoices'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/xero/invoices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::index
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:38
* @route '/xero/invoices'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::index
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:38
* @route '/xero/invoices'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::index
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:38
* @route '/xero/invoices'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::index
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:38
* @route '/xero/invoices'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::index
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:38
* @route '/xero/invoices'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::index
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:38
* @route '/xero/invoices'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::stats
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:174
* @route '/xero/invoices/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/xero/invoices/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::stats
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:174
* @route '/xero/invoices/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::stats
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:174
* @route '/xero/invoices/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::stats
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:174
* @route '/xero/invoices/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::stats
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:174
* @route '/xero/invoices/stats'
*/
const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::stats
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:174
* @route '/xero/invoices/stats'
*/
statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::stats
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:174
* @route '/xero/invoices/stats'
*/
statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stats.form = statsForm

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::sync
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:136
* @route '/xero/invoices/sync'
*/
export const sync = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/xero/invoices/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::sync
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:136
* @route '/xero/invoices/sync'
*/
sync.url = (options?: RouteQueryOptions) => {
    return sync.definition.url + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::sync
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:136
* @route '/xero/invoices/sync'
*/
sync.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::sync
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:136
* @route '/xero/invoices/sync'
*/
const syncForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::sync
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:136
* @route '/xero/invoices/sync'
*/
syncForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

sync.form = syncForm

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::show
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:113
* @route '/xero/invoices/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/xero/invoices/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::show
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:113
* @route '/xero/invoices/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::show
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:113
* @route '/xero/invoices/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::show
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:113
* @route '/xero/invoices/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::show
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:113
* @route '/xero/invoices/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::show
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:113
* @route '/xero/invoices/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Xero\Http\Controllers\XeroInvoiceController::show
* @see Modules/Xero/app/Http/Controllers/XeroInvoiceController.php:113
* @route '/xero/invoices/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const XeroInvoiceController = { index, stats, sync, show }

export default XeroInvoiceController