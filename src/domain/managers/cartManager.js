import { CONTAINERS } from '../../constants/containers.js'
import containers from '../../containers.js'
import { Cart, CartProduct } from '../index.js'
import { NotFoundError, ValidationError } from '../validations/ValidationError.js'
import { ProductManager } from './productManager.js'
import { TicketManager } from './ticketManager.js'

export class CartManager {
  constructor() {
    this.cartRepository = containers.resolve(CONTAINERS.cartDao)
    this.productManager = new ProductManager()
    this.ticketManager = new TicketManager()
  }

  async addProduct(cid, pid) {
    const cart = await this.cartRepository.addProduct(cid, pid)
    return this.#transformCart(cart)
  }

  async create(cart) {
    const cartInDb = await this.cartRepository.create(cart)
    return this.#transformCart(cartInDb)
  }

  async get(user) {
    const cart = await this.cartRepository.get(user)
    if (!cart) throw new NotFoundError('Cart doesnt exists')
    return this.#transformCart(cart)
  }

  async deleteProduct(cid, pid) {
    const deletedProductInCart = await this.cartRepository.deleteProduct(cid, pid)
    return this.#transformCart(deletedProductInCart)
  }

  async updateProductQuantity(cid, pid, quantity) {
    const updatedCart = await this.cartRepository.updateProductQuantity(cid, pid, quantity)
    return this.#transformCart(updatedCart)
  }

  async deleteAllProducts(cid) {
    const emptyCart = await this.cartRepository.deleteAllProducts(cid)
    return this.#transformCart(emptyCart)
  }

  async checkout(cid) {
    const checkoutCart = await this.cartRepository.checkout(cid)
    let totalAmount = 0

    for (const product of checkoutCart.products) {
      const productInDb = await this.productManager.findById(product.id)
      if (productInDb.stock === 0) {
        throw new ValidationError(`El producto ${productInDb.title} se encuentra sin stock`)
      }
      if (productInDb.stock - product.quantity < 0) {
        throw new ValidationError(
          `No tenemos stock suficiente de ${productInDb.title}, actualmente tenemos ${productInDb.stock}u`
        )
      }
      totalAmount += productInDb.price * product.quantity

      const updatedProduct = await this.productManager.update(product.id, { $inc: { stock: -product.quantity } })

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

  #transformCart(data) {
    if (!data) return null
    return new Cart({
      id: data._id.toString(),
      user: data.user.toString(),
      products: data.products.map(product => new CartProduct(product))
    })
  }
}
