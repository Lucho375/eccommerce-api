import { TicketManager } from '../../domain/index.js'

export class TicketController {
  static async getOne(req, res) {
    const { tid } = req.params
    res.send('ok')
  }

  static async getAll(req, res) {
    const { purchaser } = req.query
    const manager = new TicketManager()
    const tickets = await manager.getAll(purchaser)
    res.status(200).send({ ok: true, payload: tickets })
  }
}
