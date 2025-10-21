import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:15
* @route '/organisation/switch'
*/
export const switchMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

switchMethod.definition = {
    methods: ["post"],
    url: '/organisation/switch',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:15
* @route '/organisation/switch'
*/
switchMethod.url = (options?: RouteQueryOptions) => {
    return switchMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:15
* @route '/organisation/switch'
*/
switchMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:15
* @route '/organisation/switch'
*/
const switchMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:15
* @route '/organisation/switch'
*/
switchMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

switchMethod.form = switchMethodForm

const organisation = {
    switch: Object.assign(switchMethod, switchMethod),
}

export default organisation