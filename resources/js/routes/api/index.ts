import cspmanagement from './cspmanagement'
import api from './api'
import deployments from './deployments'
import freshdesk from './freshdesk'
import ohdear from './ohdear'
import openai from './openai'
import organisation from './organisation'
import postmark from './postmark'
import sansec from './sansec'
import timesheet from './timesheet'
import webhook from './webhook'
import website from './website'
import xero from './xero'

const api = {
    cspmanagement: Object.assign(cspmanagement, cspmanagement),
    api: Object.assign(api, api),
    deployments: Object.assign(deployments, deployments),
    freshdesk: Object.assign(freshdesk, freshdesk),
    ohdear: Object.assign(ohdear, ohdear),
    openai: Object.assign(openai, openai),
    organisation: Object.assign(organisation, organisation),
    postmark: Object.assign(postmark, postmark),
    sansec: Object.assign(sansec, sansec),
    timesheet: Object.assign(timesheet, timesheet),
    webhook: Object.assign(webhook, webhook),
    website: Object.assign(website, website),
    xero: Object.assign(xero, xero),
}

export default api