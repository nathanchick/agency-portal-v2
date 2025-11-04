import Api from './Api'
import TicketController from './TicketController'
import AutomationRuleController from './AutomationRuleController'
import Customer from './Customer'

const Controllers = {
    Api: Object.assign(Api, Api),
    TicketController: Object.assign(TicketController, TicketController),
    AutomationRuleController: Object.assign(AutomationRuleController, AutomationRuleController),
    Customer: Object.assign(Customer, Customer),
}

export default Controllers