import Customer from './Customer'
import Document from './Document'
import Organisation from './Organisation'
import Ticket from './Ticket'
import Webhook from './Webhook'

const Modules = {
    Customer: Object.assign(Customer, Customer),
    Document: Object.assign(Document, Document),
    Organisation: Object.assign(Organisation, Organisation),
    Ticket: Object.assign(Ticket, Ticket),
    Webhook: Object.assign(Webhook, Webhook),
}

export default Modules