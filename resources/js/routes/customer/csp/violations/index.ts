import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import audit4a8d1e from './audit'
/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::index
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:25
* @route '/customer/csp-violations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::index
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:25
* @route '/customer/csp-violations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::index
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:25
* @route '/customer/csp-violations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::index
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:25
* @route '/customer/csp-violations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::resolved
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:86
* @route '/customer/csp-violations/resolved'
*/
export const resolved = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolved.url(options),
    method: 'get',
})

resolved.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/resolved',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::resolved
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:86
* @route '/customer/csp-violations/resolved'
*/
resolved.url = (options?: RouteQueryOptions) => {
    return resolved.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::resolved
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:86
* @route '/customer/csp-violations/resolved'
*/
resolved.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolved.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::resolved
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:86
* @route '/customer/csp-violations/resolved'
*/
resolved.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resolved.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::audit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:361
* @route '/customer/csp-violations/audit'
*/
export const audit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: audit.url(options),
    method: 'get',
})

audit.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/audit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::audit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:361
* @route '/customer/csp-violations/audit'
*/
audit.url = (options?: RouteQueryOptions) => {
    return audit.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::audit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:361
* @route '/customer/csp-violations/audit'
*/
audit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: audit.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::audit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:361
* @route '/customer/csp-violations/audit'
*/
audit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: audit.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::policy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
export const policy = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: policy.url(args, options),
    method: 'get',
})

policy.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/policy/{website}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::policy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
policy.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return policy.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::policy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
policy.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: policy.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::policy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
policy.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: policy.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showHost
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:139
* @route '/customer/csp-violations/host/{host}/{directive}'
*/
export const showHost = (args: { host: string | number, directive: string | number } | [host: string | number, directive: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showHost.url(args, options),
    method: 'get',
})

showHost.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/host/{host}/{directive}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showHost
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:139
* @route '/customer/csp-violations/host/{host}/{directive}'
*/
showHost.url = (args: { host: string | number, directive: string | number } | [host: string | number, directive: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            host: args[0],
            directive: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        host: args.host,
        directive: args.directive,
    }

    return showHost.definition.url
            .replace('{host}', parsedArgs.host.toString())
            .replace('{directive}', parsedArgs.directive.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showHost
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:139
* @route '/customer/csp-violations/host/{host}/{directive}'
*/
showHost.get = (args: { host: string | number, directive: string | number } | [host: string | number, directive: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showHost.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showHost
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:139
* @route '/customer/csp-violations/host/{host}/{directive}'
*/
showHost.head = (args: { host: string | number, directive: string | number } | [host: string | number, directive: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showHost.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::show
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:174
* @route '/customer/csp-violations/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::show
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:174
* @route '/customer/csp-violations/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::show
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:174
* @route '/customer/csp-violations/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::show
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:174
* @route '/customer/csp-violations/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::approve
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:194
* @route '/customer/csp-violations/approve'
*/
export const approve = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/customer/csp-violations/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::approve
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:194
* @route '/customer/csp-violations/approve'
*/
approve.url = (options?: RouteQueryOptions) => {
    return approve.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::approve
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:194
* @route '/customer/csp-violations/approve'
*/
approve.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::reject
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:243
* @route '/customer/csp-violations/reject'
*/
export const reject = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/customer/csp-violations/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::reject
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:243
* @route '/customer/csp-violations/reject'
*/
reject.url = (options?: RouteQueryOptions) => {
    return reject.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::reject
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:243
* @route '/customer/csp-violations/reject'
*/
reject.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::ignore
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:292
* @route '/customer/csp-violations/ignore'
*/
export const ignore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ignore.url(options),
    method: 'post',
})

ignore.definition = {
    methods: ["post"],
    url: '/customer/csp-violations/ignore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::ignore
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:292
* @route '/customer/csp-violations/ignore'
*/
ignore.url = (options?: RouteQueryOptions) => {
    return ignore.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::ignore
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:292
* @route '/customer/csp-violations/ignore'
*/
ignore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ignore.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::sync
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:341
* @route '/customer/csp-violations/sync'
*/
export const sync = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/customer/csp-violations/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::sync
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:341
* @route '/customer/csp-violations/sync'
*/
sync.url = (options?: RouteQueryOptions) => {
    return sync.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::sync
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:341
* @route '/customer/csp-violations/sync'
*/
sync.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

const violations = {
    index: Object.assign(index, index),
    resolved: Object.assign(resolved, resolved),
    audit: Object.assign(audit, audit4a8d1e),
    policy: Object.assign(policy, policy),
    showHost: Object.assign(showHost, showHost),
    show: Object.assign(show, show),
    approve: Object.assign(approve, approve),
    reject: Object.assign(reject, reject),
    ignore: Object.assign(ignore, ignore),
    sync: Object.assign(sync, sync),
}

export default violations