import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
export const store = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/budget-adjustments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
store.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
store.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
export const destroy = (args: { service: string | { id: string }, budgetChange: string | { id: string } } | [service: string | { id: string }, budgetChange: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}/budget-adjustments/{budgetChange}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
destroy.url = (args: { service: string | { id: string }, budgetChange: string | { id: string } } | [service: string | { id: string }, budgetChange: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            service: args[0],
            budgetChange: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
        budgetChange: typeof args.budgetChange === 'object'
        ? args.budgetChange.id
        : args.budgetChange,
    }

    return destroy.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{budgetChange}', parsedArgs.budgetChange.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
destroy.delete = (args: { service: string | { id: string }, budgetChange: string | { id: string } } | [service: string | { id: string }, budgetChange: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const budgetAdjustments = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default budgetAdjustments