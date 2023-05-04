import { Router } from 'express'
import controller from '../controllers/product.controller.js'
import { productValidation } from '../middlewares/validations/productValidations.js'

const productsRoutes = Router()

productsRoutes
  .get('/', productValidation.getProducts, controller.getProducts) // Obtiene todos los productos
  .post('/', productValidation.createProduct, controller.createProduct) // Crea un producto
  .get('/:id', productValidation.getOneProduct, controller.getProductById) // Obtiene un producto por id
  .delete('/:id', productValidation.deleteProduct, controller.deleteProductById) // Elimina un producto por id
  .put('/:id', productValidation.updateProduct, controller.updateProduct) // Actualiza un producto por id

export default productsRoutes
