import { model, Schema } from 'mongoose'

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  products: {
    type: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    default: []
  }
})

export const CartModel = model('Cart', CartSchema)
