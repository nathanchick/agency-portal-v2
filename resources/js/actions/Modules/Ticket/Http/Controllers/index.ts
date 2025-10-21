import Api from './Api'
import TicketController from './TicketController'

const Controllers = {
    Api: Object.assign(Api, Api),
    TicketController: Object.assign(TicketController, TicketController),
}

export default Controllers