import Stripe from 'stripe'
import { ProductManager } from '../domain/index.js'

export class PaymentService {
  constructor() {
    this.service = new Stripe(
      'sk_test_51NbA6dLiYJKI0UDjWcfV8UPnCu3FXCXlO65b4GHLQbivOuqrminzXkBD8Uoh4YTA9oMpZz6u8q7O3x5SdHbHVA5o00kkKDltfz'
    )
    this.productManager = new ProductManager()
  }

  async createPaymentIntent(items) {
    const paymentIntent = await this.service.paymentIntents.create({
      amount: 500 * 100,
      currency: 'ars'
    })

    return {
      clientSecret: paymentIntent.client_secret
    }
  }
}
