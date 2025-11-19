import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::index
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:20
* @route '/tickets/automation-rules'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tickets/automation-rules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::index
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:20
* @route '/tickets/automation-rules'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::index
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:20
* @route '/tickets/automation-rules'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::index
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:20
* @route '/tickets/automation-rules'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::create
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:74
* @route '/tickets/automation-rules/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tickets/automation-rules/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::create
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:74
* @route '/tickets/automation-rules/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::create
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:74
* @route '/tickets/automation-rules/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::create
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:74
* @route '/tickets/automation-rules/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::store
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:108
* @route '/tickets/automation-rules'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets/automation-rules',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::store
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:108
* @route '/tickets/automation-rules'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::store
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:108
* @route '/tickets/automation-rules'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::edit
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:160
* @route '/tickets/automation-rules/{automationRule}/edit'
*/
export const edit = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tickets/automation-rules/{automationRule}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::edit
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:160
* @route '/tickets/automation-rules/{automationRule}/edit'
*/
edit.url = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automationRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automationRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automationRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automationRule: typeof args.automationRule === 'object'
        ? args.automationRule.id
        : args.automationRule,
    }

    return edit.definition.url
            .replace('{automationRule}', parsedArgs.automationRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::edit
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:160
* @route '/tickets/automation-rules/{automationRule}/edit'
*/
edit.get = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::edit
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:160
* @route '/tickets/automation-rules/{automationRule}/edit'
*/
edit.head = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::update
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:209
* @route '/tickets/automation-rules/{automationRule}'
*/
export const update = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/tickets/automation-rules/{automationRule}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::update
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:209
* @route '/tickets/automation-rules/{automationRule}'
*/
update.url = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automationRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automationRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automationRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automationRule: typeof args.automationRule === 'object'
        ? args.automationRule.id
        : args.automationRule,
    }

    return update.definition.url
            .replace('{automationRule}', parsedArgs.automationRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::update
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:209
* @route '/tickets/automation-rules/{automationRule}'
*/
update.put = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::destroy
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:265
* @route '/tickets/automation-rules/{automationRule}'
*/
export const destroy = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tickets/automation-rules/{automationRule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::destroy
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:265
* @route '/tickets/automation-rules/{automationRule}'
*/
destroy.url = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automationRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automationRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automationRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automationRule: typeof args.automationRule === 'object'
        ? args.automationRule.id
        : args.automationRule,
    }

    return destroy.definition.url
            .replace('{automationRule}', parsedArgs.automationRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::destroy
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:265
* @route '/tickets/automation-rules/{automationRule}'
*/
destroy.delete = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::toggle
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:278
* @route '/tickets/automation-rules/{automationRule}/toggle'
*/
export const toggle = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '/tickets/automation-rules/{automationRule}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::toggle
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:278
* @route '/tickets/automation-rules/{automationRule}/toggle'
*/
toggle.url = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automationRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automationRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automationRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automationRule: typeof args.automationRule === 'object'
        ? args.automationRule.id
        : args.automationRule,
    }

    return toggle.definition.url
            .replace('{automationRule}', parsedArgs.automationRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::toggle
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:278
* @route '/tickets/automation-rules/{automationRule}/toggle'
*/
toggle.patch = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::priority
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:292
* @route '/tickets/automation-rules/{automationRule}/priority'
*/
export const priority = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: priority.url(args, options),
    method: 'patch',
})

priority.definition = {
    methods: ["patch"],
    url: '/tickets/automation-rules/{automationRule}/priority',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::priority
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:292
* @route '/tickets/automation-rules/{automationRule}/priority'
*/
priority.url = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automationRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automationRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automationRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automationRule: typeof args.automationRule === 'object'
        ? args.automationRule.id
        : args.automationRule,
    }

    return priority.definition.url
            .replace('{automationRule}', parsedArgs.automationRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\AutomationRuleController::priority
* @see Modules/Ticket/app/Http/Controllers/AutomationRuleController.php:292
* @route '/tickets/automation-rules/{automationRule}/priority'
*/
priority.patch = (args: { automationRule: string | { id: string } } | [automationRule: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: priority.url(args, options),
    method: 'patch',
})

const automationRules = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggle: Object.assign(toggle, toggle),
    priority: Object.assign(priority, priority),
}

export default automationRules