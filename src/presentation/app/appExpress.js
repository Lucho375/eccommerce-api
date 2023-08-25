import * as Sentry from '@sentry/node'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { urlencoded } from 'express'
import swaggerUiExpress from 'swagger-ui-express'

// ROUTES
import { CartRoutes, PaymentRoutes, ProductRoutes, SessionRoutes, TicketRoutes, UserRoutes } from '../routes/index.js'
// MIDDLEWARES
import { errorHandler, notFound, requestInfoLogger } from '../middlewares/index.js'
// CONFIG
import config from '../../config/index.js'
import logger from '../../pino.js'
import { SentryService } from '../../services/index.js'
import { specs, swaggerTheme } from '../../swagger.js'

class AppExpress {
  init() {
    this.app = express()
    this.sentryService = new SentryService(this.app)
    this.sentryService.initialize()
    this.app.port = config.SERVER_PORT
    this.app.use(cors(config.corsOptions))
    this.app.use(urlencoded({ extended: true, limit: '5mb' }))
    this.app.use(express.json({ limit: '5mb' }))
    this.app.use(cookieParser())
    this.app.disable('x-powered-by')
  }

  build() {
    // Sentry Handlers
    this.app.use(Sentry.Handlers.requestHandler())
    this.app.use(Sentry.Handlers.tracingHandler())

    // logger
    this.app.use(requestInfoLogger)

    // Routes
    this.app.use('/api/products', ProductRoutes)
    this.app.use('/api/sessions', SessionRoutes)
    this.app.use('/api/users', UserRoutes)
    this.app.use('/api/carts', CartRoutes)
    this.app.use('/api/tickets', TicketRoutes)
    this.app.use('/api/payments', PaymentRoutes)

    // Docs
    this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs, swaggerTheme))

    // Sentry errorHandler
    this.app.use(Sentry.Handlers.errorHandler())

    // ErrorHandler
    this.app.use(errorHandler)

    // 404
    this.app.all('*', notFound)
  }

  getApp() {
    return this.app
  }

  listen() {
    return this.app.listen(this.app.port, () => logger.info(`Server running on port : ${this.app.port}`))
  }
}

export default AppExpress
