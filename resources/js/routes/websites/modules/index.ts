import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:212
* @route '/websites/{id}/modules'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/websites/{id}/modules',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:212
* @route '/websites/{id}/modules'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Website\Http\Controllers\WebsiteController::update
* @see Modules/Website/app/Http/Controllers/WebsiteController.php:212
* @route '/websites/{id}/modules'
*/
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

const modules = {
    update: Object.assign(update, update),
}

export default modules