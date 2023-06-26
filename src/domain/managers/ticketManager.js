import TicketDao from '../../data/daos/ticketsDao.js'
import { v4 as uuidv4 } from 'uuid'
export class TicketManager {
  constructor() {
    this.ticketsDao = new TicketDao()
  }

  create({ amount, purchaser, products }) {
    return this.ticketsDao.create({
      code: uuidv4(),
      purchase_datetime: Date.now(),
      amount,
      purchaser,
      products
    })
  }

  async getOne(tid) {
    return this.ticketsDao.getOne(tid)
  }

  async getAll(purchaser) {
    return this.ticketsDao.getAll(purchaser)
  }
}
