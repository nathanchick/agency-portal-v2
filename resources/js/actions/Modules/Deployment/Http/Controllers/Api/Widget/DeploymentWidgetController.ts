import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../../wayfinder'
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

const DeploymentWidgetController = { recentCustomerDeployments }

export default DeploymentWidgetController