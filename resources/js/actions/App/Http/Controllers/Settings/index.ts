import ProfileController from './ProfileController'
import OrganisationController from './OrganisationController'
import PasswordController from './PasswordController'
import TwoFactorAuthenticationController from './TwoFactorAuthenticationController'

const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    OrganisationController: Object.assign(OrganisationController, OrganisationController),
    PasswordController: Object.assign(PasswordController, PasswordController),
    TwoFactorAuthenticationController: Object.assign(TwoFactorAuthenticationController, TwoFactorAuthenticationController),
}

export default Settings