import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ticket\Http\Controllers\TicketController::save
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:572
* @route '/tickets/filters/save'
*/
export const save = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/tickets/filters/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::save
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:572
* @route '/tickets/filters/save'
*/
save.url = (options?: RouteQueryOptions) => {
    return save.definition.url + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::save
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:572
* @route '/tickets/filters/save'
*/
save.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::save
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:572
* @route '/tickets/filters/save'
*/
const saveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: save.url(options),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::save
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:572
* @route '/tickets/filters/save'
*/
saveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: save.url(options),
    method: 'post',
})

save.form = saveForm

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:595
* @route '/tickets/filters/{filter}'
*/
export const destroy = (args: { filter: string | number | { id: string | number } } | [filter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tickets/filters/{filter}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:595
* @route '/tickets/filters/{filter}'
*/
destroy.url = (args: { filter: string | number | { id: string | number } } | [filter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{filter}', parsedArgs.filter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:595
* @route '/tickets/filters/{filter}'
*/
destroy.delete = (args: { filter: string | number | { id: string | number } } | [filter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:595
* @route '/tickets/filters/{filter}'
*/
const destroyForm = (args: { filter: string | number | { id: string | number } } | [filter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ticket\Http\Controllers\TicketController::destroy
* @see Modules/Ticket/app/Http/Controllers/TicketController.php:595
* @route '/tickets/filters/{filter}'
*/
destroyForm.delete = (args: { filter: string | number | { id: string | number } } | [filter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const filters = {
    save: Object.assign(save, save),
    destroy: Object.assign(destroy, destroy),
}

export default filters