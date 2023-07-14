import { v4 as uuidv4 } from 'uuid'
import containers from '../../containers.js'
import { dependencies } from '../../constants/dependencies.js'
export class TicketManager {
  #ticketRepository
  constructor() {
    this.#ticketRepository = containers.resolve(dependencies.ticketDao)
  }

  create({ amount, purchaser, products }) {
    return this.#ticketRepository.create({
      code: uuidv4(),
      purchase_datetime: Date.now(),
      amount,
      purchaser,
      products
    })
  }

  getOne(tid) {
    return this.#ticketRepository.getOne(tid)
  }

  getAll(purchaser) {
    return this.#ticketRepository.getAll(purchaser)
  }
}
