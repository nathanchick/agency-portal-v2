import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::index
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:18
* @route '/customer/websites'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/customer/websites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::index
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:18
* @route '/customer/websites'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::index
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:18
* @route '/customer/websites'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::index
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:18
* @route '/customer/websites'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performance
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:44
* @route '/customer/websites/{id}/performance'
*/
export const performance = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})

performance.definition = {
    methods: ["get","head"],
    url: '/customer/websites/{id}/performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performance
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:44
* @route '/customer/websites/{id}/performance'
*/
performance.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return performance.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performance
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:44
* @route '/customer/websites/{id}/performance'
*/
performance.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performance
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:44
* @route '/customer/websites/{id}/performance'
*/
performance.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performance.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:52
* @route '/customer/websites/{id}/performance/uptime'
*/
export const performanceUptime = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceUptime.url(args, options),
    method: 'get',
})

performanceUptime.definition = {
    methods: ["get","head"],
    url: '/customer/websites/{id}/performance/uptime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:52
* @route '/customer/websites/{id}/performance/uptime'
*/
performanceUptime.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return performanceUptime.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:52
* @route '/customer/websites/{id}/performance/uptime'
*/
performanceUptime.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceUptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:52
* @route '/customer/websites/{id}/performance/uptime'
*/
performanceUptime.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceUptime.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:77
* @route '/customer/websites/{id}/performance/broken-links'
*/
export const performanceBrokenLinks = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceBrokenLinks.url(args, options),
    method: 'get',
})

performanceBrokenLinks.definition = {
    methods: ["get","head"],
    url: '/customer/websites/{id}/performance/broken-links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:77
* @route '/customer/websites/{id}/performance/broken-links'
*/
performanceBrokenLinks.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return performanceBrokenLinks.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:77
* @route '/customer/websites/{id}/performance/broken-links'
*/
performanceBrokenLinks.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceBrokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:77
* @route '/customer/websites/{id}/performance/broken-links'
*/
performanceBrokenLinks.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceBrokenLinks.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:102
* @route '/customer/websites/{id}/performance/lighthouse'
*/
export const performanceLighthouse = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceLighthouse.url(args, options),
    method: 'get',
})

performanceLighthouse.definition = {
    methods: ["get","head"],
    url: '/customer/websites/{id}/performance/lighthouse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:102
* @route '/customer/websites/{id}/performance/lighthouse'
*/
performanceLighthouse.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return performanceLighthouse.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:102
* @route '/customer/websites/{id}/performance/lighthouse'
*/
performanceLighthouse.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceLighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:102
* @route '/customer/websites/{id}/performance/lighthouse'
*/
performanceLighthouse.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceLighthouse.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:127
* @route '/customer/websites/{id}/performance/sitemap'
*/
export const performanceSitemap = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceSitemap.url(args, options),
    method: 'get',
})

performanceSitemap.definition = {
    methods: ["get","head"],
    url: '/customer/websites/{id}/performance/sitemap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:127
* @route '/customer/websites/{id}/performance/sitemap'
*/
performanceSitemap.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return performanceSitemap.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:127
* @route '/customer/websites/{id}/performance/sitemap'
*/
performanceSitemap.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceSitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:127
* @route '/customer/websites/{id}/performance/sitemap'
*/
performanceSitemap.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceSitemap.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::security
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:152
* @route '/customer/websites/{id}/security'
*/
export const security = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: security.url(args, options),
    method: 'get',
})

security.definition = {
    methods: ["get","head"],
    url: '/customer/websites/{id}/security',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::security
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:152
* @route '/customer/websites/{id}/security'
*/
security.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return security.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::security
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:152
* @route '/customer/websites/{id}/security'
*/
security.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: security.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\Customer\CustomerWebsiteController::security
* @see Modules/Website/app/Http/Controllers/Customer/CustomerWebsiteController.php:152
* @route '/customer/websites/{id}/security'
*/
security.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: security.url(args, options),
    method: 'head',
})

const CustomerWebsiteController = { index, performance, performanceUptime, performanceBrokenLinks, performanceLighthouse, performanceSitemap, security }

export default CustomerWebsiteController