import Customer from './Customer'
import BillingController from './BillingController'

const Controllers = {
    Customer: Object.assign(Customer, Customer),
    BillingController: Object.assign(BillingController, BillingController),
}

export default Controllers