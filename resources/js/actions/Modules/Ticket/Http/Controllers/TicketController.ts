import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:31
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:31
* @route '/tickets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:31
* @route '/tickets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:31
* @route '/tickets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:31
* @route '/tickets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:31
* @route '/tickets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::index
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:31
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:172
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:172
* @route '/tickets/config'
*/
config.url = (options?: RouteQueryOptions) => {
    return config.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:172
* @route '/tickets/config'
*/
config.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:172
* @route '/tickets/config'
*/
config.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: config.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:172
* @route '/tickets/config'
*/
const configForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:172
* @route '/tickets/config'
*/
configForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::config
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:172
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:471
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:471
* @route '/tickets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:471
* @route '/tickets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:471
* @route '/tickets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:471
* @route '/tickets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:471
* @route '/tickets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::create
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:471
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:500
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:500
* @route '/tickets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:500
* @route '/tickets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:500
* @route '/tickets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::store
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:500
* @route '/tickets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::saveFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:634
* @route '/tickets/filters/save'
*/
export const saveFilter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveFilter.url(options),
    method: 'post',
})

saveFilter.definition = {
    methods: ["post"],
    url: '/tickets/filters/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::saveFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:634
* @route '/tickets/filters/save'
*/
saveFilter.url = (options?: RouteQueryOptions) => {
    return saveFilter.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::saveFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:634
* @route '/tickets/filters/save'
*/
saveFilter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveFilter.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::saveFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:634
* @route '/tickets/filters/save'
*/
const saveFilterForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: saveFilter.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::saveFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:634
* @route '/tickets/filters/save'
*/
saveFilterForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: saveFilter.url(options),
    method: 'post',
})

saveFilter.form = saveFilterForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/filters/{filter}'
*/
export const destroyFilter = (args: { filter: string | { id: string } } | [filter: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFilter.url(args, options),
    method: 'delete',
})

