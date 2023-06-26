import { Router } from 'express'
import TicketController from '../controllers/ticket.controller.js'

const router = Router()

router.get('/', TicketController.getAll)
router.get('/:tid', TicketController.getOne)

export default router
