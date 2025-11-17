import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:21
* @route '/deployments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/deployments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:21
* @route '/deployments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:21
* @route '/deployments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:21
* @route '/deployments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:21
* @route '/deployments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:21
* @route '/deployments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::index
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:21
* @route '/deployments'
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
* @see \Modules\Deployment\Http\Controllers\DeploymentController::config
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:60
* @route '/deployments/config'
*/
export const config = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

config.definition = {
    methods: ["get","head"],
    url: '/deployments/config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::config
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:60
* @route '/deployments/config'
*/
config.url = (options?: RouteQueryOptions) => {
    return config.definition.url + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::config
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:60
* @route '/deployments/config'
*/
config.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::config
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:60
* @route '/deployments/config'
*/
config.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: config.url(options),
    method: 'head',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::config
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:60
* @route '/deployments/config'
*/
const configForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::config
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:60
* @route '/deployments/config'
*/
configForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: config.url(options),
    method: 'get',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::config
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:60
* @route '/deployments/config'
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
* @see \Modules\Deployment\Http\Controllers\DeploymentController::store
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:94
* @route '/deployments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/deployments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::store
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:94
* @route '/deployments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::store
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:94
* @route '/deployments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::store
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:94
* @route '/deployments'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::store
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:94
* @route '/deployments'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::destroy
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:145
* @route '/deployments/{deployment}'
*/
export const destroy = (args: { deployment: string | number | { id: string | number } } | [deployment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/deployments/{deployment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::destroy
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:145
* @route '/deployments/{deployment}'
*/
destroy.url = (args: { deployment: string | number | { id: string | number } } | [deployment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { deployment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { deployment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            deployment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        deployment: typeof args.deployment === 'object'
        ? args.deployment.id
        : args.deployment,
    }

    return destroy.definition.url
            .replace('{deployment}', parsedArgs.deployment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::destroy
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:145
* @route '/deployments/{deployment}'
*/
destroy.delete = (args: { deployment: string | number | { id: string | number } } | [deployment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::destroy
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:145
* @route '/deployments/{deployment}'
*/
const destroyForm = (args: { deployment: string | number | { id: string | number } } | [deployment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Deployment\Http\Controllers\DeploymentController::destroy
* @see Modules/Deployment/app/Http/Controllers/DeploymentController.php:145
* @route '/deployments/{deployment}'
*/
destroyForm.delete = (args: { deployment: string | number | { id: string | number } } | [deployment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const deployments = {
    index: Object.assign(index, index),
    config: Object.assign(config, config),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default deployments