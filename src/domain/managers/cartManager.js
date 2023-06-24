import CartsDao from '../../data/daos/cartsDao.js'
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

  async checkout(cid) {
    const checkoutCart = await this.cartDao.checkout(cid)

    let amount = 0

    for (const product of checkoutCart.products) {
      // encontrar cada producto en la base de datos
      const productInDb = await this.productManager.findById(product._id)
      // si el stock de algun producto es 0 throw error
      if (productInDb.stock === 0) {
        throw new ValidationError(`El producto ${productInDb.title} se encuentra sin stock`)
      }

      if (productInDb.stock - product.quantity < 0) {
        // controlar condicion
        console.log(productInDb.stock - product.quantity)
        throw new ValidationError(
          `No tenemos stock suficiente de ${productInDb.title}, actualmente tenemos ${productInDb.stock}u`
        )
      }

      // sumar precio * cantidad
      amount += productInDb.price * product.quantity
      const updatedProduct = await this.productManager.update(product._id, { $inc: { stock: -product.quantity } })
      // si me quedo sin stock actualizo el status del producto
      if (updatedProduct.stock === 0) {
        updatedProduct.status = false
        await updatedProduct.save()
      }
    }

    checkoutCart.products = []
    await checkoutCart.save()

    const ticket = this.ticketManager.create({
      code: 'random-string' + Math.random() * 3,
      purchase_datetime: Date.now(),
      amount,
      purchaser: checkoutCart.userId.email
    })

    return ticket
  }
}
