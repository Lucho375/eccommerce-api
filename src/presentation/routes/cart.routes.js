import { Router } from 'express'
import { CartController } from '../controllers/cart.controller.js'
import { isAuthenticated } from '../middlewares/auth/auth.js'

const router = Router()

router
  .get('/:user', isAuthenticated, CartController.get) // Obtiene un carrito
  .post('/', isAuthenticated, CartController.create) // Crea un carrito
  .post('/:cid/products/:pid', isAuthenticated, CartController.addProduct) // Agrega un producto al carrito
  .delete('/:cid/products/:pid', isAuthenticated, CartController.deleteProduct) // Elimina un producto de el carrito
  .put('/:cid/products/:pid', isAuthenticated, CartController.updateProductQuantity) // Actualiza la cantidad del producto en un carrito
  .delete('/:cid', isAuthenticated, CartController.deleteAllProducts) // Borra todos los productos de un carrito
  .post('/:cid/purchase', isAuthenticated, CartController.checkout) // finalizar compra

export default router
