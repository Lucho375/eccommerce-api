import { model, Schema } from 'mongoose'

const CartSchema = new Schema({
  products: {
    type: [
      {
        _id: {
          type: Schema.Types.ObjectId
        },
        quantity: {
          type: Number
        }
      }
    ],
    default: []
  }
})

const CartModel = model('Carts', CartSchema)

export default CartModel
