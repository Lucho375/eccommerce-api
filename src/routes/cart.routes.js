import { Router } from 'express'
import { CartController } from '../controllers/cart.controller.js'

const router = Router()

router
  .get('/:cid', CartController.get) // Obtiene un carrito
  .post('/', CartController.create) // Crea un carrito
  .post('/:cid/products/:pid', CartController.addProduct) // Agrega un producto al carrito
  .delete('/:cid/products/:pid', CartController.deleteProduct) // Elimina un producto de el carrito
  .put('/:cid/products/:pid', CartController.updateProductQuantity) // Actualiza la cantidad del producto en un carrito
  .delete('/:cid', CartController.deleteAllProducts) // Borra todos los productos de un carrito

export default router
