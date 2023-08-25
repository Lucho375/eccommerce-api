import { Router } from 'express'
import { PaymentController } from '../controllers/index.js'
import { asyncErrorWrapper } from '../middlewares/index.js'

const router = Router()

router.post('/create-payment-intent', asyncErrorWrapper(PaymentController.createPaymentIntent))

export default router
