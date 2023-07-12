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

    return new Ticket({
      id: ticket._id,
      code: ticket.code,
      purchaser: ticket.purchaser,
      purchase_datetime: ticket.purchase_datetime,
      amount: ticket.amount,
      products: ticket.products
    })
  }

  async getOne(tid) {
    const ticket = await this.ticketsDao.getOne(tid)
    return new Ticket({
      id: ticket._id,
      code: ticket.code,
      purchaser: ticket.purchaser,
      purchase_datetime: ticket.purchase_datetime,
      amount: ticket.amount,
      products: ticket.products
    })
  }

  async getAll(purchaser) {
    const tickets = await this.ticketsDao.getAll(purchaser)
    const transformedTickets = tickets.map(({ _id, code, purchase_datetime, amount, products, purchaser }) => {
      return new Ticket({
        id: _id,
        code,
        purchaser,
        purchase_datetime,
        amount,
        products
      })
    })
    return transformedTickets
  }
}
