import { TicketModel } from '../models/ticket.model.js'

class TicketDao {
  create(ticket) {
    return TicketModel.create(ticket)
  }

  getOne(tid) {
    return TicketModel.findById(tid)
  }

  getAll(purchaser) {
    return TicketModel.find({ purchaser }).populate('products._id')
  }
}

export default TicketDao
