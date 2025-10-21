import CustomerController from './CustomerController'
import DocumentRequestController from './DocumentRequestController'
import ProjectController from './ProjectController'
import WebsiteController from './WebsiteController'
import TicketController from './TicketController'

const Api = {
    CustomerController: Object.assign(CustomerController, CustomerController),
    DocumentRequestController: Object.assign(DocumentRequestController, DocumentRequestController),
    ProjectController: Object.assign(ProjectController, ProjectController),
    WebsiteController: Object.assign(WebsiteController, WebsiteController),
    TicketController: Object.assign(TicketController, TicketController),
}

export default Api