import { Router } from 'express'
import sessionController from '../controllers/session.controller.js'
import { checkAvailableEmail } from '../middlewares/checkAvailableEmail.js'
const sessionRoutes = Router()

sessionRoutes.post('/signup', checkAvailableEmail, sessionController.signup)
sessionRoutes.post('/login', sessionController.login)
sessionRoutes.get('/logout', sessionController.logout)
sessionRoutes.get('/get', (req, res) => res.send(req.session.user))

export default sessionRoutes
