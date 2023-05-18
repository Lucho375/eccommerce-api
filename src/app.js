import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'
import session from 'express-session'

import userRoutes from './routes/user.routes.js'
import productsRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import config from './config/config.js'
import sessionRoutes from './routes/session.routes.js'

const app = express()
app.use(cors(config.corsOptions))
app.use(cookieParser())
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: config.MONGO_DB_URI,
      ttl: 10 // expires
    }),
    saveUninitialized: false,
    secret: 'secretstring',
    resave: false
  })
)
app.use(urlencoded({ extended: true, limit: '2mb' }))
app.use(express.json({ limit: '2mb' }))
app.use('/products', productsRoutes)
app.use('/sessions', sessionRoutes)
app.use('/users', userRoutes)
app.use('/carts', cartRoutes)

export default app
