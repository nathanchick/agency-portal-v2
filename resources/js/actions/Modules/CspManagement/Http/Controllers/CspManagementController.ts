import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
const index8970b3945ed2c3a1a3b71e7e4b450e6f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'get',
})

index8970b3945ed2c3a1a3b71e7e4b450e6f.definition = {
    methods: ["get","head"],
    url: '/api/v1/cspmanagements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index8970b3945ed2c3a1a3b71e7e4b450e6f.url = (options?: RouteQueryOptions) => {
    return index8970b3945ed2c3a1a3b71e7e4b450e6f.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index8970b3945ed2c3a1a3b71e7e4b450e6f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index8970b3945ed2c3a1a3b71e7e4b450e6f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
const index8970b3945ed2c3a1a3b71e7e4b450e6fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index8970b3945ed2c3a1a3b71e7e4b450e6fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/api/v1/cspmanagements'
*/
index8970b3945ed2c3a1a3b71e7e4b450e6fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8970b3945ed2c3a1a3b71e7e4b450e6f.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index8970b3945ed2c3a1a3b71e7e4b450e6f.form = index8970b3945ed2c3a1a3b71e7e4b450e6fForm
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
const index6ecd0b6caf393beabc0b77c94bb586d5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'get',
})

index6ecd0b6caf393beabc0b77c94bb586d5.definition = {
    methods: ["get","head"],
    url: '/cspmanagements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index6ecd0b6caf393beabc0b77c94bb586d5.url = (options?: RouteQueryOptions) => {
    return index6ecd0b6caf393beabc0b77c94bb586d5.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index6ecd0b6caf393beabc0b77c94bb586d5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index6ecd0b6caf393beabc0b77c94bb586d5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
const index6ecd0b6caf393beabc0b77c94bb586d5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index6ecd0b6caf393beabc0b77c94bb586d5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::index
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:13
* @route '/cspmanagements'
*/
index6ecd0b6caf393beabc0b77c94bb586d5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6ecd0b6caf393beabc0b77c94bb586d5.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index6ecd0b6caf393beabc0b77c94bb586d5.form = index6ecd0b6caf393beabc0b77c94bb586d5Form

export const index = {
    '/api/v1/cspmanagements': index8970b3945ed2c3a1a3b71e7e4b450e6f,
    '/cspmanagements': index6ecd0b6caf393beabc0b77c94bb586d5,
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
const store8970b3945ed2c3a1a3b71e7e4b450e6f = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'post',
})

store8970b3945ed2c3a1a3b71e7e4b450e6f.definition = {
    methods: ["post"],
    url: '/api/v1/cspmanagements',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
store8970b3945ed2c3a1a3b71e7e4b450e6f.url = (options?: RouteQueryOptions) => {
    return store8970b3945ed2c3a1a3b71e7e4b450e6f.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
store8970b3945ed2c3a1a3b71e7e4b450e6f.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
const store8970b3945ed2c3a1a3b71e7e4b450e6fForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/api/v1/cspmanagements'
*/
store8970b3945ed2c3a1a3b71e7e4b450e6fForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store8970b3945ed2c3a1a3b71e7e4b450e6f.url(options),
    method: 'post',
})

store8970b3945ed2c3a1a3b71e7e4b450e6f.form = store8970b3945ed2c3a1a3b71e7e4b450e6fForm
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
const store6ecd0b6caf393beabc0b77c94bb586d5 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'post',
})

store6ecd0b6caf393beabc0b77c94bb586d5.definition = {
    methods: ["post"],
    url: '/cspmanagements',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
store6ecd0b6caf393beabc0b77c94bb586d5.url = (options?: RouteQueryOptions) => {
    return store6ecd0b6caf393beabc0b77c94bb586d5.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
store6ecd0b6caf393beabc0b77c94bb586d5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
const store6ecd0b6caf393beabc0b77c94bb586d5Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::store
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:29
* @route '/cspmanagements'
*/
store6ecd0b6caf393beabc0b77c94bb586d5Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store6ecd0b6caf393beabc0b77c94bb586d5.url(options),
    method: 'post',
})

