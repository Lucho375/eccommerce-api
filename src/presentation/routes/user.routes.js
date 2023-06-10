import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth/auth.js'
const userRoutes = Router()

userRoutes
  .get('/', isAuthenticated, isAdmin, UserController.getAll)
  .post('/', isAuthenticated, isAdmin, UserController.create)
  .get('/:id', isAuthenticated, isAdmin, UserController.getOne)
  .put('/:id', isAuthenticated, isAdmin, UserController.updateOne)
  .delete('/:id', isAuthenticated, isAdmin, UserController.deleteOne)

export default userRoutes
