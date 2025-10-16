import Auth from './Auth'
import TicketController from './TicketController'
import CustomerController from './CustomerController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    TicketController: Object.assign(TicketController, TicketController),
    CustomerController: Object.assign(CustomerController, CustomerController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers