import { Router } from 'express'

import { isAdmin, isAuthenticated } from '../middlewares/auth/auth.js'
import { ProductController } from '../controllers/product.controller.js'
import imageUploader from '../middlewares/imageUploader.js'
import upload from '../middlewares/multer.js'

const productsRoutes = Router()

productsRoutes
  .get('/', isAuthenticated, ProductController.getProducts)
  .get('/:id', isAuthenticated, ProductController.getProductById)
  .post(
    '/',
    isAuthenticated,
    isAdmin,
    upload.single('file'),
    imageUploader('products'),
    ProductController.createProduct
  )
  .delete('/:id', isAuthenticated, isAdmin, ProductController.deleteProductById)
  .put('/:id', isAuthenticated, isAdmin, ProductController.updateProduct)

export default productsRoutes
