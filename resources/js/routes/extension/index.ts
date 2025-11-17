import auth from './auth'
import token from './token'

const extension = {
    auth: Object.assign(auth, auth),
    token: Object.assign(token, token),
}

export default extension