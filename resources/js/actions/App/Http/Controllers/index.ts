import Auth from './Auth'
import TeamController from './TeamController'
import Settings from './Settings'
import Customer from './Customer'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    TeamController: Object.assign(TeamController, TeamController),
    Settings: Object.assign(Settings, Settings),
    Customer: Object.assign(Customer, Customer),
}

export default Controllers