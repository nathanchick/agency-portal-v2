import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
export const attach = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

attach.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/users/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
attach.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { service: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
    }

    return attach.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
attach.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
const attachForm = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attach.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
attachForm.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attach.url(args, options),
    method: 'post',
})

attach.form = attachForm

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
export const detach = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

detach.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
detach.url = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            service: args[0],
            user: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return detach.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
detach.delete = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
const detachForm = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: detach.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
detachForm.delete = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: detach.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

detach.form = detachForm

const users = {
    attach: Object.assign(attach, attach),
    detach: Object.assign(detach, detach),
}

export default users