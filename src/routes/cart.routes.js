import { Router } from 'express'
import cartController from '../controllers/cart.controller.js'

const router = Router()

router
  .get('/:cid', cartController.get) // Obtiene un carrito
  .post('/', cartController.create) // Crea un carrito
  .post('/:cid/products/:pid', cartController.addProduct) // Agrega un producto al carrito
  .delete('/:cid/products/:pid', cartController.deleteProduct) // Elimina un producto de el carrito
  .put('/:cid/products/:pid', cartController.updateProductQuantity) // Actualiza la cantidad del producto en un carrito
  .delete('/:cid', cartController.deleteAllProducts) // Borra todos los productos de un carrito

export default router
