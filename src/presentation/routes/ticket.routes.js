import { Router } from 'express'
import { TicketController } from '../controllers/index.js'
import { asyncErrorWrapper, isAuthenticated } from '../middlewares/index.js'

const router = Router()

router.get('/', isAuthenticated, asyncErrorWrapper(TicketController.getAll))
router.get('/:tid', isAuthenticated, asyncErrorWrapper(TicketController.getOne))

export default router
