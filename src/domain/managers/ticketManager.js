import TicketDao from '../../data/daos/ticketsDao.js'

export class TicketManager {
  constructor() {
    this.ticketsDao = new TicketDao()
  }

  create(ticket) {
    return this.ticketsDao.create(ticket)
  }
}
