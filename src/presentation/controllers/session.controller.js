import SessionManager from '../../domain/managers/sessionManager.js'
class SessionController {
  static async signup(req, res, next) {
    try {
      const manager = new SessionManager()
      await manager.signup(req.body)
      res.status(201).send({ ok: true })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const manager = new SessionManager()
      const loginAttempt = await manager.login(email, password)

      if (loginAttempt === null || loginAttempt === false)
        return res.status(401).send({ ok: false, message: 'Wrong email or password' }) // Wrong email || wrong password

      const { accessToken, refreshToken } = loginAttempt

      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true, // HTTPS
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000 // 5 min
        })
        .status(200)
        .send({ ok: true, payload: accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async logout(req, res, next) {
    try {
      const cookies = req?.cookies
      if (!cookies?.refreshToken) return res.sendStatus(204) // if no cookies status no-content
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true })
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const cookies = req.cookies
      if (!cookies?.refreshToken) return res.status(401).send({ ok: false, message: 'Unauthorized' }) // Unauthorized
      const manager = new SessionManager()
      const refreshToken = cookies.refreshToken
      const accessToken = manager.refreshToken(refreshToken)
      if (!accessToken) return res.status(403).send({ ok: false, message: 'Forbidden' })
      res.status(200).send({ ok: true, payload: accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body
      const manager = new SessionManager()
      const token = await manager.forgotPassword(email)
      if (token === null) return res.status(400).send({ ok: false, message: 'User not found' })
      res.status(200).send({ ok: true })
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { token } = req.body
      const { password } = req.body
      const manager = new SessionManager()
      const passwordHasUpdated = await manager.resetPassword(token, password)
      if (!passwordHasUpdated) return res.status(400).send({ ok: false, message: 'Something was wrong' })
      res.status(200).send({ ok: true, message: 'Password updated' })
    } catch (error) {
      next(error)
    }
  }

  static async getCurrentUser(req, res, next) {
    try {
      const { id } = req?.user
      const manager = new SessionManager()
      const user = await manager.getCurrentUser(id)
      if (!user) return res.status(401).send({ ok: false, message: 'User not found' })
      res.status(200).send({ ok: true, payload: user })
    } catch (error) {
      next(error)
    }
  }
}

export default SessionController
