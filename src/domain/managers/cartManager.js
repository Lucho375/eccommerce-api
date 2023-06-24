import CartsDao from '../../data/daos/cartsDao.js'
import { NotFoundError } from '../validations/ValidationError.js'

export class CartManager {
  constructor() {
    this.cartDao = new CartsDao()
  }

  addProduct(cid, pid) {
    return this.cartDao.addProduct(cid, pid)
  }

  create(cart) {
    return this.cartDao.create(cart)
  }

  async get(userId) {
    const cart = await this.cartDao.get(userId)
    if (!cart) throw new NotFoundError('Cart doesnt exists')

    return {
      id: cart._id,
      products: cart.products
    }
  }

  deleteProduct(cid, pid) {
    return this.cartDao.deleteProduct(cid, pid)
  }

  updateProductQuantity(cid, pid, quantity) {
    return this.cartDao.updateProductQuantity(cid, pid, quantity)
  }

  deleteAllProducts(cid) {
    return this.cartDao.deleteAllProducts(cid)
  }
}
