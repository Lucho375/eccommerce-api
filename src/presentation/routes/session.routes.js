import { Router } from 'express'
import SessionController from '../controllers/session.controller.js'
import { isAuthenticated } from '../middlewares/auth/auth.js'
const sessionRoutes = Router()

sessionRoutes
  .post('/signup', SessionController.signup)
  .post('/login', SessionController.login)
  .post('/forgot-password', SessionController.forgotPassword)
  .post('/reset-password', SessionController.resetPassword)
  .get('/logout', SessionController.logout)
  .get('/refresh-token', SessionController.refreshToken)
  .get('/current', isAuthenticated, SessionController.getCurrentUser)

export default sessionRoutes
