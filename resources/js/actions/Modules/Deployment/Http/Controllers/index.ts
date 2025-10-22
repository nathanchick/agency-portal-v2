import Api from './Api'
import DeploymentController from './DeploymentController'
import Customer from './Customer'

const Controllers = {
    Api: Object.assign(Api, Api),
    DeploymentController: Object.assign(DeploymentController, DeploymentController),
    Customer: Object.assign(Customer, Customer),
}

export default Controllers