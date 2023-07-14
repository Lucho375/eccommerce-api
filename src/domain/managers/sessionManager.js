import UserManager from './userManager.js'
import AuthManager from './authManager.js'

class SessionManager {
  constructor() {
    this.userManager = new UserManager()
    this.authManager = new AuthManager()
  }

  signup(user) {
    return this.userManager.create(user)
  }

  login(email, password) {
    return this.authManager.login(email, password)
  }

  refreshToken(refreshToken) {
    return this.authManager.refreshToken(refreshToken)
  }

  forgotPassword(email) {
    return this.authManager.forgotPassword(email)
  }

  resetPassword(token, newPassword) {
    return this.authManager.resetPassword(token, newPassword)
  }

  async getCurrentUser(id) {
    const user = await this.userManager.getOne({ _id: id })
    return { ...user, password: undefined }
  }
}

export default SessionManager
