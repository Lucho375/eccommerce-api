import { TicketModel } from '../models/ticket.model.js'
import Ticket from '../../domain/entities/ticket.js'

class TicketMongooseRepository {
  async create(ticket) {
    const createdTicket = await TicketModel.create(ticket)
    return this.#transformTickets(createdTicket)
  }

  async getOne(tid) {
    const ticket = await TicketModel.findById(tid)
    return this.#transformTickets(ticket)
  }

  async getAll(purchaser) {
    const tickets = await TicketModel.find({ purchaser }).populate('products._id')
    return this.#transformTickets(tickets)
  }

  #transformTickets(data) {
    if (!data) return null
    if (Array.isArray(data))
      return data.map(
        ticket =>
          new Ticket({
            id: ticket._id.toString(),
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchaser: ticket.purchaser,
            products: ticket.products
          })
      )
    return new Ticket({
      id: data._id.toString(),
      code: data.code,
      purchase_datetime: data.purchase_datetime,
      amount: data.amount,
      purchaser: data.purchaser,
      products: data.products
    })
  }
}

export default TicketMongooseRepository
