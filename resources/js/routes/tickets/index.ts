import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import filters from './filters'
import forms from './forms'
import automationRules from './automation-rules'
import labels from './labels'
import categories from './categories'
import statuses from './statuses'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:26
* @route '/tickets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:26
* @route '/tickets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:26
* @route '/tickets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:26
* @route '/tickets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:26
* @route '/tickets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:26
* @route '/tickets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:26
* @route '/tickets'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:155
* @route '/tickets/config'
*/
export const config = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

config.definition = {
    methods: ["get","head"],
    url: '/tickets/config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:155
* @route '/tickets/config'
*/
config.url = (options?: RouteQueryOptions) => {
    return config.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:155
* @route '/tickets/config'
*/
config.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:155
* @route '/tickets/config'
*/
config.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: config.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:155
* @route '/tickets/config'
*/
const configForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:155
* @route '/tickets/config'
*/
configForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:155
* @route '/tickets/config'
*/
configForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: config.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

config.form = configForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:454
* @route '/tickets/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:454
* @route '/tickets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:454
* @route '/tickets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:454
* @route '/tickets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:454
* @route '/tickets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:454
* @route '/tickets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:454
* @route '/tickets/create'
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
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:483
* @route '/tickets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:483
* @route '/tickets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:483
* @route '/tickets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:483
* @route '/tickets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:483
* @route '/tickets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:521
* @route '/tickets/{ticket}'
*/
export const show = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:521
* @route '/tickets/{ticket}'
*/
show.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return show.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:521
* @route '/tickets/{ticket}'
*/
show.get = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:521
* @route '/tickets/{ticket}'
*/
show.head = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:521
* @route '/tickets/{ticket}'
*/
const showForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:521
* @route '/tickets/{ticket}'
*/
showForm.get = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:521
* @route '/tickets/{ticket}'
*/
showForm.head = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatus
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:612
* @route '/tickets/{ticket}/status'
*/
export const updateStatus = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/tickets/{ticket}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatus
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:612
* @route '/tickets/{ticket}/status'
*/
updateStatus.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return updateStatus.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatus
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:612
* @route '/tickets/{ticket}/status'
*/
updateStatus.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatus
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:612
* @route '/tickets/{ticket}/status'
*/
const updateStatusForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatus
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:612
* @route '/tickets/{ticket}/status'
*/
updateStatusForm.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateStatus.form = updateStatusForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updatePriority
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:637
* @route '/tickets/{ticket}/priority'
*/
export const updatePriority = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePriority.url(args, options),
    method: 'patch',
})

updatePriority.definition = {
    methods: ["patch"],
    url: '/tickets/{ticket}/priority',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updatePriority
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:637
* @route '/tickets/{ticket}/priority'
*/
updatePriority.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return updatePriority.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updatePriority
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:637
* @route '/tickets/{ticket}/priority'
*/
updatePriority.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePriority.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updatePriority
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:637
* @route '/tickets/{ticket}/priority'
*/
const updatePriorityForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePriority.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updatePriority
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:637
* @route '/tickets/{ticket}/priority'
*/
updatePriorityForm.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePriority.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePriority.form = updatePriorityForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateAssignment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/{ticket}/assignment'
*/
export const updateAssignment = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateAssignment.url(args, options),
    method: 'patch',
})

updateAssignment.definition = {
    methods: ["patch"],
    url: '/tickets/{ticket}/assignment',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateAssignment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/{ticket}/assignment'
*/
updateAssignment.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return updateAssignment.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateAssignment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/{ticket}/assignment'
*/
updateAssignment.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateAssignment.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateAssignment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/{ticket}/assignment'
*/
const updateAssignmentForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAssignment.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateAssignment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/{ticket}/assignment'
*/
updateAssignmentForm.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAssignment.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateAssignment.form = updateAssignmentForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:677
* @route '/tickets/{ticket}/category'
*/
export const updateCategory = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateCategory.url(args, options),
    method: 'patch',
})

