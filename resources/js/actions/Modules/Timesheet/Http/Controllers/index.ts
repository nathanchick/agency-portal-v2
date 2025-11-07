import TimesheetController from './TimesheetController'
import TimeEntryController from './TimeEntryController'
import ServiceController from './ServiceController'
import ServiceBudgetPeriodController from './ServiceBudgetPeriodController'
import TaskController from './TaskController'
import ReportController from './ReportController'
import SavedReportController from './SavedReportController'
import ScheduledReportController from './ScheduledReportController'
import Customer from './Customer'

const Controllers = {
    TimesheetController: Object.assign(TimesheetController, TimesheetController),
    TimeEntryController: Object.assign(TimeEntryController, TimeEntryController),
    ServiceController: Object.assign(ServiceController, ServiceController),
    ServiceBudgetPeriodController: Object.assign(ServiceBudgetPeriodController, ServiceBudgetPeriodController),
    TaskController: Object.assign(TaskController, TaskController),
    ReportController: Object.assign(ReportController, ReportController),
    SavedReportController: Object.assign(SavedReportController, SavedReportController),
    ScheduledReportController: Object.assign(ScheduledReportController, ScheduledReportController),
    Customer: Object.assign(Customer, Customer),
}

export default Controllers