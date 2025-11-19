import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:15
* @route '/customer/health/{website}/uptime'
*/
export const uptime = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

uptime.definition = {
    methods: ["get","head"],
    url: '/customer/health/{website}/uptime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:15
* @route '/customer/health/{website}/uptime'
*/
uptime.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { website: args }
    }

    if (Array.isArray(args)) {
        args = {
            website: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        website: args.website,
    }

    return uptime.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:15
* @route '/customer/health/{website}/uptime'
*/
uptime.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:15
* @route '/customer/health/{website}/uptime'
*/
uptime.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: uptime.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:15
* @route '/customer/health/{website}/uptime'
*/
const uptimeForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:15
* @route '/customer/health/{website}/uptime'
*/
uptimeForm.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:15
* @route '/customer/health/{website}/uptime'
*/
uptimeForm.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: uptime.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

uptime.form = uptimeForm

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:40
* @route '/customer/health/{website}/broken-links'
*/
export const brokenLinks = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

brokenLinks.definition = {
    methods: ["get","head"],
    url: '/customer/health/{website}/broken-links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:40
* @route '/customer/health/{website}/broken-links'
*/
brokenLinks.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { website: args }
    }

    if (Array.isArray(args)) {
        args = {
            website: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        website: args.website,
    }

    return brokenLinks.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:40
* @route '/customer/health/{website}/broken-links'
*/
brokenLinks.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:40
* @route '/customer/health/{website}/broken-links'
*/
brokenLinks.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brokenLinks.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:40
* @route '/customer/health/{website}/broken-links'
*/
const brokenLinksForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:40
* @route '/customer/health/{website}/broken-links'
*/
brokenLinksForm.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:40
* @route '/customer/health/{website}/broken-links'
*/
brokenLinksForm.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brokenLinks.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

brokenLinks.form = brokenLinksForm

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:65
* @route '/customer/health/{website}/lighthouse'
*/
export const lighthouse = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

lighthouse.definition = {
    methods: ["get","head"],
    url: '/customer/health/{website}/lighthouse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:65
* @route '/customer/health/{website}/lighthouse'
*/
lighthouse.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { website: args }
    }

    if (Array.isArray(args)) {
        args = {
            website: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        website: args.website,
    }

    return lighthouse.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:65
* @route '/customer/health/{website}/lighthouse'
*/
lighthouse.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:65
* @route '/customer/health/{website}/lighthouse'
*/
lighthouse.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lighthouse.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:65
* @route '/customer/health/{website}/lighthouse'
*/
const lighthouseForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:65
* @route '/customer/health/{website}/lighthouse'
*/
lighthouseForm.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:65
* @route '/customer/health/{website}/lighthouse'
*/
lighthouseForm.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: lighthouse.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

lighthouse.form = lighthouseForm

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:90
* @route '/customer/health/{website}/sitemap'
*/
export const sitemap = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

sitemap.definition = {
    methods: ["get","head"],
    url: '/customer/health/{website}/sitemap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:90
* @route '/customer/health/{website}/sitemap'
*/
sitemap.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { website: args }
    }

    if (Array.isArray(args)) {
        args = {
            website: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        website: args.website,
    }

    return sitemap.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:90
* @route '/customer/health/{website}/sitemap'
*/
sitemap.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:90
* @route '/customer/health/{website}/sitemap'
*/
sitemap.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sitemap.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:90
* @route '/customer/health/{website}/sitemap'
*/
const sitemapForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:90
* @route '/customer/health/{website}/sitemap'
*/
sitemapForm.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/Customer/CustomerOhdearController.php:90
* @route '/customer/health/{website}/sitemap'
*/
sitemapForm.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sitemap.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

sitemap.form = sitemapForm

const health = {
    uptime: Object.assign(uptime, uptime),
    brokenLinks: Object.assign(brokenLinks, brokenLinks),
    lighthouse: Object.assign(lighthouse, lighthouse),
    sitemap: Object.assign(sitemap, sitemap),
}

export default health