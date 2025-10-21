import api from './api'
import organisation from './organisation'
import webhook from './webhook'

const api = {
    api: Object.assign(api, api),
    organisation: Object.assign(organisation, organisation),
    webhook: Object.assign(webhook, webhook),
}

export default api