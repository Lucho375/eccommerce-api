import jwt from 'jsonwebtoken'
import config from '../config/index.js'

function createAccessToken(user) {
  return jwt.sign({ ...user }, config.JWT.ACCESS, { expiresIn: 24 * 60 * 60 * 1000 }) // 30 sec
}

function createRefreshToken(user) {
  return jwt.sign({ ...user }, config.JWT.REFRESH, { expiresIn: 24 * 60 * 60 * 1000 })
}

function createForgotPasswordToken(user) {
  return jwt.sign({ ...user }, config.JWT.RESET_PASSWORD, { expiresIn: 1 * 60 })
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.JWT.ACCESS)
}

function verifyRefreshToken(refreshToken) {
  return jwt.verify(refreshToken, config.JWT.REFRESH)
}

export { createAccessToken, createRefreshToken, createForgotPasswordToken, verifyAccessToken, verifyRefreshToken }
