import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
export const setup = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(args, options),
    method: 'post',
})

setup.definition = {
    methods: ["post"],
    url: '/ohdear/websites/{websiteId}/setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
setup.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return setup.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::setup
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:24
* @route '/ohdear/websites/{websiteId}/setup'
*/
setup.post = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:250
* @route '/ohdear/websites/{websiteId}/urls'
*/
export const addUrl = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addUrl.url(args, options),
    method: 'post',
})

addUrl.definition = {
    methods: ["post"],
    url: '/ohdear/websites/{websiteId}/urls',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:250
* @route '/ohdear/websites/{websiteId}/urls'
*/
addUrl.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return addUrl.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::addUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:250
* @route '/ohdear/websites/{websiteId}/urls'
*/
addUrl.post = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addUrl.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:296
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
export const deleteUrl = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUrl.url(args, options),
    method: 'delete',
})

deleteUrl.definition = {
    methods: ["delete"],
    url: '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:296
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
deleteUrl.url = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
            ohdearWebsiteId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
        ohdearWebsiteId: args.ohdearWebsiteId,
    }

    return deleteUrl.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace('{ohdearWebsiteId}', parsedArgs.ohdearWebsiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::deleteUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:296
* @route '/ohdear/websites/{websiteId}/urls/{ohdearWebsiteId}'
*/
deleteUrl.delete = (args: { websiteId: string | number, ohdearWebsiteId: string | number } | [websiteId: string | number, ohdearWebsiteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUrl.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
export const uptime = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

uptime.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/uptime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptime.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return uptime.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptime.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::uptime
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:57
* @route '/ohdear/websites/{websiteId}/uptime'
*/
uptime.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: uptime.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:100
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
export const brokenLinks = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

brokenLinks.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/broken-links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:100
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinks.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return brokenLinks.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:100
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinks.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::brokenLinks
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:100
* @route '/ohdear/websites/{websiteId}/broken-links'
*/
brokenLinks.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brokenLinks.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:123
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
export const lighthouse = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

lighthouse.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/lighthouse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:123
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouse.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return lighthouse.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:123
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouse.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouse
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:123
* @route '/ohdear/websites/{websiteId}/lighthouse'
*/
lighthouse.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lighthouse.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseHistory
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:163
* @route '/ohdear/websites/{websiteId}/lighthouse/history/{monitorId}'
*/
export const lighthouseHistory = (args: { websiteId: string | number, monitorId: string | number } | [websiteId: string | number, monitorId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouseHistory.url(args, options),
    method: 'get',
})

lighthouseHistory.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/lighthouse/history/{monitorId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseHistory
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:163
* @route '/ohdear/websites/{websiteId}/lighthouse/history/{monitorId}'
*/
lighthouseHistory.url = (args: { websiteId: string | number, monitorId: string | number } | [websiteId: string | number, monitorId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
            monitorId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
        monitorId: args.monitorId,
    }

    return lighthouseHistory.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace('{monitorId}', parsedArgs.monitorId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseHistory
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:163
* @route '/ohdear/websites/{websiteId}/lighthouse/history/{monitorId}'
*/
lighthouseHistory.get = (args: { websiteId: string | number, monitorId: string | number } | [websiteId: string | number, monitorId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouseHistory.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseHistory
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:163
* @route '/ohdear/websites/{websiteId}/lighthouse/history/{monitorId}'
*/
lighthouseHistory.head = (args: { websiteId: string | number, monitorId: string | number } | [websiteId: string | number, monitorId: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lighthouseHistory.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseReportDetails
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:194
* @route '/ohdear/websites/{websiteId}/lighthouse/report/{monitorId}/{reportId}'
*/
export const lighthouseReportDetails = (args: { websiteId: string | number, monitorId: string | number, reportId: string | number } | [websiteId: string | number, monitorId: string | number, reportId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouseReportDetails.url(args, options),
    method: 'get',
})

lighthouseReportDetails.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/lighthouse/report/{monitorId}/{reportId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseReportDetails
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:194
* @route '/ohdear/websites/{websiteId}/lighthouse/report/{monitorId}/{reportId}'
*/
lighthouseReportDetails.url = (args: { websiteId: string | number, monitorId: string | number, reportId: string | number } | [websiteId: string | number, monitorId: string | number, reportId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
            monitorId: args[1],
            reportId: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
        monitorId: args.monitorId,
        reportId: args.reportId,
    }

    return lighthouseReportDetails.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace('{monitorId}', parsedArgs.monitorId.toString())
            .replace('{reportId}', parsedArgs.reportId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseReportDetails
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:194
* @route '/ohdear/websites/{websiteId}/lighthouse/report/{monitorId}/{reportId}'
*/
lighthouseReportDetails.get = (args: { websiteId: string | number, monitorId: string | number, reportId: string | number } | [websiteId: string | number, monitorId: string | number, reportId: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lighthouseReportDetails.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::lighthouseReportDetails
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:194
* @route '/ohdear/websites/{websiteId}/lighthouse/report/{monitorId}/{reportId}'
*/
lighthouseReportDetails.head = (args: { websiteId: string | number, monitorId: string | number, reportId: string | number } | [websiteId: string | number, monitorId: string | number, reportId: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lighthouseReportDetails.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:227
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
export const sitemap = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

sitemap.definition = {
    methods: ["get","head"],
    url: '/ohdear/websites/{websiteId}/sitemap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:227
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemap.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return sitemap.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:227
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemap.get = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::sitemap
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:227
* @route '/ohdear/websites/{websiteId}/sitemap'
*/
sitemap.head = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sitemap.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::updateSitemapUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:330
* @route '/ohdear/websites/{websiteId}/sitemap-url'
*/
export const updateSitemapUrl = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSitemapUrl.url(args, options),
    method: 'put',
})

updateSitemapUrl.definition = {
    methods: ["put"],
    url: '/ohdear/websites/{websiteId}/sitemap-url',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::updateSitemapUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:330
* @route '/ohdear/websites/{websiteId}/sitemap-url'
*/
updateSitemapUrl.url = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { websiteId: args }
    }

    if (Array.isArray(args)) {
        args = {
            websiteId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        websiteId: args.websiteId,
    }

    return updateSitemapUrl.definition.url
            .replace('{websiteId}', parsedArgs.websiteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ohdear\Http\Controllers\OhdearController::updateSitemapUrl
* @see Modules/Ohdear/app/Http/Controllers/OhdearController.php:330
* @route '/ohdear/websites/{websiteId}/sitemap-url'
*/
updateSitemapUrl.put = (args: { websiteId: string | number } | [websiteId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSitemapUrl.url(args, options),
    method: 'put',
})

const ohdear = {
    setup: Object.assign(setup, setup),
    addUrl: Object.assign(addUrl, addUrl),
    deleteUrl: Object.assign(deleteUrl, deleteUrl),
    uptime: Object.assign(uptime, uptime),
    brokenLinks: Object.assign(brokenLinks, brokenLinks),
    lighthouse: Object.assign(lighthouse, lighthouse),
    lighthouseHistory: Object.assign(lighthouseHistory, lighthouseHistory),
    lighthouseReportDetails: Object.assign(lighthouseReportDetails, lighthouseReportDetails),
    sitemap: Object.assign(sitemap, sitemap),
    updateSitemapUrl: Object.assign(updateSitemapUrl, updateSitemapUrl),
}

export default ohdear