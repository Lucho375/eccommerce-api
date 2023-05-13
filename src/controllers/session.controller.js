import SessionManager from '../helpers/sessionManager.js'
import UserManager from '../helpers/userManager.js'
import { request, response } from 'express'

const sessionController = Object.freeze({
  signup: async (req = request, res = response) => {
    try {
      const manager = new SessionManager()
      // eslint-disable-next-line
      const newUser = await manager.signup(req.body)
      res.status(201).send({ status: 'success' })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  },
  login: async (req = request, res = response) => {
    try {
      if (req.session.user) {
        return res.redirect(`${req.protocol}://${req.get('host')}/products`)
      }
      const { email, password } = req.body
      const userManager = new UserManager()
      const dbUser = await userManager.getOne({ email })

      if (dbUser === null) return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // email doesnt exist

      const manager = new SessionManager()
      const user = await manager.login(password, dbUser)

      if (user === false) return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // wrong password
      req.session.user = { email: user.email, firstname: user.firstname }
      res.redirect('/products')
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  },

  logout: (req = request, res = response) => {
    req.session.destroy(error => {
      if (!error) {
        return res.status(200).send({ status: 'success' })
      }
      res.status(500).send({ status: 'error', error })
    })
  }
})

export default sessionController
