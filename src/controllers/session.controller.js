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
      const loginAttempt = await manager.login(email, password)
      if (loginAttempt === null) return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // Wrong email
      if (loginAttempt === false) {
        return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // wrong password
      }
      const { accessToken, refreshToken } = loginAttempt

      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'none',
          maxAge: 2000 * 60 // 3 min
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
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: false })
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const cookies = req.cookies
      if (!cookies?.refreshToken) return res.sendStatus(401) // Unauthorized
      const manager = new SessionManager()
      const refreshToken = cookies.refreshToken
      const accessToken = await manager.refreshToken(refreshToken)
      if (!accessToken) return res.sendStatus(403)
      res.status(200).send({ accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword(req = request, res = response, next) {
    try {
      const { email } = req.body
      const manager = new SessionManager()
      const token = await manager.forgotPassword(email)
      if (token === null) return res.sendStatus(400)
      res.status(200).send({ token })
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req = request, res = response, next) {
    try {
      const { token } = req.query
      const { newPassword } = req.body
      const manager = new SessionManager()
      const passwordHasUpdated = await manager.resetPassword(token, newPassword)
      if (passwordHasUpdated) return res.sendStatus(204)
      res.sendStatus(400)
    } catch (error) {
      next(error)
    }
  }
}

export default SessionController
