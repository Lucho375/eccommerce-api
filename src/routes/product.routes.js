import { Router } from 'express'

import { isAdmin, isAuthenticated } from '../middlewares/auth/auth.js'
import { ProductController } from '../controllers/product.controller.js'

const productsRoutes = Router()

productsRoutes
  //  PUBLIC
  .get('/', ProductController.getProducts) // Obtiene todos los productos
  .get('/:id', ProductController.getProductById) // Obtiene un producto por id

  // PRIVATE
  .post('/', isAuthenticated, isAdmin, ProductController.createProduct) // Crea un producto
  .delete('/:id', isAuthenticated, isAdmin, ProductController.deleteProductById) // Elimina un producto por id
  .put('/:id', isAuthenticated, isAdmin, ProductController.updateProduct) // Actualiza un producto por id

export default productsRoutes
