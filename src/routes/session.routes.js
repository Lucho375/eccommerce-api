import { Router } from 'express'
import { checkAvailableEmail } from '../middlewares/checkAvailableEmail.js'
import SessionController from '../controllers/session.controller.js'
const sessionRoutes = Router()

sessionRoutes
  .post('/signup', checkAvailableEmail, SessionController.signup)
  .post('/login', SessionController.login)
  .get('/logout', SessionController.logout)
  .get('/refreshtoken', SessionController.refreshToken)

export default sessionRoutes
