import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth/auth.js'
const userRoutes = Router()

userRoutes
  .get('/', isAuthenticated, isAdmin, UserController.getAll)
  .post('/', isAuthenticated, isAdmin, UserController.create)
  .get('/:id', UserController.getOne)
  .put('/:id', UserController.updateOne)
  .delete('/:id', isAuthenticated, isAdmin, UserController.deleteOne)

export default userRoutes
