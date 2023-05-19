import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/user.routes.js'
import productsRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import config from './config/config.js'
import sessionRoutes from './routes/session.routes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

// Config
app.use(cors(config.corsOptions))
app.use(cookieParser())
app.use(urlencoded({ extended: true, limit: '2mb' }))
app.use(express.json({ limit: '2mb' }))

// ROUTES
app.use('/products', productsRoutes)
app.use('/sessions', sessionRoutes)
app.use('/users', userRoutes)
app.use('/carts', cartRoutes)

// Error handler
app.use(errorHandler)

// 404
app.all('*', (req, res) => {
  res.sendStatus(404)
})

export default app
