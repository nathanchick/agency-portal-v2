import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import billing from './billing'
import csp from './csp'
import deployments from './deployments'
import documents from './documents'
import health from './health'
import tickets from './tickets'
import timesheet from './timesheet'
import websites from './websites'
/**
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
* @route '/customer/switch'
*/
export const switchMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

switchMethod.definition = {
    methods: ["post"],
    url: '/customer/switch',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
* @route '/customer/switch'
*/
switchMethod.url = (options?: RouteQueryOptions) => {
    return switchMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Customer\Http\Controllers\CustomerSwitcherController::switchMethod
* @see Modules/Customer/app/Http/Controllers/CustomerSwitcherController.php:13
* @route '/customer/switch'
*/
switchMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(options),
    method: 'post',
})

const customer = {
    billing: Object.assign(billing, billing),
    csp: Object.assign(csp, csp),
    switch: Object.assign(switchMethod, switchMethod),
    deployments: Object.assign(deployments, deployments),
    documents: Object.assign(documents, documents),
    health: Object.assign(health, health),
    tickets: Object.assign(tickets, tickets),
    timesheet: Object.assign(timesheet, timesheet),
    websites: Object.assign(websites, websites),
}

export default customer