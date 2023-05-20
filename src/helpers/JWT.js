import jwt from 'jsonwebtoken'

export function createAccessToken(user) {
  return jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
}

export function createRefreshToken(user) {
  return jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' })
}
