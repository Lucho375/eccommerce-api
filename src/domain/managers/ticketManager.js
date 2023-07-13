import { v4 as uuidv4 } from 'uuid'
import containers from '../../containers.js'
export class TicketManager {
  #ticketRepository
  constructor() {
    this.#ticketRepository = containers.resolve('ticketDao')
  }

  async create({ amount, purchaser, products }) {
    const ticket = await this.#ticketRepository.create({
      code: uuidv4(),
      purchase_datetime: Date.now(),
      amount,
      purchaser,
      products
    })

    return ticket
  }

  async getOne(tid) {
    const ticket = await this.#ticketRepository.getOne(tid)
    return ticket
  }

  async getAll(purchaser) {
    const tickets = await this.#ticketRepository.getAll(purchaser)
    return tickets
  }
}
