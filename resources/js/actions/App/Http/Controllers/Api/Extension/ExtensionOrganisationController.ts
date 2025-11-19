import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::list
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/extension/organisations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::list
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::list
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::list
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

const ExtensionOrganisationController = { list }

export default ExtensionOrganisationController