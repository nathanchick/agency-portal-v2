import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/timesheet/services',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::index
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:21
* @route '/timesheet/services'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::create
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:67
* @route '/timesheet/services/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/timesheet/services',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::store
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:88
* @route '/timesheet/services'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
export const show = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/{service}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
show.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
show.get = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::show
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:197
* @route '/timesheet/services/{service}'
*/
show.head = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
export const edit = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/timesheet/services/{service}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
edit.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
edit.get = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::edit
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:122
* @route '/timesheet/services/{service}/edit'
*/
edit.head = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
export const update = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/timesheet/services/{service}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
update.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::update
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:155
* @route '/timesheet/services/{service}'
*/
update.put = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
export const destroy = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
destroy.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroy
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:185
* @route '/timesheet/services/{service}'
*/
destroy.delete = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attachTask
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:235
* @route '/timesheet/services/{service}/tasks/attach'
*/
export const attachTask = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachTask.url(args, options),
    method: 'post',
})

attachTask.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/tasks/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attachTask
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:235
* @route '/timesheet/services/{service}/tasks/attach'
*/
attachTask.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return attachTask.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attachTask
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:235
* @route '/timesheet/services/{service}/tasks/attach'
*/
attachTask.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachTask.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detachTask
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:258
* @route '/timesheet/services/{service}/tasks/{task}'
*/
export const detachTask = (args: { service: string | { id: string }, task: string | { id: string } } | [service: string | { id: string }, task: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachTask.url(args, options),
    method: 'delete',
})

detachTask.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}/tasks/{task}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detachTask
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:258
* @route '/timesheet/services/{service}/tasks/{task}'
*/
detachTask.url = (args: { service: string | { id: string }, task: string | { id: string } } | [service: string | { id: string }, task: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return detachTask.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detachTask
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:258
* @route '/timesheet/services/{service}/tasks/{task}'
*/
detachTask.delete = (args: { service: string | { id: string }, task: string | { id: string } } | [service: string | { id: string }, task: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachTask.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attachUser
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
export const attachUser = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachUser.url(args, options),
    method: 'post',
})

attachUser.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/users/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attachUser
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
attachUser.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return attachUser.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::attachUser
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:269
* @route '/timesheet/services/{service}/users/attach'
*/
attachUser.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachUser.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detachUser
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
export const detachUser = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachUser.url(args, options),
    method: 'delete',
})

detachUser.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detachUser
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
detachUser.url = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            service: args[0],
            user: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        service: typeof args.service === 'object'
        ? args.service.id
        : args.service,
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return detachUser.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::detachUser
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:293
* @route '/timesheet/services/{service}/users/{user}'
*/
detachUser.delete = (args: { service: string | { id: string }, user: string | { id: string } } | [service: string | { id: string }, user: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachUser.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::storeBudgetAdjustment
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
export const storeBudgetAdjustment = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBudgetAdjustment.url(args, options),
    method: 'post',
})

storeBudgetAdjustment.definition = {
    methods: ["post"],
    url: '/timesheet/services/{service}/budget-adjustments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::storeBudgetAdjustment
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
storeBudgetAdjustment.url = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return storeBudgetAdjustment.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::storeBudgetAdjustment
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:331
* @route '/timesheet/services/{service}/budget-adjustments'
*/
storeBudgetAdjustment.post = (args: { service: string | { id: string } } | [service: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBudgetAdjustment.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroyBudgetAdjustment
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
export const destroyBudgetAdjustment = (args: { service: string | { id: string }, budgetChange: string | { id: string } } | [service: string | { id: string }, budgetChange: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyBudgetAdjustment.url(args, options),
    method: 'delete',
})

destroyBudgetAdjustment.definition = {
    methods: ["delete"],
    url: '/timesheet/services/{service}/budget-adjustments/{budgetChange}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroyBudgetAdjustment
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
destroyBudgetAdjustment.url = (args: { service: string | { id: string }, budgetChange: string | { id: string } } | [service: string | { id: string }, budgetChange: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return destroyBudgetAdjustment.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace('{budgetChange}', parsedArgs.budgetChange.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Timesheet\Http\Controllers\ServiceController::destroyBudgetAdjustment
* @see Modules/Timesheet/app/Http/Controllers/ServiceController.php:413
* @route '/timesheet/services/{service}/budget-adjustments/{budgetChange}'
*/
destroyBudgetAdjustment.delete = (args: { service: string | { id: string }, budgetChange: string | { id: string } } | [service: string | { id: string }, budgetChange: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyBudgetAdjustment.url(args, options),
    method: 'delete',
})

const ServiceController = { index, create, store, show, edit, update, destroy, attachTask, detachTask, attachUser, detachUser, storeBudgetAdjustment, destroyBudgetAdjustment }

export default ServiceController