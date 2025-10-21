import Api from './Api'
import CustomerController from './CustomerController'

const Controllers = {
    Api: Object.assign(Api, Api),
    CustomerController: Object.assign(CustomerController, CustomerController),
}

export default Controllers