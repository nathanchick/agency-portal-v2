import customers from './customers'
import documentRequests from './document-requests'
import projects from './projects'
import websites from './websites'
import tickets from './tickets'

const api = {
    customers: Object.assign(customers, customers),
    documentRequests: Object.assign(documentRequests, documentRequests),
    projects: Object.assign(projects, projects),
    websites: Object.assign(websites, websites),
    tickets: Object.assign(tickets, tickets),
}

export default api