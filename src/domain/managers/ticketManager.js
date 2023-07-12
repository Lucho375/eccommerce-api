import TicketDao from '../../data/daos/ticketsDao.js'
import { v4 as uuidv4 } from 'uuid'
import Ticket from '../entities/ticket.js'
export class TicketManager {
  constructor() {
    this.ticketsDao = new TicketDao()
  }

  async create({ amount, purchaser, products }) {
    const ticket = await this.ticketsDao.create({
      code: uuidv4(),
      purchase_datetime: Date.now(),
      amount,
      purchaser,
      products
    })

    return this.#transformTickets(ticket)
  }

  async getOne(tid) {
    const ticket = await this.ticketsDao.getOne(tid)
    return this.#transformTickets(ticket)
  }

  async getAll(purchaser) {
    const tickets = await this.ticketsDao.getAll(purchaser)
    return this.#transformTickets(tickets)
  }

  #transformTickets(data) {
    if (Array.isArray(data))
      return data.map(
        ticket =>
          new Ticket({
            id: ticket._id.toString(),
            ...ticket.toObject()
          })
      )

    return new Ticket({
      id: data._id.toString(),
      code: data.code,
      purchaser: data.purchaser,
      purchase_datetime: data.purchase_datetime,
      amount: data.amount,
      products: data.products
    })
  }
}
