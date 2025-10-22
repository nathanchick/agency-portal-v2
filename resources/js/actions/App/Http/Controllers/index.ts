import Auth from './Auth'
import TeamController from './TeamController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    TeamController: Object.assign(TeamController, TeamController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers