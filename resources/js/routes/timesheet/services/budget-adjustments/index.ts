import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
export const store = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
store.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
store.post = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
const storeForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
storeForm.post = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
export const destroy = (args: { service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } } | [service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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
destroy.url = (args: { service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } } | [service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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
destroy.delete = (args: { service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } } | [service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
const destroyForm = (args: { service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } } | [service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
destroyForm.delete = (args: { service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } } | [service: string | number | { id: string | number }, budgetChange: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const budgetAdjustments = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default budgetAdjustments