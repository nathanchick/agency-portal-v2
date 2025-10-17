import Auth from './Auth'
import CustomerController from './CustomerController'
import TicketController from './TicketController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    CustomerController: Object.assign(CustomerController, CustomerController),
    TicketController: Object.assign(TicketController, TicketController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers