import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomer
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
const recentCustomerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentCustomer.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomer
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentCustomer.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::recentCustomer
* @see Modules/Deployment/app/Http/Controllers/Api/Widget/DeploymentWidgetController.php:28
* @route '/api/widgets/deployments/recent-customer'
*/
recentCustomerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recentCustomer.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

recentCustomer.form = recentCustomerForm

const deployments = {
    recentCustomer: Object.assign(recentCustomer, recentCustomer),
}

export default deployments