import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:18
* @route '/timesheet/services/{service}/budget-periods'
*/
export const index = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/{service}/budget-periods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:18
* @route '/timesheet/services/{service}/budget-periods'
*/
index.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:18
* @route '/timesheet/services/{service}/budget-periods'
*/
index.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:18
* @route '/timesheet/services/{service}/budget-periods'
*/
index.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:18
* @route '/timesheet/services/{service}/budget-periods'
*/
const indexForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:18
* @route '/timesheet/services/{service}/budget-periods'
*/
indexForm.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:18
* @route '/timesheet/services/{service}/budget-periods'
*/
indexForm.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::ledger
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:147
* @route '/timesheet/services/{service}/budget-periods/ledger'
*/
export const ledger = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(args, options),
    method: 'get',
})

ledger.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/{service}/budget-periods/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::ledger
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:147
* @route '/timesheet/services/{service}/budget-periods/ledger'
*/
ledger.url = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return ledger.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::ledger
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:147
* @route '/timesheet/services/{service}/budget-periods/ledger'
*/
ledger.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::ledger
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:147
* @route '/timesheet/services/{service}/budget-periods/ledger'
*/
ledger.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledger.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::ledger
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:147
* @route '/timesheet/services/{service}/budget-periods/ledger'
*/
const ledgerForm = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ledger.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::ledger
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:147
* @route '/timesheet/services/{service}/budget-periods/ledger'
*/
ledgerForm.get = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ledger.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::ledger
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:147
* @route '/timesheet/services/{service}/budget-periods/ledger'
*/
ledgerForm.head = (args: { service: string | number | { id: string | number } } | [service: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ledger.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ledger.form = ledgerForm

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:43
* @route '/timesheet/services/{service}/budget-periods/{period}'
*/
export const show = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/{service}/budget-periods/{period}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:43
* @route '/timesheet/services/{service}/budget-periods/{period}'
*/
show.url = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            service: args[0],
            period: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
        period: typeof args.period === 'object'
        ? args.period.id
        : args.period,
    }

    return show.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:43
* @route '/timesheet/services/{service}/budget-periods/{period}'
*/
show.get = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:43
* @route '/timesheet/services/{service}/budget-periods/{period}'
*/
show.head = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:43
* @route '/timesheet/services/{service}/budget-periods/{period}'
*/
const showForm = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:43
* @route '/timesheet/services/{service}/budget-periods/{period}'
*/
showForm.get = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:43
* @route '/timesheet/services/{service}/budget-periods/{period}'
*/
showForm.head = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::reconcile
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:78
* @route '/timesheet/services/{service}/budget-periods/{period}/reconcile'
*/
export const reconcile = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reconcile.url(args, options),
    method: 'post',
})

reconcile.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/budget-periods/{period}/reconcile',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::reconcile
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:78
* @route '/timesheet/services/{service}/budget-periods/{period}/reconcile'
*/
reconcile.url = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            service: args[0],
            period: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
        period: typeof args.period === 'object'
        ? args.period.id
        : args.period,
    }

    return reconcile.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::reconcile
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:78
* @route '/timesheet/services/{service}/budget-periods/{period}/reconcile'
*/
reconcile.post = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reconcile.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::reconcile
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:78
* @route '/timesheet/services/{service}/budget-periods/{period}/reconcile'
*/
const reconcileForm = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reconcile.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController::reconcile
* @see Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php:78
* @route '/timesheet/services/{service}/budget-periods/{period}/reconcile'
*/
reconcileForm.post = (args: { service: string | number | { id: string | number }, period: string | number | { id: string | number } } | [service: string | number | { id: string | number }, period: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reconcile.url(args, options),
    method: 'post',
})

reconcile.form = reconcileForm

const ServiceBudgetPeriodController = { index, ledger, show, reconcile }

export default ServiceBudgetPeriodController