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
import { specs, swaggerTheme } from '../../swagger.js'
import { requestInfoLogger } from '../middlewares/logger.js'
import logger from '../../pino.js'
import Sentry, { sentry } from '../../sentry.js'

class AppExpress {
  init() {
    this.app = express()
    this.sentry = sentry(this.app)
    this.app.port = config.SERVER_PORT
    this.app.use(cors(config.corsOptions))
    this.app.use(urlencoded({ extended: true, limit: '5mb' }))
    this.app.use(express.json({ limit: '5mb' }))
    this.app.use(cookieParser())
  }

  build() {
    // Sentry Handlers
    this.app.use(Sentry.Handlers.requestHandler())
    this.app.use(Sentry.Handlers.tracingHandler())

    // logger
    this.app.use(requestInfoLogger)

    // Routes
    this.app.use('/api/products', productsRoutes)
    this.app.use('/api/sessions', sessionRoutes)
    this.app.use('/api/users', userRoutes)
    this.app.use('/api/carts', cartRoutes)
    this.app.use('/api/tickets', ticketRoutes)

    // Docs
    this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs, swaggerTheme))

    // Sentry errorHandler
    this.app.use(Sentry.Handlers.errorHandler())

    // ErrorHandler
    this.app.use(errorHandler)

    // 404
    this.app.all('*', NotFound)
  }

  getApp() {
    return this.app
  }

  listen() {
    return this.app.listen(this.app.port, () => logger.info(`Server running on port : ${this.app.port}`))
  }
}

export default AppExpress
