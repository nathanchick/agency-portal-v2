import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Deployment\Http\Controllers\Api\DeploymentWebhookController::webhook
* @see Modules/Deployment/app/Http/Controllers/Api/DeploymentWebhookController.php:15
* @route '/api/deployments/webhook/{token}'
*/
export const webhook = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/api/deployments/webhook/{token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Deployment\Http\Controllers\Api\DeploymentWebhookController::webhook
* @see Modules/Deployment/app/Http/Controllers/Api/DeploymentWebhookController.php:15
* @route '/api/deployments/webhook/{token}'
*/
webhook.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    if (Array.isArray(args)) {
        args = {
            token: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        token: args.token,
    }

    return webhook.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\Api\DeploymentWebhookController::webhook
* @see Modules/Deployment/app/Http/Controllers/Api/DeploymentWebhookController.php:15
* @route '/api/deployments/webhook/{token}'
*/
webhook.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\DeploymentWebhookController::webhook
* @see Modules/Deployment/app/Http/Controllers/Api/DeploymentWebhookController.php:15
* @route '/api/deployments/webhook/{token}'
*/
const webhookForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\DeploymentWebhookController::webhook
* @see Modules/Deployment/app/Http/Controllers/Api/DeploymentWebhookController.php:15
* @route '/api/deployments/webhook/{token}'
*/
webhookForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(args, options),
    method: 'post',
})

webhook.form = webhookForm

const DeploymentWebhookController = { webhook }

export default DeploymentWebhookController