store6ecd0b6caf393beabc0b77c94bb586d5.form = store6ecd0b6caf393beabc0b77c94bb586d5Form

export const store = {
    '/api/v1/cspmanagements': store8970b3945ed2c3a1a3b71e7e4b450e6f,
    '/cspmanagements': store6ecd0b6caf393beabc0b77c94bb586d5,
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
const show6547d64786c7ae0f810c9a6fed4fafc4 = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'get',
})

show6547d64786c7ae0f810c9a6fed4fafc4.definition = {
    methods: ["get","head"],
    url: '/api/v1/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
show6547d64786c7ae0f810c9a6fed4fafc4.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return show6547d64786c7ae0f810c9a6fed4fafc4.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
show6547d64786c7ae0f810c9a6fed4fafc4.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
show6547d64786c7ae0f810c9a6fed4fafc4.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
const show6547d64786c7ae0f810c9a6fed4fafc4Form = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
show6547d64786c7ae0f810c9a6fed4fafc4Form.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
show6547d64786c7ae0f810c9a6fed4fafc4Form.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6547d64786c7ae0f810c9a6fed4fafc4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show6547d64786c7ae0f810c9a6fed4fafc4.form = show6547d64786c7ae0f810c9a6fed4fafc4Form
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
const show0fb226e4c6524297c726e96bd138ac1c = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'get',
})

show0fb226e4c6524297c726e96bd138ac1c.definition = {
    methods: ["get","head"],
    url: '/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show0fb226e4c6524297c726e96bd138ac1c.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return show0fb226e4c6524297c726e96bd138ac1c.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show0fb226e4c6524297c726e96bd138ac1c.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show0fb226e4c6524297c726e96bd138ac1c.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
const show0fb226e4c6524297c726e96bd138ac1cForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show0fb226e4c6524297c726e96bd138ac1cForm.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::show
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:34
* @route '/cspmanagements/{cspmanagement}'
*/
show0fb226e4c6524297c726e96bd138ac1cForm.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show0fb226e4c6524297c726e96bd138ac1c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show0fb226e4c6524297c726e96bd138ac1c.form = show0fb226e4c6524297c726e96bd138ac1cForm

export const show = {
    '/api/v1/cspmanagements/{cspmanagement}': show6547d64786c7ae0f810c9a6fed4fafc4,
    '/cspmanagements/{cspmanagement}': show0fb226e4c6524297c726e96bd138ac1c,
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
const update6547d64786c7ae0f810c9a6fed4fafc4 = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'put',
})

update6547d64786c7ae0f810c9a6fed4fafc4.definition = {
    methods: ["put","patch"],
    url: '/api/v1/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
update6547d64786c7ae0f810c9a6fed4fafc4.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return update6547d64786c7ae0f810c9a6fed4fafc4.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
update6547d64786c7ae0f810c9a6fed4fafc4.put = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'put',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
update6547d64786c7ae0f810c9a6fed4fafc4.patch = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
const update6547d64786c7ae0f810c9a6fed4fafc4Form = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update6547d64786c7ae0f810c9a6fed4fafc4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
update6547d64786c7ae0f810c9a6fed4fafc4Form.put = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update6547d64786c7ae0f810c9a6fed4fafc4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
update6547d64786c7ae0f810c9a6fed4fafc4Form.patch = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update6547d64786c7ae0f810c9a6fed4fafc4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update6547d64786c7ae0f810c9a6fed4fafc4.form = update6547d64786c7ae0f810c9a6fed4fafc4Form
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
const update0fb226e4c6524297c726e96bd138ac1c = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'put',
})

