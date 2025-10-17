import Auth from './Auth'
import OrganisationController from './OrganisationController'
import TeamController from './TeamController'
import CustomerController from './CustomerController'
import TicketController from './TicketController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    OrganisationController: Object.assign(OrganisationController, OrganisationController),
    TeamController: Object.assign(TeamController, TeamController),
    CustomerController: Object.assign(CustomerController, CustomerController),
    TicketController: Object.assign(TicketController, TicketController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers