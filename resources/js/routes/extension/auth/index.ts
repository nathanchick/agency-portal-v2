import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

/**
* @see \App\Http\Controllers\Extension\TokenController::validate
* @see app/Http/Controllers/Extension/TokenController.php:93
* @route '/api/extension/auth/validate'
*/
const validateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Extension\TokenController::validate
* @see app/Http/Controllers/Extension/TokenController.php:93
* @route '/api/extension/auth/validate'
*/
validateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(options),
    method: 'post',
})

validate.form = validateForm

const auth = {
    validate: Object.assign(validate, validate),
}

export default auth