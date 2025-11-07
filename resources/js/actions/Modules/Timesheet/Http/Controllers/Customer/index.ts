import CustomerServiceController from './CustomerServiceController'
import CustomerReportController from './CustomerReportController'

const Customer = {
    CustomerServiceController: Object.assign(CustomerServiceController, CustomerServiceController),
    CustomerReportController: Object.assign(CustomerReportController, CustomerReportController),
}

export default Customer