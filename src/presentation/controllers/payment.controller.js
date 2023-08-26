import { PaymentService } from '../../services/index.js'

export class PaymentController {
  static async createPaymentIntent(req, res, next) {
    const { id } = req.body
    const paymentService = new PaymentService()
    const paymentIntent = await paymentService.createPaymentIntent(id)
    res.status(200).send({
      clientSecret: paymentIntent.clientSecret
    })
  }
}
