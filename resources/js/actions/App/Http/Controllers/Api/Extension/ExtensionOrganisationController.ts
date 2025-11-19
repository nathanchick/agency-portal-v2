import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
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

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::list
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::list
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Extension\ExtensionOrganisationController::list
* @see app/Http/Controllers/Api/Extension/ExtensionOrganisationController.php:15
* @route '/api/extension/organisations'
*/
listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

list.form = listForm

const ExtensionOrganisationController = { list }

export default ExtensionOrganisationController