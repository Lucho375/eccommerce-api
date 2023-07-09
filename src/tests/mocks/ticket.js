import { v4 } from 'uuid'

export const ticketMock = ({ purchaser, amount, productId, productQuantity, productPrice }) => {
  return {
    code: v4(),
    purchase_datetime: new Date(),
    amount,
    purchaser,
    products: [
      {
        _id: productId,
        quantity: productQuantity,
        price: productPrice
      }
    ]
  }
}
