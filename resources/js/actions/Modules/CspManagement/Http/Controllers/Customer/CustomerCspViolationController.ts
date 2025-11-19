import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::index
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:25
* @route '/customer/csp-violations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::index
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:25
* @route '/customer/csp-violations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::index
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:25
* @route '/customer/csp-violations'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::resolved
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:86
* @route '/customer/csp-violations/resolved'
*/
const resolvedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resolved.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::resolved
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:86
* @route '/customer/csp-violations/resolved'
*/
resolvedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resolved.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::resolved
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:86
* @route '/customer/csp-violations/resolved'
*/
resolvedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resolved.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

resolved.form = resolvedForm

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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::audit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:361
* @route '/customer/csp-violations/audit'
*/
const auditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: audit.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::audit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:361
* @route '/customer/csp-violations/audit'
*/
auditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: audit.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::audit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:361
* @route '/customer/csp-violations/audit'
*/
auditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: audit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

audit.form = auditForm

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportAudit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
export const exportAudit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAudit.url(options),
    method: 'get',
})

exportAudit.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/audit/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportAudit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportAudit.url = (options?: RouteQueryOptions) => {
    return exportAudit.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportAudit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportAudit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAudit.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportAudit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportAudit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportAudit.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportAudit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
const exportAuditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportAudit.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportAudit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportAuditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportAudit.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::exportAudit
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:395
* @route '/customer/csp-violations/audit/export'
*/
exportAuditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportAudit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportAudit.form = exportAuditForm

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showPolicy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
export const showPolicy = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPolicy.url(args, options),
    method: 'get',
})

showPolicy.definition = {
    methods: ["get","head"],
    url: '/customer/csp-violations/policy/{website}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showPolicy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
showPolicy.url = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showPolicy.definition.url
            .replace('{website}', parsedArgs.website.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showPolicy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
showPolicy.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPolicy.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showPolicy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
showPolicy.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPolicy.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showPolicy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
const showPolicyForm = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPolicy.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showPolicy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
showPolicyForm.get = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPolicy.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showPolicy
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:491
* @route '/customer/csp-violations/policy/{website}'
*/
showPolicyForm.head = (args: { website: string | number } | [website: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPolicy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showPolicy.form = showPolicyForm

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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showHost
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:139
* @route '/customer/csp-violations/host/{host}/{directive}'
*/
const showHostForm = (args: { host: string | number, directive: string | number } | [host: string | number, directive: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showHost.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showHost
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:139
* @route '/customer/csp-violations/host/{host}/{directive}'
*/
showHostForm.get = (args: { host: string | number, directive: string | number } | [host: string | number, directive: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showHost.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::showHost
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:139
* @route '/customer/csp-violations/host/{host}/{directive}'
*/
showHostForm.head = (args: { host: string | number, directive: string | number } | [host: string | number, directive: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showHost.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showHost.form = showHostForm

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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::show
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:174
* @route '/customer/csp-violations/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::show
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:174
* @route '/customer/csp-violations/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::show
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:174
* @route '/customer/csp-violations/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::approve
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:194
* @route '/customer/csp-violations/approve'
*/
const approveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::approve
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:194
* @route '/customer/csp-violations/approve'
*/
approveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(options),
    method: 'post',
})

approve.form = approveForm

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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::reject
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:243
* @route '/customer/csp-violations/reject'
*/
const rejectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::reject
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:243
* @route '/customer/csp-violations/reject'
*/
rejectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(options),
    method: 'post',
})

reject.form = rejectForm

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
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::ignore
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:292
* @route '/customer/csp-violations/ignore'
*/
const ignoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ignore.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::ignore
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:292
* @route '/customer/csp-violations/ignore'
*/
ignoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ignore.url(options),
    method: 'post',
})

ignore.form = ignoreForm

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

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::sync
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:341
* @route '/customer/csp-violations/sync'
*/
const syncForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController::sync
* @see Modules/CspManagement/app/Http/Controllers/Customer/CustomerCspViolationController.php:341
* @route '/customer/csp-violations/sync'
*/
syncForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

sync.form = syncForm

const CustomerCspViolationController = { index, resolved, audit, exportAudit, showPolicy, showHost, show, approve, reject, ignore, sync }

export default CustomerCspViolationController