import jwt from 'jsonwebtoken'
import 'dotenv/config'
import config from '../config/index.js'
export class TokenService {
  generateTokens(user) {
    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user)
    return { accessToken, refreshToken }
  }

  generateAccessToken(user) {
    const { id, firstname, lastname, email, age, image, role } = user
    const payload = { id, firstname, lastname, email, age, image, role }
    const accessToken = jwt.sign(payload, config.JWT.ACCESS.SECRET, { expiresIn: config.JWT.ACCESS.EXPIRES })
    return accessToken
  }

  generateRefreshToken(user) {
    const { id, firstname, lastname, email, age, image, role } = user
    const payload = { id, firstname, lastname, email, age, image, role }
    const refreshToken = jwt.sign(payload, config.JWT.REFRESH.SECRET, { expiresIn: config.JWT.REFRESH.EXPIRES })
    return refreshToken
  }

  generateChangePasswordToken(payload) {
    return jwt.sign(payload, config.JWT.RESET_PASSWORD.SECRET, { expiresIn: config.JWT.RESET_PASSWORD.EXPIRES })
  }

  verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, config.JWT.REFRESH.SECRET)
  }

  verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, config.JWT.ACCESS.SECRET)
  }

  verifyPasswordToken(passwordToken) {
    return jwt.verify(passwordToken, config.JWT.RESET_PASSWORD.SECRET)
  }
}
