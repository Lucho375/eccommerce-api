import { Router } from 'express'
import { ProductController } from '../controllers/index.js'
import { asyncErrorWrapper, imageUploader, isAdmin, isAuthenticated, upload } from '../middlewares/index.js'

const productsRoutes = Router()

productsRoutes
  .get('/', isAuthenticated, asyncErrorWrapper(ProductController.getProducts))
  .get('/:id', isAuthenticated, asyncErrorWrapper(ProductController.getProductById))
  .post(
    '/',
    isAuthenticated,
    isAdmin,
    upload.single('file'),
    imageUploader('products'),
    asyncErrorWrapper(ProductController.createProduct)
  )
  .delete('/:id', isAuthenticated, isAdmin, asyncErrorWrapper(ProductController.deleteProductById))
  .put('/:id', isAuthenticated, isAdmin, asyncErrorWrapper(ProductController.updateProduct))

export default productsRoutes
