import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth/auth.js'
const userRoutes = Router()

userRoutes.get('/', isAuthenticated, isAdmin, userController.getAll)
userRoutes.post('/', isAuthenticated, isAdmin, userController.create)
userRoutes.get('/:id', userController.getOne)
userRoutes.put('/:id', userController.updateOne)
userRoutes.delete('/:id', isAuthenticated, isAdmin, userController.deleteOne)

export default userRoutes
