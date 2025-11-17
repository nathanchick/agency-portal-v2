import billing from './billing'
import deployments from './deployments'
import documents from './documents'
import tickets from './tickets'
import timesheet from './timesheet'

const widgets = {
    billing: Object.assign(billing, billing),
    deployments: Object.assign(deployments, deployments),
    documents: Object.assign(documents, documents),
    tickets: Object.assign(tickets, tickets),
    timesheet: Object.assign(timesheet, timesheet),
}

export default widgets