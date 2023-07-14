import { dependencies } from '../../constants/dependencies.js'
import containers from '../../containers.js'
import Cart from '../entities/cart.js'
import { NotFoundError, ValidationError } from '../validations/ValidationError.js'
import { ProductManager } from './productManager.js'
import { TicketManager } from './ticketManager.js'

export class CartManager {
  constructor() {
    this.cartRepository = containers.resolve(dependencies.cartDao)
    this.productManager = new ProductManager()
    this.ticketManager = new TicketManager()
  }

  addProduct(cid, pid) {
    return this.cartRepository.addProduct(cid, pid)
  }

  async create(cart) {
    const cartInDb = await this.cartRepository.create(cart)

    return new Cart({
      id: cartInDb._id,
      user: cartInDb.user,
      products: cartInDb.products
    })
  }

  async get(user) {
    const cart = await this.cartRepository.get(user)
    if (!cart) throw new NotFoundError('Cart doesnt exists')

    return new Cart({
      id: cart._id,
      user: cart.user,
      products: cart.products
    })
  }

  deleteProduct(cid, pid) {
    return this.cartRepository.deleteProduct(cid, pid)
  }

  updateProductQuantity(cid, pid, quantity) {
    return this.cartRepository.updateProductQuantity(cid, pid, quantity)
  }

  deleteAllProducts(cid) {
    return this.cartRepository.deleteAllProducts(cid)
  }

  async checkout(cid) {
    const checkoutCart = await this.cartRepository.checkout(cid)
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

    await this.cartRepository.deleteAllProducts(cid)

    return ticket
  }
}
