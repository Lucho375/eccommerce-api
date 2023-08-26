import { Router } from 'express'
import { SessionController } from '../controllers/index.js'
import { asyncErrorWrapper, isAuthenticated } from '../middlewares/index.js'

const sessionRoutes = Router()

sessionRoutes
  .post('/signup', asyncErrorWrapper(SessionController.signup))
  .post('/login', asyncErrorWrapper(SessionController.login))
  .post('/forgot-password', asyncErrorWrapper(SessionController.forgotPassword))
  .post('/reset-password', asyncErrorWrapper(SessionController.resetPassword))
  .get('/logout', asyncErrorWrapper(SessionController.logout))
  .get('/refresh-token', asyncErrorWrapper(SessionController.refreshToken))
  .get('/current', isAuthenticated, asyncErrorWrapper(SessionController.getCurrentUser))

export default sessionRoutes
