import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:233
* @route '/timesheet/services/{service}/tasks/attach'
*/
export const attach = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

attach.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/tasks/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:233
* @route '/timesheet/services/{service}/tasks/attach'
*/
attach.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:233
* @route '/timesheet/services/{service}/tasks/attach'
*/
attach.post = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:233
* @route '/timesheet/services/{service}/tasks/attach'
*/
const attachForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attach.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:233
* @route '/timesheet/services/{service}/tasks/attach'
*/
attachForm.post = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attach.url(args, options),
    method: 'post',
})

attach.form = attachForm

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:256
* @route '/timesheet/services/{service}/tasks/{task}'
*/
export const detach = (args: { service: string | number | { id: string | number }, task: string | number | { id: string | number } } | [service: string | number | { id: string | number }, task: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

detach.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}/tasks/{task}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:256
* @route '/timesheet/services/{service}/tasks/{task}'
*/
detach.url = (args: { service: string | number | { id: string | number }, task: string | number | { id: string | number } } | [service: string | number | { id: string | number }, task: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:256
* @route '/timesheet/services/{service}/tasks/{task}'
*/
detach.delete = (args: { service: string | number | { id: string | number }, task: string | number | { id: string | number } } | [service: string | number | { id: string | number }, task: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detach
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:256
* @route '/timesheet/services/{service}/tasks/{task}'
*/
const detachForm = (args: { service: string | number | { id: string | number }, task: string | number | { id: string | number } } | [service: string | number | { id: string | number }, task: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:256
* @route '/timesheet/services/{service}/tasks/{task}'
*/
detachForm.delete = (args: { service: string | number | { id: string | number }, task: string | number | { id: string | number } } | [service: string | number | { id: string | number }, task: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: detach.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

detach.form = detachForm

const tasks = {
    attach: Object.assign(attach, attach),
    detach: Object.assign(detach, detach),
}

export default tasks