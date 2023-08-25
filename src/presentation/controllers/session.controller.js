import { USER_ROLES } from '../../constants/roles.js'
import {
  SessionManager,
  ZodValidator,
  emailValidate,
  loginSchemaValidation,
  resetPasswordValidate,
  userSchemaValidation
} from '../../domain/index.js'
export class SessionController {
  static async signup(req, res) {
    const validatedBody = new ZodValidator(userSchemaValidation).create({ ...req.body, role: USER_ROLES.USER })
    const manager = new SessionManager()
    await manager.signup(validatedBody)
    res.status(201).send({ ok: true, message: 'User created' })
  }

  static async login(req, res) {
    const validatedBody = new ZodValidator(loginSchemaValidation).create(req.body)
    const manager = new SessionManager()
    const loginAttempt = await manager.login(validatedBody)
    if (loginAttempt === null || loginAttempt === false)
      return res.status(401).send({ ok: false, message: 'Wrong email or password' }) // Wrong email || wrong password
    const { accessToken, refreshToken } = loginAttempt
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // HTTPS
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 24hr
      })
      .status(200)
      .send({ ok: true, payload: { accessToken } })
  }

  static async logout(req, res) {
    const cookies = req?.cookies
    if (!cookies?.refreshToken) return res.sendStatus(204) // if no cookies status no-content
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(204)
  }

  static async refreshToken(req, res) {
    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.status(401).send({ ok: false, message: 'Unauthorized' }) // Unauthorized
    const manager = new SessionManager()
    const refreshToken = cookies.refreshToken
    const accessToken = manager.refreshToken(refreshToken)
    if (!accessToken) return res.status(403).send({ ok: false, message: 'Forbidden' })
    res.status(200).send({ ok: true, payload: accessToken })
  }

  static async forgotPassword(req, res) {
    const validatedEmail = new ZodValidator(emailValidate).create(req.body)
    const manager = new SessionManager()
    const token = await manager.forgotPassword(validatedEmail)
    if (token === null) return res.status(400).send({ ok: false, message: 'User not found' })
    res.status(200).send({ ok: true, message: 'We sent an email with instructions' })
  }

  static async resetPassword(req, res) {
    const validatedBody = new ZodValidator(resetPasswordValidate).create(req.body)
    const manager = new SessionManager()
    await manager.resetPassword(validatedBody)
    res.status(200).send({ ok: true, message: 'Password updated' })
  }

  static async getCurrentUser(req, res) {
    const { id } = req?.user
    const manager = new SessionManager()
    const user = await manager.getCurrentUser(id)
    if (!user) return res.status(401).send({ ok: false, message: 'User not found' })
    res.status(200).send({ ok: true, payload: user })
  }
}
