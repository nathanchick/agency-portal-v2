import Auth from './Auth'
import Api from './Api'
import OrganisationController from './OrganisationController'
import TeamController from './TeamController'
import DocumentTypeController from './DocumentTypeController'
import DocumentController from './DocumentController'
import CustomerController from './CustomerController'
import WebhookController from './WebhookController'
import ApiTokenController from './ApiTokenController'
import CustomerDocumentController from './CustomerDocumentController'
import TicketController from './TicketController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Api: Object.assign(Api, Api),
    OrganisationController: Object.assign(OrganisationController, OrganisationController),
    TeamController: Object.assign(TeamController, TeamController),
    DocumentTypeController: Object.assign(DocumentTypeController, DocumentTypeController),
    DocumentController: Object.assign(DocumentController, DocumentController),
    CustomerController: Object.assign(CustomerController, CustomerController),
    WebhookController: Object.assign(WebhookController, WebhookController),
    ApiTokenController: Object.assign(ApiTokenController, ApiTokenController),
    CustomerDocumentController: Object.assign(CustomerDocumentController, CustomerDocumentController),
    TicketController: Object.assign(TicketController, TicketController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers