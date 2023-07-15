import Ticket from '../../../../domain/entities/ticket'

describe('Ticket', () => {
  const ticketData = {
    id: '12345',
    code: 'ticket123',
    purchase_datetime: new Date(),
    amount: 1500,
    purchaser: 'email@email.com',
    products: ['Prod1', 'Prod2']
  }

  it('should create a new instance of Ticket', () => {
    const ticket = new Ticket(ticketData)
    expect(ticket instanceof Ticket).toBe(true)
  })

  it('should have correct properties', () => {
    const ticket = new Ticket(ticketData)
    expect(ticket).toHaveProperty('id', expect.any(String))
    expect(ticket).toHaveProperty('code', expect.any(String))
    expect(ticket).toHaveProperty('purchase_datetime', expect.any(Date))
    expect(ticket).toHaveProperty('amount', expect.any(Number))
    expect(ticket).toHaveProperty('purchaser', expect.any(String))
    expect(ticket).toHaveProperty('products', expect.any(Array))
  })

  it('should have valid property values', () => {
    const ticket = new Ticket(ticketData)
    expect(ticket.id).toEqual(ticketData.id)
    expect(ticket.code).toEqual(ticketData.code)
    expect(ticket.purchase_datetime).toEqual(ticketData.purchase_datetime)
    expect(ticket.amount).toEqual(ticketData.amount)
    expect(ticket.purchaser).toEqual(ticketData.purchaser)
    expect(ticket.products).toEqual(ticketData.products)
  })

  it('should match the ticketData object', () => {
    const ticket = new Ticket(ticketData)
    expect(ticket).toEqual(ticketData)
  })
})
