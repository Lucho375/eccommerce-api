import { Router } from 'express'
import SessionController from '../controllers/session.controller.js'
const sessionRoutes = Router()

sessionRoutes
  .post('/signup', SessionController.signup)
  .post('/login', SessionController.login)
  .post('/forgot-password', SessionController.forgotPassword)
  .post('/reset-password', SessionController.resetPassword)
  .get('/logout', SessionController.logout)
  .get('/refresh-token', SessionController.refreshToken)
  .get('/cookie', (req, res) => {
    console.log(req.cookies)
    res.send({ refreshToken: req.cookies.refreshToken })
  })

export default sessionRoutes
