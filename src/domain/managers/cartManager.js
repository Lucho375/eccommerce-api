import CartsDao from '../../data/daos/cartsDao.js'
import Cart from '../entities/cart.js'
import { NotFoundError, ValidationError } from '../validations/ValidationError.js'
import { ProductManager } from './productManager.js'
import { TicketManager } from './ticketManager.js'

export class CartManager {
  constructor() {
    this.cartDao = new CartsDao()
    this.productManager = new ProductManager()
    this.ticketManager = new TicketManager()
  }

  addProduct(cid, pid) {
    return this.cartDao.addProduct(cid, pid)
  }

  async create(cart) {
    const cartInDb = await this.cartDao.create(cart)

    return new Cart({
      id: cartInDb._id,
      user: cartInDb.user,
      products: cartInDb.products
    })
  }

  async get(user) {
    const cart = await this.cartDao.get(user)
    if (!cart) throw new NotFoundError('Cart doesnt exists')

    return new Cart({
      id: cart._id,
      user: cart.user,
      products: cart.products
    })
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

  async checkout(cid) {
    const checkoutCart = await this.cartDao.checkout(cid)
    let totalAmount = 0

    for (const product of checkoutCart.products) {
      const productInDb = await this.productManager.findById(product._id)
      if (productInDb.stock === 0) {
        throw new ValidationError(`El producto ${productInDb.title} se encuentra sin stock`)
      }
      if (productInDb.stock - product.quantity < 0) {
        throw new ValidationError(
          `No tenemos stock suficiente de ${productInDb.title}, actualmente tenemos ${productInDb.stock}u`
        )
      }
      totalAmount += productInDb.price * product.quantity

      const updatedProduct = await this.productManager.update(product._id, { $inc: { stock: -product.quantity } })

      if (updatedProduct.stock === 0) {
        updatedProduct.status = false
        await updatedProduct.save()
      }
    }

    const ticket = await this.ticketManager.create({
      amount: totalAmount,
      purchaser: checkoutCart.user.email,
      products: checkoutCart.products
    })

    await this.cartDao.deleteAllProducts(cid)

    return ticket
  }
}
