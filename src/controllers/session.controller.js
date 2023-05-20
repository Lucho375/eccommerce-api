import SessionManager from '../helpers/sessionManager.js'
import { request, response } from 'express'

class SessionController {
  static async signup(req = request, res = response, next) {
    try {
      const manager = new SessionManager()
      await manager.signup(req.body)
      res.status(201).send({ status: 'success' })
    } catch (error) {
      next(error)
    }
  }

  static async login(req = request, res = response, next) {
    try {
      const { email, password } = req.body
      const manager = new SessionManager()
      const result = await manager.login(email, password)
      if (result === null) return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // Wrong email
      if (result === false) return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // wrong password
      const { accessToken, refreshToken } = result
      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'none',
          maxAge: 60 * 1000 * 5 //
        })
        .status(200)
        .send({ accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async logout(req = request, res = response, next) {
    try {
      const cookies = req?.cookies
      if (!cookies?.refreshToken) return res.sendStatus(204) // if no cookies status no-content
      const manager = new SessionManager()
      const refreshToken = cookies.refreshToken
      // Delete user refreshToken
      await manager.logout(refreshToken)
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: false })
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const cookies = req.cookies
      const manager = new SessionManager()
      if (!cookies?.refreshToken) return res.sendStatus(401) // Unauthorized

      const refreshToken = cookies.refreshToken
      const accessToken = await manager.refreshToken(refreshToken)

      if (accessToken === null) return res.sendStatus(403)
      res.status(200).send({ accessToken })
    } catch (error) {
      next(error)
    }
  }
}

export default SessionController
