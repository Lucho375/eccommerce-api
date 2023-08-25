import { Router } from 'express'
import { CartController } from '../controllers/index.js'
import { asyncErrorWrapper, isAuthenticated } from '../middlewares/index.js'

const router = Router()

router
  .get('/:user', isAuthenticated, asyncErrorWrapper(CartController.get))
  .post('/', isAuthenticated, asyncErrorWrapper(CartController.create))
  .post('/:cid/products/:pid', isAuthenticated, asyncErrorWrapper(CartController.addProduct))
  .delete('/:cid/products/:pid', isAuthenticated, asyncErrorWrapper(CartController.deleteProduct))
  .put('/:cid/products/:pid', isAuthenticated, asyncErrorWrapper(CartController.updateProductQuantity))
  .delete('/:cid', isAuthenticated, asyncErrorWrapper(CartController.deleteAllProducts))
  .post('/:cid/purchase', isAuthenticated, asyncErrorWrapper(CartController.checkout))

export default router
