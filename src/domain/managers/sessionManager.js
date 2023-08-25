import { UserManager, AuthManager } from './index.js'
import { User } from '../index.js'

export class SessionManager {
  constructor() {
    this.userManager = new UserManager()
    this.authManager = new AuthManager()
  }

  signup(user) {
    return this.userManager.create(user)
  }

  login({ email, password }) {
    return this.authManager.login(email, password)
  }

  refreshToken(refreshToken) {
    return this.authManager.refreshToken(refreshToken)
  }

  forgotPassword({ email }) {
    return this.authManager.forgotPassword(email)
  }

  resetPassword({ token, password }) {
    return this.authManager.resetPassword({ token, password })
  }

  async getCurrentUser(id) {
    const user = await this.userManager.getOne({ _id: id })
    return new User({ ...user, password: undefined })
  }
}
