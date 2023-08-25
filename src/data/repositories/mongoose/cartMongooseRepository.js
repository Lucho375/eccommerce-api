import { CartModel } from '../../models/index.js'

export class CartMongooseRepository {
  async addProduct(cid, pid) {
    const cart = await CartModel.findOne({ _id: cid, 'products._id': pid })
    if (cart) {
      const updatedCart = await CartModel.findOneAndUpdate(
        { _id: cid, 'products._id': pid },
        { $inc: { 'products.$.quantity': 1 } },
        { new: true }
      )
      return updatedCart
    }
    const newCart = await CartModel.findByIdAndUpdate(
      cid,
      { $push: { products: { _id: pid, quantity: 1 } } },
      { new: true }
    )
    return newCart
  }

  create({ user }) {
    return CartModel.create({ user })
  }

  get(user) {
    return CartModel.findOne({ user })
  }

  deleteProduct(cid, pid) {
    return CartModel.findByIdAndUpdate(cid, { $pull: { products: { _id: pid } } }, { new: true })
  }

  updateProductQuantity(cid, pid, quantity) {
    return CartModel.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    )
  }

  deleteAllProducts(cid) {
    return CartModel.findByIdAndUpdate({ _id: cid }, { $set: { products: [] } }, { new: true })
  }

  async checkout(cid) {
    const cartToCheckout = await CartModel.findById(cid)
      .populate('user', '-_id email')
      .populate('products._id', 'price')
    return {
      ...cartToCheckout._doc,
      products: cartToCheckout.products.map(({ _id, quantity }) => ({
        id: _id._id,
        price: _id.price,
        quantity
      }))
    }
  }
}
