import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::created
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:25
* @route '/api/widgets/documents/created'
*/
export const created = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: created.url(options),
    method: 'get',
})

created.definition = {
    methods: ["get","head"],
    url: '/api/widgets/documents/created',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::created
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:25
* @route '/api/widgets/documents/created'
*/
created.url = (options?: RouteQueryOptions) => {
    return created.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::created
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:25
* @route '/api/widgets/documents/created'
*/
created.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: created.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::created
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:25
* @route '/api/widgets/documents/created'
*/
created.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: created.url(options),
    method: 'head',
})

/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::assigned
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:121
* @route '/api/widgets/documents/assigned'
*/
export const assigned = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assigned.url(options),
    method: 'get',
})

assigned.definition = {
    methods: ["get","head"],
    url: '/api/widgets/documents/assigned',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::assigned
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:121
* @route '/api/widgets/documents/assigned'
*/
assigned.url = (options?: RouteQueryOptions) => {
    return assigned.definition.url + queryParams(options)
}

/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::assigned
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:121
* @route '/api/widgets/documents/assigned'
*/
assigned.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assigned.url(options),
    method: 'get',
})

/**
* @see \Modules\Document\Http\Controllers\Api\Widget\DocumentWidgetController::assigned
* @see Modules/Document/app/Http/Controllers/Api/Widget/DocumentWidgetController.php:121
* @route '/api/widgets/documents/assigned'
*/
assigned.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assigned.url(options),
    method: 'head',
})

const documents = {
    created: Object.assign(created, created),
    assigned: Object.assign(assigned, assigned),
}

export default documents