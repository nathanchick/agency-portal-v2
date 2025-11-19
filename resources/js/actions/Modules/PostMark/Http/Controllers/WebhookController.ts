import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\PostMark\Http\Controllers\WebhookController::inbound
* @see Modules/PostMark/app/Http/Controllers/WebhookController.php:20
* @route '/api/webhooks/postmark/{organisation}/inbound'
*/
export const inbound = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inbound.url(args, options),
    method: 'post',
})

inbound.definition = {
    methods: ["post"],
    url: '/api/webhooks/postmark/{organisation}/inbound',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\PostMark\Http\Controllers\WebhookController::inbound
* @see Modules/PostMark/app/Http/Controllers/WebhookController.php:20
* @route '/api/webhooks/postmark/{organisation}/inbound'
*/
inbound.url = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organisation: args }
    }

    if (Array.isArray(args)) {
        args = {
            organisation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        organisation: args.organisation,
    }

    return inbound.definition.url
            .replace('{organisation}', parsedArgs.organisation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\PostMark\Http\Controllers\WebhookController::inbound
* @see Modules/PostMark/app/Http/Controllers/WebhookController.php:20
* @route '/api/webhooks/postmark/{organisation}/inbound'
*/
inbound.post = (args: { organisation: string | number } | [organisation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inbound.url(args, options),
    method: 'post',
})

const WebhookController = { inbound }

export default WebhookController