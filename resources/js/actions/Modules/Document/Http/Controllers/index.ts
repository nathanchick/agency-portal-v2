import Api from './Api'
import DocumentTypeController from './DocumentTypeController'
import DocumentController from './DocumentController'
import CustomerDocumentController from './CustomerDocumentController'

const Controllers = {
    Api: Object.assign(Api, Api),
    DocumentTypeController: Object.assign(DocumentTypeController, DocumentTypeController),
    DocumentController: Object.assign(DocumentController, DocumentController),
    CustomerDocumentController: Object.assign(CustomerDocumentController, CustomerDocumentController),
}

export default Controllers