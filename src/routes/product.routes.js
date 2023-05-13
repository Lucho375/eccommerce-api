import { Router } from 'express'
import controller from '../controllers/product.controller.js'
import { productValidation } from '../middlewares/validations/productValidations.js'
import { isAdminAuthenticated } from '../middlewares/auth/auth.js'

const productsRoutes = Router()

productsRoutes
  //  PUBLIC
  .get('/', productValidation.getProducts, controller.getProducts) // Obtiene todos los productos
  .get('/:id', productValidation.getOneProduct, controller.getProductById) // Obtiene un producto por id

  // PRIVATE
  .post('/', isAdminAuthenticated, productValidation.createProduct, controller.createProduct) // Crea un producto
  .delete('/:id', isAdminAuthenticated, productValidation.deleteProduct, controller.deleteProductById) // Elimina un producto por id
  .put('/:id', isAdminAuthenticated, productValidation.updateProduct, controller.updateProduct) // Actualiza un producto por id

export default productsRoutes
