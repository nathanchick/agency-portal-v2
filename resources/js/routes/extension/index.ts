import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import auth from './auth'
import token from './token'
/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::organisations
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
export const organisations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organisations.url(options),
    method: 'get',
})

organisations.definition = {
    methods: ["get","head"],
    url: '/api/extension/organisations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::organisations
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
organisations.url = (options?: RouteQueryOptions) => {
    return organisations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::organisations
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
organisations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organisations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::organisations
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
organisations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organisations.url(options),
    method: 'head',
})

const extension = {
    auth: Object.assign(auth, auth),
    organisations: Object.assign(organisations, organisations),
    token: Object.assign(token, token),
}

export default extension