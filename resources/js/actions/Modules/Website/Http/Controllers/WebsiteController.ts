import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
const index87030a6d51e278e383690f38c04b0670 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'get',
})

index87030a6d51e278e383690f38c04b0670.definition = {
    methods: ["get","head"],
    url: '/api/v1/websites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670.url = (options?: RouteQueryOptions) => {
    return index87030a6d51e278e383690f38c04b0670.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/api/v1/websites'
*/
index87030a6d51e278e383690f38c04b0670.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index87030a6d51e278e383690f38c04b0670.url(options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/websites'
*/
const index0d6d11c6003bae51aabe78809ed722ab = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'get',
})

index0d6d11c6003bae51aabe78809ed722ab.definition = {
    methods: ["get","head"],
    url: '/websites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722ab.url = (options?: RouteQueryOptions) => {
    return index0d6d11c6003bae51aabe78809ed722ab.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722ab.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::index
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:19
* @route '/websites'
*/
index0d6d11c6003bae51aabe78809ed722ab.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index0d6d11c6003bae51aabe78809ed722ab.url(options),
    method: 'head',
})

export const index = {
    '/api/v1/websites': index87030a6d51e278e383690f38c04b0670,
    '/websites': index0d6d11c6003bae51aabe78809ed722ab,
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/websites',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::store
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
export const show = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/websites/{website}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
show.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
show.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::show
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
show.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
const updatef36216e1b3ef283ab2953682f239e84e = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef36216e1b3ef283ab2953682f239e84e.url(args, options),
    method: 'put',
})

updatef36216e1b3ef283ab2953682f239e84e.definition = {
    methods: ["put","patch"],
    url: '/api/v1/websites/{website}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
updatef36216e1b3ef283ab2953682f239e84e.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatef36216e1b3ef283ab2953682f239e84e.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
updatef36216e1b3ef283ab2953682f239e84e.put = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef36216e1b3ef283ab2953682f239e84e.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/api/v1/websites/{website}'
*/
updatef36216e1b3ef283ab2953682f239e84e.patch = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatef36216e1b3ef283ab2953682f239e84e.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/websites/{id}'
*/
const updateb68aea2c530ec496d47a00dc7e7b5049 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb68aea2c530ec496d47a00dc7e7b5049.url(args, options),
    method: 'put',
})

updateb68aea2c530ec496d47a00dc7e7b5049.definition = {
    methods: ["put"],
    url: '/websites/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/websites/{id}'
*/
updateb68aea2c530ec496d47a00dc7e7b5049.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateb68aea2c530ec496d47a00dc7e7b5049.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:185
* @route '/websites/{id}'
*/
updateb68aea2c530ec496d47a00dc7e7b5049.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb68aea2c530ec496d47a00dc7e7b5049.url(args, options),
    method: 'put',
})

export const update = {
    '/api/v1/websites/{website}': updatef36216e1b3ef283ab2953682f239e84e,
    '/websites/{id}': updateb68aea2c530ec496d47a00dc7e7b5049,
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
export const destroy = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/websites/{website}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
destroy.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::destroy
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:0
* @route '/api/v1/websites/{website}'
*/
destroy.delete = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::edit
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:150
* @route '/websites/{id}/edit'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::edit
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:150
* @route '/websites/{id}/edit'
*/
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::edit
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:150
* @route '/websites/{id}/edit'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::edit
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:150
* @route '/websites/{id}/edit'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::updateModuleSettings
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:212
* @route '/websites/{id}/modules'
*/
export const updateModuleSettings = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateModuleSettings.url(args, options),
    method: 'patch',
})

updateModuleSettings.definition = {
    methods: ["patch"],
    url: '/websites/{id}/modules',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::updateModuleSettings
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:212
* @route '/websites/{id}/modules'
*/
updateModuleSettings.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateModuleSettings.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::updateModuleSettings
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:212
* @route '/websites/{id}/modules'
*/
updateModuleSettings.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateModuleSettings.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:43
* @route '/websites/{id}/performance'
*/
export const performance = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})

performance.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:43
* @route '/websites/{id}/performance'
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
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:43
* @route '/websites/{id}/performance'
*/
performance.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performance.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performance
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:43
* @route '/websites/{id}/performance'
*/
performance.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performance.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
*/
export const performanceUptime = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceUptime.url(args, options),
    method: 'get',
})

performanceUptime.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/uptime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
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
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
*/
performanceUptime.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceUptime.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceUptime
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:51
* @route '/websites/{id}/performance/uptime'
*/
performanceUptime.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceUptime.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
*/
export const performanceBrokenLinks = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceBrokenLinks.url(args, options),
    method: 'get',
})

performanceBrokenLinks.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/broken-links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
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
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
*/
performanceBrokenLinks.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceBrokenLinks.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceBrokenLinks
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:71
* @route '/websites/{id}/performance/broken-links'
*/
performanceBrokenLinks.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceBrokenLinks.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
*/
export const performanceLighthouse = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceLighthouse.url(args, options),
    method: 'get',
})

performanceLighthouse.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/lighthouse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
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
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
*/
performanceLighthouse.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceLighthouse.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceLighthouse
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:91
* @route '/websites/{id}/performance/lighthouse'
*/
performanceLighthouse.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceLighthouse.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
*/
export const performanceSitemap = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceSitemap.url(args, options),
    method: 'get',
})

performanceSitemap.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/performance/sitemap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
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
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
*/
performanceSitemap.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: performanceSitemap.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::performanceSitemap
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:111
* @route '/websites/{id}/performance/sitemap'
*/
performanceSitemap.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: performanceSitemap.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:131
* @route '/websites/{id}/security'
*/
export const security = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: security.url(args, options),
    method: 'get',
})

security.definition = {
    methods: ["get","head"],
    url: '/websites/{id}/security',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:131
* @route '/websites/{id}/security'
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
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:131
* @route '/websites/{id}/security'
*/
security.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: security.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::security
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:131
* @route '/websites/{id}/security'
*/
security.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: security.url(args, options),
    method: 'head',
})

const WebsiteController = { index, store, show, update, destroy, edit, updateModuleSettings, performance, performanceUptime, performanceBrokenLinks, performanceLighthouse, performanceSitemap, security }

export default WebsiteController