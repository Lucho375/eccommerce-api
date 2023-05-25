import jwt from 'jsonwebtoken'

function createAccessToken(user) {
  return jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1 * 30 }) // 30 sec
}

function createRefreshToken(user) {
  return jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 1 * 60 })
}

function createForgotPasswordToken(user) {
  return jwt.sign({ ...user }, process.env.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: 5 * 60 })
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

function verifyRefreshToken(refreshToken) {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
}

export { createAccessToken, createRefreshToken, createForgotPasswordToken, verifyAccessToken, verifyRefreshToken }