updateCategory.definition = {
    methods: ["patch"],
    url: '/tickets/{ticket}/category',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:677
* @route '/tickets/{ticket}/category'
*/
updateCategory.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return updateCategory.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:677
* @route '/tickets/{ticket}/category'
*/
updateCategory.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateCategory.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:677
* @route '/tickets/{ticket}/category'
*/
const updateCategoryForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:677
* @route '/tickets/{ticket}/category'
*/
updateCategoryForm.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateCategory.form = updateCategoryForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:698
* @route '/tickets/{ticket}/labels'
*/
export const addLabel = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addLabel.url(args, options),
    method: 'post',
})

addLabel.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/labels',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:698
* @route '/tickets/{ticket}/labels'
*/
addLabel.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return addLabel.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:698
* @route '/tickets/{ticket}/labels'
*/
addLabel.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addLabel.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:698
* @route '/tickets/{ticket}/labels'
*/
const addLabelForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addLabel.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:698
* @route '/tickets/{ticket}/labels'
*/
addLabelForm.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addLabel.url(args, options),
    method: 'post',
})

addLabel.form = addLabelForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::removeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:726
* @route '/tickets/{ticket}/labels/{label}'
*/
export const removeLabel = (args: { ticket: string | { id: string }, label: string | { id: string } } | [ticket: string | { id: string }, label: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeLabel.url(args, options),
    method: 'delete',
})

removeLabel.definition = {
    methods: ["delete"],
    url: '/tickets/{ticket}/labels/{label}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::removeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:726
* @route '/tickets/{ticket}/labels/{label}'
*/
removeLabel.url = (args: { ticket: string | { id: string }, label: string | { id: string } } | [ticket: string | { id: string }, label: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
            label: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
        label: typeof args.label === 'object'
        ? args.label.id
        : args.label,
    }

    return removeLabel.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace('{label}', parsedArgs.label.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::removeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:726
* @route '/tickets/{ticket}/labels/{label}'
*/
removeLabel.delete = (args: { ticket: string | { id: string }, label: string | { id: string } } | [ticket: string | { id: string }, label: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeLabel.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::removeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:726
* @route '/tickets/{ticket}/labels/{label}'
*/
const removeLabelForm = (args: { ticket: string | { id: string }, label: string | { id: string } } | [ticket: string | { id: string }, label: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeLabel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::removeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:726
* @route '/tickets/{ticket}/labels/{label}'
*/
removeLabelForm.delete = (args: { ticket: string | { id: string }, label: string | { id: string } } | [ticket: string | { id: string }, label: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeLabel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

removeLabel.form = removeLabelForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addMessage
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:746
* @route '/tickets/{ticket}/messages'
*/
export const addMessage = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMessage.url(args, options),
    method: 'post',
})

addMessage.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addMessage
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:746
* @route '/tickets/{ticket}/messages'
*/
addMessage.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticket: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticket: typeof args.ticket === 'object'
        ? args.ticket.id
        : args.ticket,
    }

    return addMessage.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addMessage
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:746
* @route '/tickets/{ticket}/messages'
*/
addMessage.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMessage.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addMessage
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:746
* @route '/tickets/{ticket}/messages'
*/
const addMessageForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addMessage.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addMessage
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:746
* @route '/tickets/{ticket}/messages'
*/
addMessageForm.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addMessage.url(args, options),
    method: 'post',
})

addMessage.form = addMessageForm

const tickets = {
    index: Object.assign(index, index),
    config: Object.assign(config, config),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    filters: Object.assign(filters, filters),
    forms: Object.assign(forms, forms),
    automationRules: Object.assign(automationRules, automationRules),
    show: Object.assign(show, show),
    updateStatus: Object.assign(updateStatus, updateStatus),
    updatePriority: Object.assign(updatePriority, updatePriority),
    updateAssignment: Object.assign(updateAssignment, updateAssignment),
    updateCategory: Object.assign(updateCategory, updateCategory),
    addLabel: Object.assign(addLabel, addLabel),
    removeLabel: Object.assign(removeLabel, removeLabel),
    addMessage: Object.assign(addMessage, addMessage),
    labels: Object.assign(labels, labels),
    categories: Object.assign(categories, categories),
    statuses: Object.assign(statuses, statuses),
}

export default tickets