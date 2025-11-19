import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomerDeployments
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
export const recentCustomerDeployments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentCustomerDeployments.url(options),
    method: 'get',
})

recentCustomerDeployments.definition = {
    methods: ["get","head"],
    url: '/api/widgets/deployments/recent-customer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomerDeployments
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomerDeployments.url = (options?: RouteQueryOptions) => {
    return recentCustomerDeployments.definition.url + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomerDeployments
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomerDeployments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentCustomerDeployments.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomerDeployments
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomerDeployments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recentCustomerDeployments.url(options),
    method: 'head',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomerDeployments
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
const recentCustomerDeploymentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentCustomerDeployments.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomerDeployments
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomerDeploymentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentCustomerDeployments.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomerDeployments
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomerDeploymentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentCustomerDeployments.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

recentCustomerDeployments.form = recentCustomerDeploymentsForm

const DeploymentWidgetController = { recentCustomerDeployments }

export default DeploymentWidgetController