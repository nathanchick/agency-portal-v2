import Auth from './Auth'
import TeamController from './TeamController'
import NotificationController from './NotificationController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    TeamController: Object.assign(TeamController, TeamController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers