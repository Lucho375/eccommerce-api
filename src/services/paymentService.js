import Stripe from 'stripe'
import { CartManager, ProductManager } from '../domain/index.js'

export class PaymentService {
  constructor() {
    this.service = new Stripe(
      'sk_test_51NbA6dLiYJKI0UDjWcfV8UPnCu3FXCXlO65b4GHLQbivOuqrminzXkBD8Uoh4YTA9oMpZz6u8q7O3x5SdHbHVA5o00kkKDltfz'
    )
    this.productManager = new ProductManager()
    this.cartManager = new CartManager()
  }

  async createPaymentIntent(id) {
    const totalAmount = await this.cartManager.checkout(id)
    const paymentIntent = await this.service.paymentIntents.create({
      amount: totalAmount * 100,
      currency: 'ars'
    })

    return {
      clientSecret: paymentIntent.client_secret
    }
  }
}
