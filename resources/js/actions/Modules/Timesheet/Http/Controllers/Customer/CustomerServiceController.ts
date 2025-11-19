import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:15
* @route '/customer/timesheet/services/{service}'
*/
export const show = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/customer/timesheet/services/{service}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:15
* @route '/customer/timesheet/services/{service}'
*/
show.url = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: args.service,
    }

    return show.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:15
* @route '/customer/timesheet/services/{service}'
*/
show.get = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:15
* @route '/customer/timesheet/services/{service}'
*/
show.head = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::ledger
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:55
* @route '/customer/timesheet/services/{service}/ledger'
*/
export const ledger = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(args, options),
    method: 'get',
})

ledger.definition = {
    methods: ["get","head"],
    url: '/customer/timesheet/services/{service}/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::ledger
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:55
* @route '/customer/timesheet/services/{service}/ledger'
*/
ledger.url = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

    if (Array.isArray(args)) {
        args = {
            service: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: args.service,
    }

    return ledger.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::ledger
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:55
* @route '/customer/timesheet/services/{service}/ledger'
*/
ledger.get = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController::ledger
* @see Modules/Timesheet/app/Http/Controllers/Customer/CustomerServiceController.php:55
* @route '/customer/timesheet/services/{service}/ledger'
*/
ledger.head = (args: { service: string | number } | [service: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledger.url(args, options),
    method: 'head',
})

const CustomerServiceController = { show, ledger }

export default CustomerServiceController