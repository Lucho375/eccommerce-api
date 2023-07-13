import Ticket from '../../../../domain/entities/ticket'

describe('Ticket', () => {
  it('should have the correct properties', () => {
    const ticketData = {
      id: '12345',
      code: 'ticket123',
      purchase_datetime: new Date(),
      amount: 1500,
      purchaser: 'email@email.com',
      products: ['Prod1', 'Prod2']
    }

    const ticket = new Ticket(ticketData)
    expect(ticket).toEqual(ticket)
  })
})
