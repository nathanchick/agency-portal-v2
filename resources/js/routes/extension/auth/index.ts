import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Extension\TokenController::validate
* @see app/Http/Controllers/Extension/TokenController.php:93
* @route '/api/extension/auth/validate'
*/
export const validate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

validate.definition = {
    methods: ["post"],
    url: '/api/extension/auth/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Extension\TokenController::validate
* @see app/Http/Controllers/Extension/TokenController.php:93
* @route '/api/extension/auth/validate'
*/
validate.url = (options?: RouteQueryOptions) => {
    return validate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Extension\TokenController::validate
* @see app/Http/Controllers/Extension/TokenController.php:93
* @route '/api/extension/auth/validate'
*/
validate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

const auth = {
    validate: Object.assign(validate, validate),
}

export default auth