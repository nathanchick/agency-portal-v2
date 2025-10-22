import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
const indexb50bad1de973323fe6fafa3503921ba9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'get',
})

indexb50bad1de973323fe6fafa3503921ba9.definition = {
    methods: ["get","head"],
    url: '/api/v1/timesheets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
indexb50bad1de973323fe6fafa3503921ba9.url = (options?: RouteQueryOptions) => {
    return indexb50bad1de973323fe6fafa3503921ba9.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
indexb50bad1de973323fe6fafa3503921ba9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
indexb50bad1de973323fe6fafa3503921ba9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
const indexb50bad1de973323fe6fafa3503921ba9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
indexb50bad1de973323fe6fafa3503921ba9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/api/v1/timesheets'
*/
indexb50bad1de973323fe6fafa3503921ba9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb50bad1de973323fe6fafa3503921ba9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexb50bad1de973323fe6fafa3503921ba9.form = indexb50bad1de973323fe6fafa3503921ba9Form
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
const indexf865af4fc5eefae0b80ba822c7f3669a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'get',
})

indexf865af4fc5eefae0b80ba822c7f3669a.definition = {
    methods: ["get","head"],
    url: '/timesheets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
indexf865af4fc5eefae0b80ba822c7f3669a.url = (options?: RouteQueryOptions) => {
    return indexf865af4fc5eefae0b80ba822c7f3669a.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
indexf865af4fc5eefae0b80ba822c7f3669a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
indexf865af4fc5eefae0b80ba822c7f3669a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexf865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
const indexf865af4fc5eefae0b80ba822c7f3669aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexf865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
indexf865af4fc5eefae0b80ba822c7f3669aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexf865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::index
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:13
* @route '/timesheets'
*/
indexf865af4fc5eefae0b80ba822c7f3669aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexf865af4fc5eefae0b80ba822c7f3669a.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexf865af4fc5eefae0b80ba822c7f3669a.form = indexf865af4fc5eefae0b80ba822c7f3669aForm

export const index = {
    '/api/v1/timesheets': indexb50bad1de973323fe6fafa3503921ba9,
    '/timesheets': indexf865af4fc5eefae0b80ba822c7f3669a,
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
const storeb50bad1de973323fe6fafa3503921ba9 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'post',
})

storeb50bad1de973323fe6fafa3503921ba9.definition = {
    methods: ["post"],
    url: '/api/v1/timesheets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
storeb50bad1de973323fe6fafa3503921ba9.url = (options?: RouteQueryOptions) => {
    return storeb50bad1de973323fe6fafa3503921ba9.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
storeb50bad1de973323fe6fafa3503921ba9.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
const storeb50bad1de973323fe6fafa3503921ba9Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/api/v1/timesheets'
*/
storeb50bad1de973323fe6fafa3503921ba9Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb50bad1de973323fe6fafa3503921ba9.url(options),
    method: 'post',
})

storeb50bad1de973323fe6fafa3503921ba9.form = storeb50bad1de973323fe6fafa3503921ba9Form
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
const storef865af4fc5eefae0b80ba822c7f3669a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'post',
})

storef865af4fc5eefae0b80ba822c7f3669a.definition = {
    methods: ["post"],
    url: '/timesheets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
storef865af4fc5eefae0b80ba822c7f3669a.url = (options?: RouteQueryOptions) => {
    return storef865af4fc5eefae0b80ba822c7f3669a.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
storef865af4fc5eefae0b80ba822c7f3669a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
const storef865af4fc5eefae0b80ba822c7f3669aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storef865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::store
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:29
* @route '/timesheets'
*/
storef865af4fc5eefae0b80ba822c7f3669aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storef865af4fc5eefae0b80ba822c7f3669a.url(options),
    method: 'post',
})

storef865af4fc5eefae0b80ba822c7f3669a.form = storef865af4fc5eefae0b80ba822c7f3669aForm

export const store = {
    '/api/v1/timesheets': storeb50bad1de973323fe6fafa3503921ba9,
    '/timesheets': storef865af4fc5eefae0b80ba822c7f3669a,
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
const show3b7ee4d2d09a790d27c103da0c477069 = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'get',
})

show3b7ee4d2d09a790d27c103da0c477069.definition = {
    methods: ["get","head"],
    url: '/api/v1/timesheets/{timesheet}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show3b7ee4d2d09a790d27c103da0c477069.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return show3b7ee4d2d09a790d27c103da0c477069.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show3b7ee4d2d09a790d27c103da0c477069.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show3b7ee4d2d09a790d27c103da0c477069.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
const show3b7ee4d2d09a790d27c103da0c477069Form = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show3b7ee4d2d09a790d27c103da0c477069Form.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/api/v1/timesheets/{timesheet}'
*/
show3b7ee4d2d09a790d27c103da0c477069Form.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show3b7ee4d2d09a790d27c103da0c477069.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show3b7ee4d2d09a790d27c103da0c477069.form = show3b7ee4d2d09a790d27c103da0c477069Form
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
const showd22942639a24a6c0f050d3eb62385eff = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showd22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'get',
})

showd22942639a24a6c0f050d3eb62385eff.definition = {
    methods: ["get","head"],
    url: '/timesheets/{timesheet}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
showd22942639a24a6c0f050d3eb62385eff.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return showd22942639a24a6c0f050d3eb62385eff.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
showd22942639a24a6c0f050d3eb62385eff.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showd22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
showd22942639a24a6c0f050d3eb62385eff.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showd22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
const showd22942639a24a6c0f050d3eb62385effForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showd22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
showd22942639a24a6c0f050d3eb62385effForm.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showd22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::show
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:34
* @route '/timesheets/{timesheet}'
*/
showd22942639a24a6c0f050d3eb62385effForm.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showd22942639a24a6c0f050d3eb62385eff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showd22942639a24a6c0f050d3eb62385eff.form = showd22942639a24a6c0f050d3eb62385effForm

export const show = {
    '/api/v1/timesheets/{timesheet}': show3b7ee4d2d09a790d27c103da0c477069,
    '/timesheets/{timesheet}': showd22942639a24a6c0f050d3eb62385eff,
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
const update3b7ee4d2d09a790d27c103da0c477069 = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'put',
})

