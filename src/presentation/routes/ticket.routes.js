import { Router } from 'express'
import TicketController from '../controllers/ticket.controller.js'
import { isAuthenticated } from '../middlewares/auth/auth.js'

const router = Router()

router.get('/', isAuthenticated, TicketController.getAll)
router.get('/:tid', isAuthenticated, TicketController.getOne)

export default router
