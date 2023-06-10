import CartModel from '../models/cart.model.js'

class CartsDao {
  async addProduct(cid, pid) {
    const updatedCart = await CartModel.findByIdAndUpdate(
      { _id: cid, 'products._id': pid },
      { $inc: { 'products.$.quantity': 1 } },
      { new: true }
    )

    if (updatedCart) return updatedCart

    const newCart = await CartModel.findByIdAndUpdate(
      cid,
      { $addToSet: { products: { _id: pid, quantity: 1 } } },
      { new: true }
    )
    return newCart
  }

  create() {
    return CartModel.create({ products: [] })
  }

  get(cid) {
    return CartModel.findById({ _id: cid })
  }

  deleteProduct(cid, pid) {
    return CartModel.findByIdAndUpdate(cid, { $pull: { products: { _id: pid } } }, { new: true })
  }

  updateProductQuantity(cid, pid, quantity) {
    return CartModel.findByIdAndUpdate(
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
