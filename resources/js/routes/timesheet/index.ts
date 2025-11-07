import entries from './entries'
import timer from './timer'
import services from './services'
import tasks from './tasks'
import reports from './reports'

const timesheet = {
    entries: Object.assign(entries, entries),
    timer: Object.assign(timer, timer),
    services: Object.assign(services, services),
    tasks: Object.assign(tasks, tasks),
    reports: Object.assign(reports, reports),
}

export default timesheet