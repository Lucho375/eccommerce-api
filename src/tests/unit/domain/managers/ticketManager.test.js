import TestServer from '../../..'
import Ticket from '../../../../domain/entities/ticket'
import { TicketManager } from '../../../../domain/managers/ticketManager.js'

describe('TicketManager', () => {
  let db, ticketId

  beforeAll(async () => {
    const { db: dbInstance } = await TestServer()
    db = dbInstance
    await db.init(process.env.DB_URI_TEST)
  })

  afterAll(async () => {
    await db.dropDatabase()
    await db.close()
  })

  describe('TicketManager.create()', () => {
    it('should return created ticket', async () => {
      const ticketManager = new TicketManager()
      expect(ticketManager instanceof TicketManager).toBe(true)
      const newTicket = await ticketManager.create({
        amount: 1500,
        products: [],
        purchaser: 'email@email.com'
      })
      expect(newTicket.amount).toBe(1500)
      expect(newTicket instanceof Ticket).toBe(true)
      expect(newTicket.products.length).toBe(0)
      expect(newTicket.purchaser).toBe('email@email.com')
      ticketId = newTicket.id
    })
  })

  describe('TicketManager.getOne(tid)', () => {
    it('should return a Ticket{} for a specific ticketId', async () => {
      const ticketManager = new TicketManager()
      const ticket = await ticketManager.getOne(ticketId)
      expect(ticket.amount).toBe(1500)
      expect(ticket.purchaser).toBe('email@email.com')
      expect(ticket.products.length).toBe(0)
    })
  })

  describe('TicketManager.getAll(purchaser)', () => {
    it('should return Ticket[] for a specific purchaser', async () => {
      const ticketManager = new TicketManager()
      const tickets = await ticketManager.getAll('email@email.com')
      expect(tickets.length).toBe(1)
      expect(tickets[0].amount).toBe(1500)
      expect(tickets[0].purchaser).toBe('email@email.com')
      expect(Object.keys(tickets[0]).length).toBe(6)
    })
  })
})
