import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Website\Http\Controllers\WebsiteController::uptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
*/
export const uptime = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

uptime.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/uptime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::uptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
*/
uptime.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return uptime.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::uptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
*/
uptime.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::uptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
*/
uptime.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: uptime.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::brokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
*/
export const brokenLinks = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

brokenLinks.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/broken-links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::brokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
*/
brokenLinks.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return brokenLinks.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::brokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
*/
brokenLinks.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::brokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
*/
brokenLinks.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brokenLinks.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::lighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
*/
export const lighthouse = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

lighthouse.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/lighthouse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::lighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
*/
lighthouse.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return lighthouse.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::lighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
*/
lighthouse.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::lighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
*/
lighthouse.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lighthouse.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::sitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
*/
export const sitemap = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

sitemap.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/sitemap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::sitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
*/
sitemap.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return sitemap.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::sitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
*/
sitemap.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::sitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
*/
sitemap.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sitemap.url(args, options),
    method: 'head',
})

const performance = {
    uptime: Object.assign(uptime, uptime),
    brokenLinks: Object.assign(brokenLinks, brokenLinks),
    lighthouse: Object.assign(lighthouse, lighthouse),
    sitemap: Object.assign(sitemap, sitemap),
}

export default performance