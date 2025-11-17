import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::download
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
export const download = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/media/{media}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::download
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
download.url = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { media: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            media: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        media: typeof args.media === 'object'
        ? args.media.id
        : args.media,
    }

    return download.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::download
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
download.get = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::download
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
download.head = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::download
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
const downloadForm = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::download
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
downloadForm.get = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::download
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
downloadForm.head = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download.form = downloadForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteMethod
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
export const deleteMethod = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/media/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteMethod
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
deleteMethod.url = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { media: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            media: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        media: typeof args.media === 'object'
        ? args.media.id
        : args.media,
    }

    return deleteMethod.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteMethod
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
deleteMethod.delete = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteMethod
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
const deleteMethodForm = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteMethod
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
deleteMethodForm.delete = (args: { media: string | number | { id: string | number } } | [media: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteMethod.form = deleteMethodForm

const media = {
    download: Object.assign(download, download),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default media