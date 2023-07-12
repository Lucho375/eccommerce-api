import jwt from 'jsonwebtoken'
import 'dotenv/config'
import config from '../config/index.js'
class TokenService {
  generateTokens(user) {
    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user)
    return { accessToken, refreshToken }
  }

  generateAccessToken(user) {
    const { id, firstname, lastname, email, age, image, role } = user
    const payload = { id, firstname, lastname, email, age, image, role }
    const accessToken = jwt.sign(payload, config.JWT.ACCESS, { expiresIn: '15m' })
    return accessToken
  }

  generateRefreshToken(user) {
    const { id, firstname, lastname, email, age, image, role } = user
    const payload = { id, firstname, lastname, email, age, image, role }
    const refreshToken = jwt.sign(payload, config.JWT.REFRESH)
    return refreshToken
  }

  generateChangePasswordToken(payload) {
    return jwt.sign(payload, config.JWT.RESET_PASSWORD, { expiresIn: '15m' })
  }

  verifyRefreshToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, config.JWT.REFRESH)
    return decoded
  }

  verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, config.JWT.ACCESS)
  }

  verifyPasswordToken(passwordToken) {
    return jwt.verify(passwordToken, config.JWT.RESET_PASSWORD)
  }
}

export default TokenService
