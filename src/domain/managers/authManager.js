import PasswordService from '../../services/passwordService.js'
import { emailOptions, sendMail } from '../../services/sendEmail.js'
import TokenService from '../../services/tokenService.js'
import UserManager from './userManager.js'

class AuthManager {
  constructor() {
    this.userManager = new UserManager()
    this.tokenService = new TokenService()
    this.passwordService = PasswordService
  }

  async login(email, password) {
    const user = await this.userManager.getOne({ email })
    if (!user) return null // Wrong email
    const isValidPass = await this.passwordService.compare(password, user.password)
    if (!isValidPass) {
      await sendMail({ email }, emailOptions.wrongPassword)
      return false // Wrong password
    }
    return this.tokenService.generateTokens(user)
  }

  refreshToken(refreshToken) {
    const decoded = this.tokenService.verifyRefreshToken(refreshToken)
    const token = this.tokenService.generateAccessToken(decoded)
    return token
  }

  async forgotPassword(email) {
    const user = await this.userManager.getOne({ email })
    if (!user) return null
    const { id } = user
    const token = this.tokenService.generateChangePasswordToken({ id })
    await sendMail({ email: user.email, token }, emailOptions.changePassword)
  }

  async resetPassword(token, newPassword) {
    const decodedUser = this.tokenService.verifyPasswordToken(token)
    const hashedPassword = await this.passwordService.hash(newPassword)
    const updatedUser = await this.userManager.updatePassword(decodedUser.id, { password: hashedPassword })
    return updatedUser
  }
}

export default AuthManager
