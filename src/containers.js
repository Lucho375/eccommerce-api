import { createContainer, asClass } from 'awilix'
import CartMongooseRepository from './data/repositories/cartMongooseRepository.js'
import ProductMongooseRepository from './data/repositories/productMongooseRepository.js'
import TicketMongooseRepository from './data/repositories/ticketMongooseRepository.js'
import UserMongooseRepository from './data/repositories/userMongooseRepository.js'

const containers = createContainer()

containers.register({
  cartDao: asClass(CartMongooseRepository).singleton(),
  productDao: asClass(ProductMongooseRepository).singleton(),
  ticketDao: asClass(TicketMongooseRepository).singleton(),
  userDao: asClass(UserMongooseRepository).singleton()
})
export default containers
