import CspManagementController from './CspManagementController'
import Customer from './Customer'

const Controllers = {
    CspManagementController: Object.assign(CspManagementController, CspManagementController),
    Customer: Object.assign(Customer, Customer),
}

export default Controllers