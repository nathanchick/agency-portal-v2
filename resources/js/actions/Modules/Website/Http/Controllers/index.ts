import WebsiteController from './WebsiteController'
import Customer from './Customer'

const Controllers = {
    WebsiteController: Object.assign(WebsiteController, WebsiteController),
    Customer: Object.assign(Customer, Customer),
}

export default Controllers