import { TicketModel } from '../models/ticket.model.js'

class TicketDao {
  create(ticket) {
    return TicketModel.create(ticket)
  }
}

export default TicketDao
