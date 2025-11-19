import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tickets/forms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tickets/forms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets/forms',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
export const edit = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tickets/forms/{ticketForm}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
edit.url = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticketForm: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticketForm: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticketForm: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticketForm: typeof args.ticketForm === 'object'
        ? args.ticketForm.id
        : args.ticketForm,
    }

    return edit.definition.url
            .replace('{ticketForm}', parsedArgs.ticketForm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
edit.get = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::edit
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
edit.head = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
export const update = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/tickets/forms/{ticketForm}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
update.url = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticketForm: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticketForm: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticketForm: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticketForm: typeof args.ticketForm === 'object'
        ? args.ticketForm.id
        : args.ticketForm,
    }

    return update.definition.url
            .replace('{ticketForm}', parsedArgs.ticketForm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::update
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
update.put = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
export const destroy = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tickets/forms/{ticketForm}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
destroy.url = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticketForm: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticketForm: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticketForm: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticketForm: typeof args.ticketForm === 'object'
        ? args.ticketForm.id
        : args.ticketForm,
    }

    return destroy.definition.url
            .replace('{ticketForm}', parsedArgs.ticketForm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
destroy.delete = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const forms = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default forms