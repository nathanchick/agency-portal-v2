import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import modules from './modules'
/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:20
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
* @see app/Http/Controllers/Settings/OrganisationController.php:20
* @route '/settings/organisation'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:20
* @route '/settings/organisation'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:20
* @route '/settings/organisation'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:20
* @route '/settings/organisation'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:20
* @route '/settings/organisation'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::edit
* @see app/Http/Controllers/Settings/OrganisationController.php:20
* @route '/settings/organisation'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:49
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
* @see app/Http/Controllers/Settings/OrganisationController.php:49
* @route '/settings/organisation'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:49
* @route '/settings/organisation'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:49
* @route '/settings/organisation'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\OrganisationController::update
* @see app/Http/Controllers/Settings/OrganisationController.php:49
* @route '/settings/organisation'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:14
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
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:14
* @route '/organisation/switch'
*/
switchMethod.url = (options?: RouteQueryOptions) => {
    return switchMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:14
* @route '/organisation/switch'
*/
switchMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:14
* @route '/organisation/switch'
*/
const switchMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Organisation\Http\Controllers\OrganisationController::switchMethod
* @see Modules/Organisation/app/Http/Controllers/OrganisationController.php:14
* @route '/organisation/switch'
*/
switchMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: switchMethod.url(options),
    method: 'post',
})

switchMethod.form = switchMethodForm

const organisation = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    modules: Object.assign(modules, modules),
    switch: Object.assign(switchMethod, switchMethod),
}

export default organisation