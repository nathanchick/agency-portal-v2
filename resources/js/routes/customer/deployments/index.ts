import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/Customer/CustomerDeploymentController.php:20
* @route '/customer/deployments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/customer/deployments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/Customer/CustomerDeploymentController.php:20
* @route '/customer/deployments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/Customer/CustomerDeploymentController.php:20
* @route '/customer/deployments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/Customer/CustomerDeploymentController.php:20
* @route '/customer/deployments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const deployments = {
    index: Object.assign(index, index),
}

export default deployments