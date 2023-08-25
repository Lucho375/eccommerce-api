import { Router } from 'express'
import { UserController } from '../controllers/index.js'
import { asyncErrorWrapper, isAdmin, isAuthenticated } from '../middlewares/index.js'
const userRoutes = Router()

userRoutes
  .get('/', isAuthenticated, isAdmin, asyncErrorWrapper(UserController.getAll))
  .post('/', isAuthenticated, isAdmin, asyncErrorWrapper(UserController.create))
  .get('/:id', isAuthenticated, isAdmin, asyncErrorWrapper(UserController.getOne))
  .put('/:id', isAuthenticated, isAdmin, asyncErrorWrapper(UserController.updateOne))
  .delete('/:id', isAuthenticated, isAdmin, asyncErrorWrapper(UserController.deleteOne))

export default userRoutes
