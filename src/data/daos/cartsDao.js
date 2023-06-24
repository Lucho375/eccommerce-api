import CartModel from '../models/cart.model.js'

class CartsDao {
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

  create({ userId }) {
    return CartModel.create({ userId })
  }

  get(userId) {
    return CartModel.findOne({ userId })
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
}

export default CartsDao
