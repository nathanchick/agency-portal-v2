import cspmanagement from './cspmanagement'
import api from './api'
import deployments from './deployments'
import ohdear from './ohdear'
import organisation from './organisation'
import sansec from './sansec'
import timesheet from './timesheet'
import webhook from './webhook'
import xero from './xero'

const api = {
    cspmanagement: Object.assign(cspmanagement, cspmanagement),
    api: Object.assign(api, api),
    deployments: Object.assign(deployments, deployments),
    ohdear: Object.assign(ohdear, ohdear),
    organisation: Object.assign(organisation, organisation),
    sansec: Object.assign(sansec, sansec),
    timesheet: Object.assign(timesheet, timesheet),
    webhook: Object.assign(webhook, webhook),
    xero: Object.assign(xero, xero),
}

export default api