import XeroController from './XeroController'
import XeroOAuthController from './XeroOAuthController'
import XeroInvoiceController from './XeroInvoiceController'

const Controllers = {
    XeroController: Object.assign(XeroController, XeroController),
    XeroOAuthController: Object.assign(XeroOAuthController, XeroOAuthController),
    XeroInvoiceController: Object.assign(XeroInvoiceController, XeroInvoiceController),
}

export default Controllers