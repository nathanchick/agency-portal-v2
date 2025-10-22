import Api from './Api'
import CustomerController from './CustomerController'
import CustomerSwitcherController from './CustomerSwitcherController'

const Controllers = {
    Api: Object.assign(Api, Api),
    CustomerController: Object.assign(CustomerController, CustomerController),
    CustomerSwitcherController: Object.assign(CustomerSwitcherController, CustomerSwitcherController),
}

export default Controllers