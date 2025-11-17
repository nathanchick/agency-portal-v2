import TicketController from './TicketController'
import Widget from './Widget'

const Api = {
    TicketController: Object.assign(TicketController, TicketController),
    Widget: Object.assign(Widget, Widget),
}

export default Api