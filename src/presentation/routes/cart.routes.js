import { Router } from 'express'
import { CartController } from '../controllers/cart.controller.js'
import { isAuthenticated } from '../middlewares/auth/auth.js'

const router = Router()

router
  .get('/:user', isAuthenticated, CartController.get)
  .post('/', isAuthenticated, CartController.create)
  .post('/:cid/products/:pid', isAuthenticated, CartController.addProduct)
  .delete('/:cid/products/:pid', isAuthenticated, CartController.deleteProduct)
  .put('/:cid/products/:pid', isAuthenticated, CartController.updateProductQuantity)
  .delete('/:cid', isAuthenticated, CartController.deleteAllProducts)
  .post('/:cid/purchase', isAuthenticated, CartController.checkout)

export default router
