import { EmailService, PasswordService, TokenService } from '../../services/index.js'
import { nodemailerTransporter } from '../../services/emails/transporters/nodemailer/index.js'
import { UserManager } from './index.js'

export class AuthManager {
  constructor() {
    this.userManager = new UserManager()
    this.tokenService = new TokenService()
    this.emailService = new EmailService(nodemailerTransporter)
    this.passwordService = PasswordService
  }

  async login(email, password) {
    const user = await this.userManager.getOne({ email })
    if (!user) return null // Wrong email
    const isValidPass = await this.passwordService.compare(password, user.password)
    if (!isValidPass) {
      await this.emailService.sendUnauthorizedLoginAlert({ email, firstname: user.firstname })
      return false // Wrong password
    }
    return this.tokenService.generateTokens(user)
  }

  refreshToken(refreshToken) {
    const decoded = this.tokenService.verifyRefreshToken(refreshToken)
    return this.tokenService.generateAccessToken(decoded)
  }

  async forgotPassword(email) {
    const user = await this.userManager.getOne({ email })
    if (!user) return null
    const { id } = user
    const token = this.tokenService.generateChangePasswordToken({ id })
    await this.emailService.sendPasswordReset({ email, firstname: user.firstname, token })
  }

  async resetPassword({ token, password }) {
    console.log(token, password)
    const decodedUser = this.tokenService.verifyPasswordToken(token)
    const hashedPassword = await this.passwordService.hash(password)
    const updatedUser = await this.userManager.updatePassword(decodedUser.id, { password: hashedPassword })
    return updatedUser
  }
}
