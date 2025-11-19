import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:235
* @route '/timesheet/services/{service}/tasks/attach'
*/
export const attach = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

attach.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/tasks/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:235
* @route '/timesheet/services/{service}/tasks/attach'
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
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:235
* @route '/timesheet/services/{service}/tasks/attach'
*/
attach.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:258
* @route '/timesheet/services/{service}/tasks/{task}'
*/
export const detach = (args: { service: string | { id: string }, task: string | { id: string } } | [service: string | { id: string }, task: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

detach.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}/tasks/{task}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:258
* @route '/timesheet/services/{service}/tasks/{task}'
*/
detach.url = (args: { service: string | { id: string }, task: string | { id: string } } | [service: string | { id: string }, task: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            service: args[0],
            task: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
        task: typeof args.task === 'object'
        ? args.task.id
        : args.task,
    }

    return detach.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:258
* @route '/timesheet/services/{service}/tasks/{task}'
*/
detach.delete = (args: { service: string | { id: string }, task: string | { id: string } } | [service: string | { id: string }, task: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

const tasks = {
    attach: Object.assign(attach, attach),
    detach: Object.assign(detach, detach),
}

export default tasks