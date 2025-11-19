import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import performance3c75d9 from './performance'
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

const websites = {
    index: Object.assign(index, index),
    performance: Object.assign(performance, performance3c75d9),
    security: Object.assign(security, security),
}

export default websites