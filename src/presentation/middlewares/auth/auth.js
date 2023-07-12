import { USER_ROLES } from '../../../constants/roles.js'
import UserManager from '../../../domain/managers/userManager.js'
import TokenService from '../../../services/tokenService.js'

export function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader) return res.sendStatus(401) // Unauthorized
  const token = authHeader.split(' ')[1]
  try {
    const tokenService = new TokenService()
    const user = tokenService.verifyAccessToken(token)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export async function isAdmin(req, res, next) {
  try {
    const manager = new UserManager()
    const isAdmin = (await manager.getOne({ email: req.user.email })).role === USER_ROLES.ADMIN
    if (!isAdmin) return res.sendStatus(403) // forbidden
    next()
  } catch (error) {
    next(error)
  }
}
