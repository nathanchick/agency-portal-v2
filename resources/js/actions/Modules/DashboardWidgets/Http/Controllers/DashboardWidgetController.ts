import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::index
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:36
* @route '/dashboard/widgets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/widgets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::index
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:36
* @route '/dashboard/widgets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::index
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:36
* @route '/dashboard/widgets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::index
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:36
* @route '/dashboard/widgets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::index
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:36
* @route '/dashboard/widgets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::index
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:36
* @route '/dashboard/widgets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::index
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:36
* @route '/dashboard/widgets'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::save
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:78
* @route '/dashboard/widgets/save'
*/
export const save = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/dashboard/widgets/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::save
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:78
* @route '/dashboard/widgets/save'
*/
save.url = (options?: RouteQueryOptions) => {
    return save.definition.url + queryParams(options)
}

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::save
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:78
* @route '/dashboard/widgets/save'
*/
save.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::save
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:78
* @route '/dashboard/widgets/save'
*/
const saveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: save.url(options),
    method: 'post',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::save
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:78
* @route '/dashboard/widgets/save'
*/
saveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: save.url(options),
    method: 'post',
})

save.form = saveForm

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::reset
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:138
* @route '/dashboard/widgets/reset'
*/
export const reset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/dashboard/widgets/reset',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::reset
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:138
* @route '/dashboard/widgets/reset'
*/
reset.url = (options?: RouteQueryOptions) => {
    return reset.definition.url + queryParams(options)
}

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::reset
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:138
* @route '/dashboard/widgets/reset'
*/
reset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::reset
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:138
* @route '/dashboard/widgets/reset'
*/
const resetForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reset.url(options),
    method: 'post',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::reset
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:138
* @route '/dashboard/widgets/reset'
*/
resetForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reset.url(options),
    method: 'post',
})

reset.form = resetForm

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::toggle
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:175
* @route '/dashboard/widgets/{widgetKey}/toggle'
*/
export const toggle = (args: { widgetKey: string | number } | [widgetKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/dashboard/widgets/{widgetKey}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::toggle
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:175
* @route '/dashboard/widgets/{widgetKey}/toggle'
*/
toggle.url = (args: { widgetKey: string | number } | [widgetKey: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { widgetKey: args }
    }

    if (Array.isArray(args)) {
        args = {
            widgetKey: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        widgetKey: args.widgetKey,
    }

    return toggle.definition.url
            .replace('{widgetKey}', parsedArgs.widgetKey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::toggle
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:175
* @route '/dashboard/widgets/{widgetKey}/toggle'
*/
toggle.post = (args: { widgetKey: string | number } | [widgetKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::toggle
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:175
* @route '/dashboard/widgets/{widgetKey}/toggle'
*/
const toggleForm = (args: { widgetKey: string | number } | [widgetKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, options),
    method: 'post',
})

/**
* @see \Modules\DashboardWidgets\Http\Controllers\DashboardWidgetController::toggle
* @see Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php:175
* @route '/dashboard/widgets/{widgetKey}/toggle'
*/
toggleForm.post = (args: { widgetKey: string | number } | [widgetKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, options),
    method: 'post',
})

toggle.form = toggleForm

const DashboardWidgetController = { index, save, reset, toggle }

export default DashboardWidgetController