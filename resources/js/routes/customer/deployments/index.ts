import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

/**
* @see \Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/Customer/CustomerDeploymentController.php:20
* @route '/customer/deployments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/Customer/CustomerDeploymentController.php:20
* @route '/customer/deployments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/Customer/CustomerDeploymentController.php:20
* @route '/customer/deployments'
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

const deployments = {
    index: Object.assign(index, index),
}

export default deployments