destroyFilter.definition = {
    methods: ["delete"],
    url: '/tickets/filters/{filter}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/filters/{filter}'
*/
destroyFilter.url = (args: { filter: string | { id: string } } | [filter: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { filter: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { filter: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            filter: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        filter: typeof args.filter === 'object'
        ? args.filter.id
        : args.filter,
    }

    return destroyFilter.definition.url
            .replace('{filter}', parsedArgs.filter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/filters/{filter}'
*/
destroyFilter.delete = (args: { filter: string | { id: string } } | [filter: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFilter.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/filters/{filter}'
*/
const destroyFilterForm = (args: { filter: string | { id: string } } | [filter: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyFilter.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyFilter
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:657
* @route '/tickets/filters/{filter}'
*/
destroyFilterForm.delete = (args: { filter: string | { id: string } } | [filter: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyFilter.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyFilter.form = destroyFilterForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::forms
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
export const forms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forms.url(options),
    method: 'get',
})

forms.definition = {
    methods: ["get","head"],
    url: '/tickets/forms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::forms
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
forms.url = (options?: RouteQueryOptions) => {
    return forms.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::forms
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
forms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forms.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::forms
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
forms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: forms.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::forms
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
const formsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: forms.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::forms
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
formsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: forms.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::forms
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:340
* @route '/tickets/forms'
*/
formsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: forms.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

forms.form = formsForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::createForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
export const createForm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createForm.url(options),
    method: 'get',
})

createForm.definition = {
    methods: ["get","head"],
    url: '/tickets/forms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::createForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
createForm.url = (options?: RouteQueryOptions) => {
    return createForm.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::createForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createForm.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::createForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createForm.url(options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::createForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
const createFormForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createForm.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::createForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
createFormForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createForm.url(options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::createForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:356
* @route '/tickets/forms/create'
*/
createFormForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createForm.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

createForm.form = createFormForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
export const storeForm = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeForm.url(options),
    method: 'post',
})

storeForm.definition = {
    methods: ["post"],
    url: '/tickets/forms',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
storeForm.url = (options?: RouteQueryOptions) => {
    return storeForm.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
storeForm.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeForm.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
const storeFormForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeForm.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:364
* @route '/tickets/forms'
*/
storeFormForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeForm.url(options),
    method: 'post',
})

storeForm.form = storeFormForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::editForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
export const editForm = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editForm.url(args, options),
    method: 'get',
})

editForm.definition = {
    methods: ["get","head"],
    url: '/tickets/forms/{ticketForm}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::editForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
editForm.url = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return editForm.definition.url
            .replace('{ticketForm}', parsedArgs.ticketForm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::editForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
editForm.get = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editForm.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::editForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
editForm.head = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editForm.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::editForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
const editFormForm = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editForm.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::editForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
editFormForm.get = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editForm.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::editForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:386
* @route '/tickets/forms/{ticketForm}/edit'
*/
editFormForm.head = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editForm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

editForm.form = editFormForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
export const updateForm = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateForm.url(args, options),
    method: 'put',
})

updateForm.definition = {
    methods: ["put"],
    url: '/tickets/forms/{ticketForm}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
updateForm.url = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return updateForm.definition.url
            .replace('{ticketForm}', parsedArgs.ticketForm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
updateForm.put = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateForm.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
const updateFormForm = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateForm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:402
* @route '/tickets/forms/{ticketForm}'
*/
updateFormForm.put = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateForm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateForm.form = updateFormForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
export const destroyForm = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyForm.url(args, options),
    method: 'delete',
})

destroyForm.definition = {
    methods: ["delete"],
    url: '/tickets/forms/{ticketForm}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
destroyForm.url = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroyForm.definition.url
            .replace('{ticketForm}', parsedArgs.ticketForm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
destroyForm.delete = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyForm.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
const destroyFormForm = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyForm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyForm
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:426
* @route '/tickets/forms/{ticketForm}'
*/
destroyFormForm.delete = (args: { ticketForm: string | { id: string } } | [ticketForm: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyForm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyForm.form = destroyFormForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:551
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:551
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:551
* @route '/tickets/{ticket}'
*/
show.get = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:551
* @route '/tickets/{ticket}'
*/
show.head = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:551
* @route '/tickets/{ticket}'
*/
const showForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:551
* @route '/tickets/{ticket}'
*/
showForm.get = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::show
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:551
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:674
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:674
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:674
* @route '/tickets/{ticket}/status'
*/
updateStatus.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatus
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:674
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:674
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:699
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:699
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:699
* @route '/tickets/{ticket}/priority'
*/
updatePriority.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePriority.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updatePriority
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:699
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:699
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:719
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:719
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:719
* @route '/tickets/{ticket}/assignment'
*/
updateAssignment.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateAssignment.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateAssignment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:719
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:719
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
* @see \Modules\Ticket\Http\Controllers\TicketController::updateTicketCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:739
* @route '/tickets/{ticket}/category'
*/
export const updateTicketCategory = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateTicketCategory.url(args, options),
    method: 'patch',
})

updateTicketCategory.definition = {
    methods: ["patch"],
    url: '/tickets/{ticket}/category',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateTicketCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:739
* @route '/tickets/{ticket}/category'
*/
updateTicketCategory.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return updateTicketCategory.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateTicketCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:739
* @route '/tickets/{ticket}/category'
*/
updateTicketCategory.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateTicketCategory.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateTicketCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:739
* @route '/tickets/{ticket}/category'
*/
const updateTicketCategoryForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateTicketCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateTicketCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:739
* @route '/tickets/{ticket}/category'
*/
updateTicketCategoryForm.patch = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateTicketCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateTicketCategory.form = updateTicketCategoryForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:760
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:760
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:760
* @route '/tickets/{ticket}/labels'
*/
addLabel.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addLabel.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:760
* @route '/tickets/{ticket}/labels'
*/
const addLabelForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addLabel.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:760
* @route '/tickets/{ticket}/labels'
*/
addLabelForm.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addLabel.url(args, options),
    method: 'post',
})

addLabel.form = addLabelForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::removeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:788
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:788
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:788
* @route '/tickets/{ticket}/labels/{label}'
*/
removeLabel.delete = (args: { ticket: string | { id: string }, label: string | { id: string } } | [ticket: string | { id: string }, label: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeLabel.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::removeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:788
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:788
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:808
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:808
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
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:808
* @route '/tickets/{ticket}/messages'
*/
addMessage.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMessage.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addMessage
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:808
* @route '/tickets/{ticket}/messages'
*/
const addMessageForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addMessage.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::addMessage
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:808
* @route '/tickets/{ticket}/messages'
*/
addMessageForm.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addMessage.url(args, options),
    method: 'post',
})

addMessage.form = addMessageForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerateSummary
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
export const regenerateSummary = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateSummary.url(args, options),
    method: 'post',
})

regenerateSummary.definition = {
    methods: ["post"],
    url: '/tickets/{ticket}/summary/regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerateSummary
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
regenerateSummary.url = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return regenerateSummary.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerateSummary
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
regenerateSummary.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateSummary.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerateSummary
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
const regenerateSummaryForm = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateSummary.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::regenerateSummary
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:949
* @route '/tickets/{ticket}/summary/regenerate'
*/
regenerateSummaryForm.post = (args: { ticket: string | { id: string } } | [ticket: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateSummary.url(args, options),
    method: 'post',
})

regenerateSummary.form = regenerateSummaryForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::downloadAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
export const downloadAttachment = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadAttachment.url(args, options),
    method: 'get',
})

downloadAttachment.definition = {
    methods: ["get","head"],
    url: '/media/{media}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::downloadAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
downloadAttachment.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { media: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            media: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        media: typeof args.media === 'object'
        ? args.media.id
        : args.media,
    }

    return downloadAttachment.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::downloadAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
downloadAttachment.get = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadAttachment.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::downloadAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
downloadAttachment.head = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadAttachment.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::downloadAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
const downloadAttachmentForm = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadAttachment.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::downloadAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
downloadAttachmentForm.get = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadAttachment.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::downloadAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1004
* @route '/media/{media}/download'
*/
downloadAttachmentForm.head = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadAttachment.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadAttachment.form = downloadAttachmentForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
export const deleteAttachment = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAttachment.url(args, options),
    method: 'delete',
})

deleteAttachment.definition = {
    methods: ["delete"],
    url: '/media/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
deleteAttachment.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { media: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            media: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        media: typeof args.media === 'object'
        ? args.media.id
        : args.media,
    }

    return deleteAttachment.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
deleteAttachment.delete = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAttachment.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
const deleteAttachmentForm = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteAttachment.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::deleteAttachment
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:1039
* @route '/media/{media}'
*/
deleteAttachmentForm.delete = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteAttachment.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteAttachment.form = deleteAttachmentForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
export const storeLabel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLabel.url(options),
    method: 'post',
})

storeLabel.definition = {
    methods: ["post"],
    url: '/tickets/labels',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
storeLabel.url = (options?: RouteQueryOptions) => {
    return storeLabel.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
storeLabel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLabel.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
const storeLabelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeLabel.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:202
* @route '/tickets/labels'
*/
storeLabelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeLabel.url(options),
    method: 'post',
})

storeLabel.form = storeLabelForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
export const updateLabel = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLabel.url(args, options),
    method: 'put',
})

updateLabel.definition = {
    methods: ["put"],
    url: '/tickets/labels/{label}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
updateLabel.url = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { label: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { label: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            label: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        label: typeof args.label === 'object'
        ? args.label.id
        : args.label,
    }

    return updateLabel.definition.url
            .replace('{label}', parsedArgs.label.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
updateLabel.put = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLabel.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
const updateLabelForm = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateLabel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:226
* @route '/tickets/labels/{label}'
*/
updateLabelForm.put = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateLabel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateLabel.form = updateLabelForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
export const destroyLabel = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLabel.url(args, options),
    method: 'delete',
})

destroyLabel.definition = {
    methods: ["delete"],
    url: '/tickets/labels/{label}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
destroyLabel.url = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { label: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { label: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            label: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        label: typeof args.label === 'object'
        ? args.label.id
        : args.label,
    }

    return destroyLabel.definition.url
            .replace('{label}', parsedArgs.label.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
destroyLabel.delete = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLabel.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
const destroyLabelForm = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyLabel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyLabel
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:253
* @route '/tickets/labels/{label}'
*/
destroyLabelForm.delete = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyLabel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyLabel.form = destroyLabelForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:269
* @route '/tickets/categories'
*/
export const storeCategory = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCategory.url(options),
    method: 'post',
})

storeCategory.definition = {
    methods: ["post"],
    url: '/tickets/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:269
* @route '/tickets/categories'
*/
storeCategory.url = (options?: RouteQueryOptions) => {
    return storeCategory.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:269
* @route '/tickets/categories'
*/
storeCategory.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCategory.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:269
* @route '/tickets/categories'
*/
const storeCategoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeCategory.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:269
* @route '/tickets/categories'
*/
storeCategoryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeCategory.url(options),
    method: 'post',
})

storeCategory.form = storeCategoryForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:295
* @route '/tickets/categories/{category}'
*/
export const updateCategory = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCategory.url(args, options),
    method: 'put',
})

updateCategory.definition = {
    methods: ["put"],
    url: '/tickets/categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:295
* @route '/tickets/categories/{category}'
*/
updateCategory.url = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: typeof args.category === 'object'
        ? args.category.id
        : args.category,
    }

    return updateCategory.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:295
* @route '/tickets/categories/{category}'
*/
updateCategory.put = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCategory.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:295
* @route '/tickets/categories/{category}'
*/
const updateCategoryForm = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:295
* @route '/tickets/categories/{category}'
*/
updateCategoryForm.put = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateCategory.form = updateCategoryForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:324
* @route '/tickets/categories/{category}'
*/
export const destroyCategory = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCategory.url(args, options),
    method: 'delete',
})

destroyCategory.definition = {
    methods: ["delete"],
    url: '/tickets/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:324
* @route '/tickets/categories/{category}'
*/
destroyCategory.url = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: typeof args.category === 'object'
        ? args.category.id
        : args.category,
    }

    return destroyCategory.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:324
* @route '/tickets/categories/{category}'
*/
destroyCategory.delete = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCategory.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:324
* @route '/tickets/categories/{category}'
*/
const destroyCategoryForm = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyCategory
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:324
* @route '/tickets/categories/{category}'
*/
destroyCategoryForm.delete = (args: { category: string | { id: string } } | [category: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyCategory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyCategory.form = destroyCategoryForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
export const storeStatusDefinition = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStatusDefinition.url(options),
    method: 'post',
})

storeStatusDefinition.definition = {
    methods: ["post"],
    url: '/tickets/statuses',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
storeStatusDefinition.url = (options?: RouteQueryOptions) => {
    return storeStatusDefinition.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
storeStatusDefinition.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStatusDefinition.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
const storeStatusDefinitionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeStatusDefinition.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::storeStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:857
* @route '/tickets/statuses'
*/
storeStatusDefinitionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeStatusDefinition.url(options),
    method: 'post',
})

storeStatusDefinition.form = storeStatusDefinitionForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
export const updateStatusDefinition = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatusDefinition.url(args, options),
    method: 'put',
})

