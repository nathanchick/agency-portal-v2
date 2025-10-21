import CustomerController from './CustomerController'
import ProjectController from './ProjectController'
import WebsiteController from './WebsiteController'

const Api = {
    CustomerController: Object.assign(CustomerController, CustomerController),
    ProjectController: Object.assign(ProjectController, ProjectController),
    WebsiteController: Object.assign(WebsiteController, WebsiteController),
}

export default Api