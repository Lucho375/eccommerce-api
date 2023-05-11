import { Router } from 'express'
import userController from '../controllers/user.controller.js'
const userRoutes = Router()

userRoutes.get('/', userController.getAll)
userRoutes.post('/', userController.create)
userRoutes.get('/:id', userController.getOne)
userRoutes.put('/:id', userController.updateOne)
userRoutes.delete('/:id', userController.deleteOne)

export default userRoutes
