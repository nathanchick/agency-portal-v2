import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:108
* @route '/settings/organisation/modules'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/organisation/modules',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:108
* @route '/settings/organisation/modules'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:108
* @route '/settings/organisation/modules'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

const modules = {
    update: Object.assign(update, update),
}

export default modules