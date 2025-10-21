import customers from './customers'
import projects from './projects'
import websites from './websites'
import documentRequests from './document-requests'
import tickets from './tickets'

const api = {
    customers: Object.assign(customers, customers),
    projects: Object.assign(projects, projects),
    websites: Object.assign(websites, websites),
    documentRequests: Object.assign(documentRequests, documentRequests),
    tickets: Object.assign(tickets, tickets),
}

export default api