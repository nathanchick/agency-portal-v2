import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
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

const invoices = {
    index: Object.assign(index, index),
    stats: Object.assign(stats, stats),
    sync: Object.assign(sync, sync),
    show: Object.assign(show, show),
}

export default invoices