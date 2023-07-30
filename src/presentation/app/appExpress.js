import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUiExpress from 'swagger-ui-express'

import userRoutes from '../routes/user.routes.js'
import productsRoutes from '../routes/product.routes.js'
import cartRoutes from '../routes/cart.routes.js'
import ticketRoutes from '../routes/ticket.routes.js'
import config from '../../config/index.js'
import sessionRoutes from '../routes/session.routes.js'
import errorHandler from '../middlewares/errorHandler.js'
import NotFound from '../middlewares/NotFound.js'
import { specs } from '../../swagger.js'

class AppExpress {
  init() {
    this.app = express()
    this.app.port = config.SERVER_PORT
    this.app.use(cors(config.corsOptions))
    this.app.use(urlencoded({ extended: true, limit: '5mb' }))
    this.app.use(express.json({ limit: '5mb' }))
    this.app.use(cookieParser())
  }

  build() {
    // Routes
    this.app.use('/api/products', productsRoutes)
    this.app.use('/api/sessions', sessionRoutes)
    this.app.use('/api/users', userRoutes)
    this.app.use('/api/carts', cartRoutes)
    this.app.use('/api/tickets', ticketRoutes)

    // Docs
    this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

    // ErrorHandler
    this.app.use(errorHandler)

    // 404
    this.app.all('*', NotFound)
  }

  getApp() {
    return this.app
  }

  listen() {
    return this.app.listen(this.app.port, () => console.log(`Server running on port : ${this.app.port}`))
  }
}

export default AppExpress
