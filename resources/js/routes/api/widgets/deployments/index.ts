import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomer
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
export const recentCustomer = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentCustomer.url(options),
    method: 'get',
})

recentCustomer.definition = {
    methods: ["get","head"],
    url: '/api/widgets/deployments/recent-customer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomer
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomer.url = (options?: RouteQueryOptions) => {
    return recentCustomer.definition.url + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomer
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomer.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recentCustomer.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomer
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomer.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recentCustomer.url(options),
    method: 'head',
})

const deployments = {
    recentCustomer: Object.assign(recentCustomer, recentCustomer),
}

export default deployments