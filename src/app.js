import express, { urlencoded } from 'express'
import productsRoutes from './routes/product.routes.js'
import userRoutes from './routes/user.routes.js'
import cartRoutes from './routes/cart.routes.js'
import cors from 'cors'
import config from './config/config.js'

const app = express()
app.use(cors(config.corsOptions))
app.use(urlencoded({ extended: true, limit: '2mb' }))
app.use(express.json({ limit: '2mb' }))
app.use('/products', productsRoutes)
app.use('/users', userRoutes)
app.use('/carts', cartRoutes)

export default app