updateStatusDefinition.definition = {
    methods: ["put"],
    url: '/tickets/statuses/{ticketStatus}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
updateStatusDefinition.url = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticketStatus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticketStatus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticketStatus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticketStatus: typeof args.ticketStatus === 'object'
        ? args.ticketStatus.id
        : args.ticketStatus,
    }

    return updateStatusDefinition.definition.url
            .replace('{ticketStatus}', parsedArgs.ticketStatus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
updateStatusDefinition.put = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatusDefinition.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
const updateStatusDefinitionForm = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatusDefinition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::updateStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:893
* @route '/tickets/statuses/{ticketStatus}'
*/
updateStatusDefinitionForm.put = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatusDefinition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateStatusDefinition.form = updateStatusDefinitionForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
export const destroyStatusDefinition = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyStatusDefinition.url(args, options),
    method: 'delete',
})

destroyStatusDefinition.definition = {
    methods: ["delete"],
    url: '/tickets/statuses/{ticketStatus}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
destroyStatusDefinition.url = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticketStatus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ticketStatus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ticketStatus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ticketStatus: typeof args.ticketStatus === 'object'
        ? args.ticketStatus.id
        : args.ticketStatus,
    }

    return destroyStatusDefinition.definition.url
            .replace('{ticketStatus}', parsedArgs.ticketStatus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
destroyStatusDefinition.delete = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyStatusDefinition.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
const destroyStatusDefinitionForm = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyStatusDefinition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroyStatusDefinition
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:933
* @route '/tickets/statuses/{ticketStatus}'
*/
destroyStatusDefinitionForm.delete = (args: { ticketStatus: string | { id: string } } | [ticketStatus: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyStatusDefinition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyStatusDefinition.form = destroyStatusDefinitionForm

const TicketController = { index, config, create, store, saveFilter, destroyFilter, forms, createForm, storeForm, editForm, updateForm, destroyForm, show, updateStatus, updatePriority, updateAssignment, updateTicketCategory, addLabel, removeLabel, addMessage, regenerateSummary, downloadAttachment, deleteAttachment, storeLabel, updateLabel, destroyLabel, storeCategory, updateCategory, destroyCategory, storeStatusDefinition, updateStatusDefinition, destroyStatusDefinition }

export default TicketController