update0fb226e4c6524297c726e96bd138ac1c.definition = {
    methods: ["put","patch"],
    url: '/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update0fb226e4c6524297c726e96bd138ac1c.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return update0fb226e4c6524297c726e96bd138ac1c.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update0fb226e4c6524297c726e96bd138ac1c.put = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'put',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update0fb226e4c6524297c726e96bd138ac1c.patch = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
const update0fb226e4c6524297c726e96bd138ac1cForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update0fb226e4c6524297c726e96bd138ac1c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update0fb226e4c6524297c726e96bd138ac1cForm.put = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update0fb226e4c6524297c726e96bd138ac1c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::update
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:50
* @route '/cspmanagements/{cspmanagement}'
*/
update0fb226e4c6524297c726e96bd138ac1cForm.patch = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update0fb226e4c6524297c726e96bd138ac1c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update0fb226e4c6524297c726e96bd138ac1c.form = update0fb226e4c6524297c726e96bd138ac1cForm

export const update = {
    '/api/v1/cspmanagements/{cspmanagement}': update6547d64786c7ae0f810c9a6fed4fafc4,
    '/cspmanagements/{cspmanagement}': update0fb226e4c6524297c726e96bd138ac1c,
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
const destroy6547d64786c7ae0f810c9a6fed4fafc4 = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'delete',
})

destroy6547d64786c7ae0f810c9a6fed4fafc4.definition = {
    methods: ["delete"],
    url: '/api/v1/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
destroy6547d64786c7ae0f810c9a6fed4fafc4.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return destroy6547d64786c7ae0f810c9a6fed4fafc4.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
destroy6547d64786c7ae0f810c9a6fed4fafc4.delete = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy6547d64786c7ae0f810c9a6fed4fafc4.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
const destroy6547d64786c7ae0f810c9a6fed4fafc4Form = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy6547d64786c7ae0f810c9a6fed4fafc4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/api/v1/cspmanagements/{cspmanagement}'
*/
destroy6547d64786c7ae0f810c9a6fed4fafc4Form.delete = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy6547d64786c7ae0f810c9a6fed4fafc4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy6547d64786c7ae0f810c9a6fed4fafc4.form = destroy6547d64786c7ae0f810c9a6fed4fafc4Form
/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
const destroy0fb226e4c6524297c726e96bd138ac1c = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'delete',
})

destroy0fb226e4c6524297c726e96bd138ac1c.definition = {
    methods: ["delete"],
    url: '/cspmanagements/{cspmanagement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
destroy0fb226e4c6524297c726e96bd138ac1c.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return destroy0fb226e4c6524297c726e96bd138ac1c.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
destroy0fb226e4c6524297c726e96bd138ac1c.delete = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy0fb226e4c6524297c726e96bd138ac1c.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
const destroy0fb226e4c6524297c726e96bd138ac1cForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy0fb226e4c6524297c726e96bd138ac1c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::destroy
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:55
* @route '/cspmanagements/{cspmanagement}'
*/
destroy0fb226e4c6524297c726e96bd138ac1cForm.delete = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy0fb226e4c6524297c726e96bd138ac1c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy0fb226e4c6524297c726e96bd138ac1c.form = destroy0fb226e4c6524297c726e96bd138ac1cForm

export const destroy = {
    '/api/v1/cspmanagements/{cspmanagement}': destroy6547d64786c7ae0f810c9a6fed4fafc4,
    '/cspmanagements/{cspmanagement}': destroy0fb226e4c6524297c726e96bd138ac1c,
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cspmanagements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::create
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:21
* @route '/cspmanagements/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
export const edit = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/cspmanagements/{cspmanagement}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
edit.url = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cspmanagement: args }
    }

    if (Array.isArray(args)) {
        args = {
            cspmanagement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cspmanagement: args.cspmanagement,
    }

    return edit.definition.url
            .replace('{cspmanagement}', parsedArgs.cspmanagement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
edit.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
edit.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
const editForm = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
editForm.get = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\CspManagement\Http\Controllers\CspManagementController::edit
* @see Modules/CspManagement/app/Http/Controllers/CspManagementController.php:42
* @route '/cspmanagements/{cspmanagement}/edit'
*/
editForm.head = (args: { cspmanagement: string | number } | [cspmanagement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

const CspManagementController = { index, store, show, update, destroy, create, edit }

export default CspManagementController