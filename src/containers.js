import { asClass, createContainer } from 'awilix'
import {
  CartMongooseRepository,
  ProductMongooseRepository,
  TicketMongooseRepository,
  UserMongooseRepository
} from './data/repositories/index.js'

const containers = createContainer()

containers.register({
  cartDao: asClass(CartMongooseRepository).singleton(),
  productDao: asClass(ProductMongooseRepository).singleton(),
  ticketDao: asClass(TicketMongooseRepository).singleton(),
  userDao: asClass(UserMongooseRepository).singleton()
})

export default containers
