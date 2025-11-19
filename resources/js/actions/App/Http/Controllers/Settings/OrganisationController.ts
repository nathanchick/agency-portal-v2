import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:21
* @route '/settings/organisation'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/organisation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:21
* @route '/settings/organisation'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:21
* @route '/settings/organisation'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:21
* @route '/settings/organisation'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:68
* @route '/settings/organisation'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/organisation',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:68
* @route '/settings/organisation'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:68
* @route '/settings/organisation'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::updateModuleSettings
* @see app/Http/Controllers/Settings/OrganisationController.php:108
* @route '/settings/organisation/modules'
*/
export const updateModuleSettings = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateModuleSettings.url(options),
    method: 'patch',
})

updateModuleSettings.definition = {
    methods: ["patch"],
    url: '/settings/organisation/modules',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\OrganisationController::updateModuleSettings
* @see app/Http/Controllers/Settings/OrganisationController.php:108
* @route '/settings/organisation/modules'
*/
updateModuleSettings.url = (options?: RouteQueryOptions) => {
    return updateModuleSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\OrganisationController::updateModuleSettings
* @see app/Http/Controllers/Settings/OrganisationController.php:108
* @route '/settings/organisation/modules'
*/
updateModuleSettings.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateModuleSettings.url(options),
    method: 'patch',
})

const OrganisationController = { edit, update, updateModuleSettings }

export default OrganisationController