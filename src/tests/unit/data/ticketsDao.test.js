import TestServer from '../..'
import TicketDao from '../../../data/daos/ticketsDao'
import { ticketMock } from '../../mocks/ticket'

const ticketData = {
  amount: 1200,
  purchaser: 'test@test.com',
  productId: '6441b32dc323dca5fb238d7d',
  productQuantity: 5,
  productPrice: 1200
}

describe('TicketsDao', () => {
  let db
  let ticketId
  const ticketDao = new TicketDao()

  beforeAll(async () => {
    const { db: dbInstance } = await TestServer()
    db = dbInstance
    await db.init(process.env.MONGO_DB_URI_TEST)
  })

  afterAll(async () => {
    await db.dropDatabase()
    await db.close()
  })

  describe('TicketDao.create()', () => {
    it('should return a new ticket', async () => {
      const newTicket = await ticketDao.create(ticketMock(ticketData))
      expect(newTicket.products[0]._id.toString()).toMatch(ticketData.productId)
      ticketId = newTicket._id
    })
  })

  describe('TicketDao.getOne()', () => {
    it('should return a existing ticket', async () => {
      const ticket = await ticketDao.getOne({ _id: ticketId })
      expect(ticket.purchaser).toEqual(ticketData.purchaser)
      expect(ticket.amount).toEqual(ticketData.amount)
      expect(ticket.products[0]._id.toString()).toEqual(ticketData.productId)
      expect(ticket.products[0].quantity).toEqual(ticketData.productQuantity)
      expect(ticket.products[0].price).toEqual(ticketData.productPrice)
    })
  })

  describe('TicketDao.getAll()', () => {
    it('should return all tickets for one purchaser', async () => {
      const tickets = await ticketDao.getAll(ticketData.purchaser)
      expect(Array.isArray(tickets)).toBe(true)
      expect(tickets.length).toBe(1)
    })
  })
})
