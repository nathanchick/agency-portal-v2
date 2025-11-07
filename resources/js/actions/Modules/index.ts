import CspManagement from './CspManagement'
import Customer from './Customer'
import Deployment from './Deployment'
import Document from './Document'
import Freshdesk from './Freshdesk'
import Ohdear from './Ohdear'
import Organisation from './Organisation'
import Sansec from './Sansec'
import Ticket from './Ticket'
import Timesheet from './Timesheet'
import Webhook from './Webhook'
import Website from './Website'
import Xero from './Xero'

const Modules = {
    CspManagement: Object.assign(CspManagement, CspManagement),
    Customer: Object.assign(Customer, Customer),
    Deployment: Object.assign(Deployment, Deployment),
    Document: Object.assign(Document, Document),
    Freshdesk: Object.assign(Freshdesk, Freshdesk),
    Ohdear: Object.assign(Ohdear, Ohdear),
    Organisation: Object.assign(Organisation, Organisation),
    Sansec: Object.assign(Sansec, Sansec),
    Ticket: Object.assign(Ticket, Ticket),
    Timesheet: Object.assign(Timesheet, Timesheet),
    Webhook: Object.assign(Webhook, Webhook),
    Website: Object.assign(Website, Website),
    Xero: Object.assign(Xero, Xero),
}

export default Modules