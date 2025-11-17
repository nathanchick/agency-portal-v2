import Api from './Api'
import Customer from './Customer'
import BillingController from './BillingController'

const Controllers = {
    Api: Object.assign(Api, Api),
    Customer: Object.assign(Customer, Customer),
    BillingController: Object.assign(BillingController, BillingController),
}

export default Controllers