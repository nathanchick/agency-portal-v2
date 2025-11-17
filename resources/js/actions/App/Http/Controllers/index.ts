import Auth from './Auth'
import Extension from './Extension'
import DashboardController from './DashboardController'
import TeamController from './TeamController'
import NotificationController from './NotificationController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Extension: Object.assign(Extension, Extension),
    DashboardController: Object.assign(DashboardController, DashboardController),
    TeamController: Object.assign(TeamController, TeamController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers