import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from '../routes/user.routes.js'
import productsRoutes from '../routes/product.routes.js'
import cartRoutes from '../routes/cart.routes.js'
import config from '../../config/index.js'
import sessionRoutes from '../routes/session.routes.js'
import errorHandler from '../middlewares/errorHandler.js'
import NotFound from '../middlewares/NotFound.js'

class AppExpress {
  init() {
    this.app = express()
    this.app.port = config.SERVER_PORT
    this.app.use(cors(config.corsOptions))
    this.app.use(urlencoded({ extended: true, limit: '2mb' }))
    this.app.use(express.json({ limit: '2mb' }))
    this.app.use(cookieParser())
  }

  build() {
    // Routes
    this.app.use('/products', productsRoutes)
    this.app.use('/sessions', sessionRoutes)
    this.app.use('/users', userRoutes)
    this.app.use('/carts', cartRoutes)

    // ErrorHandler
    this.app.use(errorHandler)

    // 404
    this.app.all('*', NotFound)
  }

  listen() {
    return this.app.listen(this.app.port, () => console.log(`Server running on port : ${this.app.port}`))
  }
}

export default AppExpress
