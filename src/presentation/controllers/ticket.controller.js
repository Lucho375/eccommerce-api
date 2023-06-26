import { TicketManager } from '../../domain/managers/ticketManager.js'

class TicketController {
  static async getOne(req, res, next) {
    try {
      const { tid } = req.params
      res.send('ok')
    } catch (error) {
      next(error)
    }
  }

  static async getAll(req, res, next) {
    try {
      const { purchaser } = req.query
      console.log(purchaser)
      const manager = new TicketManager()
      const tickets = await manager.getAll(purchaser)
      res.status(200).send({ ok: true, payload: tickets })
    } catch (error) {
      next(error)
    }
  }
}

export default TicketController
