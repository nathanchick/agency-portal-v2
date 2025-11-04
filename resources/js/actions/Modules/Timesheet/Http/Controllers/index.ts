import TimesheetController from './TimesheetController'
import TimeEntryController from './TimeEntryController'
import ServiceController from './ServiceController'
import ServiceBudgetPeriodController from './ServiceBudgetPeriodController'
import TaskController from './TaskController'

const Controllers = {
    TimesheetController: Object.assign(TimesheetController, TimesheetController),
    TimeEntryController: Object.assign(TimeEntryController, TimeEntryController),
    ServiceController: Object.assign(ServiceController, ServiceController),
    ServiceBudgetPeriodController: Object.assign(ServiceBudgetPeriodController, ServiceBudgetPeriodController),
    TaskController: Object.assign(TaskController, TaskController),
}

export default Controllers