update3b7ee4d2d09a790d27c103da0c477069.definition = {
    methods: ["put","patch"],
    url: '/api/v1/timesheets/{timesheet}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update3b7ee4d2d09a790d27c103da0c477069.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return update3b7ee4d2d09a790d27c103da0c477069.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update3b7ee4d2d09a790d27c103da0c477069.put = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update3b7ee4d2d09a790d27c103da0c477069.patch = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
const update3b7ee4d2d09a790d27c103da0c477069Form = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update3b7ee4d2d09a790d27c103da0c477069.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update3b7ee4d2d09a790d27c103da0c477069Form.put = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update3b7ee4d2d09a790d27c103da0c477069.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/api/v1/timesheets/{timesheet}'
*/
update3b7ee4d2d09a790d27c103da0c477069Form.patch = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update3b7ee4d2d09a790d27c103da0c477069.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update3b7ee4d2d09a790d27c103da0c477069.form = update3b7ee4d2d09a790d27c103da0c477069Form
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
const updated22942639a24a6c0f050d3eb62385eff = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'put',
})

updated22942639a24a6c0f050d3eb62385eff.definition = {
    methods: ["put","patch"],
    url: '/timesheets/{timesheet}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
updated22942639a24a6c0f050d3eb62385eff.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return updated22942639a24a6c0f050d3eb62385eff.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
updated22942639a24a6c0f050d3eb62385eff.put = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
updated22942639a24a6c0f050d3eb62385eff.patch = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
const updated22942639a24a6c0f050d3eb62385effForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated22942639a24a6c0f050d3eb62385eff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
updated22942639a24a6c0f050d3eb62385effForm.put = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated22942639a24a6c0f050d3eb62385eff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::update
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:50
* @route '/timesheets/{timesheet}'
*/
updated22942639a24a6c0f050d3eb62385effForm.patch = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated22942639a24a6c0f050d3eb62385eff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updated22942639a24a6c0f050d3eb62385eff.form = updated22942639a24a6c0f050d3eb62385effForm

export const update = {
    '/api/v1/timesheets/{timesheet}': update3b7ee4d2d09a790d27c103da0c477069,
    '/timesheets/{timesheet}': updated22942639a24a6c0f050d3eb62385eff,
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
const destroy3b7ee4d2d09a790d27c103da0c477069 = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'delete',
})

destroy3b7ee4d2d09a790d27c103da0c477069.definition = {
    methods: ["delete"],
    url: '/api/v1/timesheets/{timesheet}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
destroy3b7ee4d2d09a790d27c103da0c477069.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return destroy3b7ee4d2d09a790d27c103da0c477069.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
destroy3b7ee4d2d09a790d27c103da0c477069.delete = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3b7ee4d2d09a790d27c103da0c477069.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
const destroy3b7ee4d2d09a790d27c103da0c477069Form = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy3b7ee4d2d09a790d27c103da0c477069.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/api/v1/timesheets/{timesheet}'
*/
destroy3b7ee4d2d09a790d27c103da0c477069Form.delete = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy3b7ee4d2d09a790d27c103da0c477069.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy3b7ee4d2d09a790d27c103da0c477069.form = destroy3b7ee4d2d09a790d27c103da0c477069Form
/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/timesheets/{timesheet}'
*/
const destroyd22942639a24a6c0f050d3eb62385eff = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyd22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'delete',
})

destroyd22942639a24a6c0f050d3eb62385eff.definition = {
    methods: ["delete"],
    url: '/timesheets/{timesheet}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/timesheets/{timesheet}'
*/
destroyd22942639a24a6c0f050d3eb62385eff.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return destroyd22942639a24a6c0f050d3eb62385eff.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/timesheets/{timesheet}'
*/
destroyd22942639a24a6c0f050d3eb62385eff.delete = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyd22942639a24a6c0f050d3eb62385eff.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/timesheets/{timesheet}'
*/
const destroyd22942639a24a6c0f050d3eb62385effForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyd22942639a24a6c0f050d3eb62385eff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::destroy
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:55
* @route '/timesheets/{timesheet}'
*/
destroyd22942639a24a6c0f050d3eb62385effForm.delete = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyd22942639a24a6c0f050d3eb62385eff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyd22942639a24a6c0f050d3eb62385eff.form = destroyd22942639a24a6c0f050d3eb62385effForm

export const destroy = {
    '/api/v1/timesheets/{timesheet}': destroy3b7ee4d2d09a790d27c103da0c477069,
    '/timesheets/{timesheet}': destroyd22942639a24a6c0f050d3eb62385eff,
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/timesheets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::create
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:21
* @route '/timesheets/create'
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
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
export const edit = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/timesheets/{timesheet}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
edit.url = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timesheet: args }
    }

    if (Array.isArray(args)) {
        args = {
            timesheet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timesheet: args.timesheet,
    }

    return edit.definition.url
            .replace('{timesheet}', parsedArgs.timesheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
edit.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
edit.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
const editForm = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
editForm.get = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\TimesheetController::edit
* @see Modules/Timesheet/app/Http/Controllers/TimesheetController.php:42
* @route '/timesheets/{timesheet}/edit'
*/
editForm.head = (args: { timesheet: string | number } | [timesheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

const TimesheetController = { index, store, show, update, destroy, create, edit }

export default TimesheetController