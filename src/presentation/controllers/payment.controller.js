import { PaymentService } from '../../services/index.js'

export class PaymentController {
  static async createPaymentIntent(req, res, next) {
    const { items } = req.body
    const paymentService = new PaymentService()
    const paymentIntent = await paymentService.createPaymentIntent(items)
    res.status(200).send({
      clientSecret: paymentIntent.clientSecret
    })
  }
}
