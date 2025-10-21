import OrganisationController from './OrganisationController'
import ApiTokenController from './ApiTokenController'

const Controllers = {
    OrganisationController: Object.assign(OrganisationController, OrganisationController),
    ApiTokenController: Object.assign(ApiTokenController, ApiTokenController),
}

export default Controllers