import 'dotenv/config'
import UserManager from '../../helpers/userManager.js'
import jwt from 'jsonwebtoken'
import { request, response } from 'express'

export function isAuthenticated(req = request, res = response, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader) return res.sendStatus(401) // Unauthorized
  const token = authHeader.split(' ')[1]

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = user
    next()
  } catch (error) {
    if (error.message.includes('expired')) return res.sendStatus(401)
    res.sendStatus(403)
  }
}

export async function isAdmin(req, res, next) {
  try {
    const manager = new UserManager()
    const isAdmin = (await manager.getOne({ email: req.user.email })).role === 'admin'
    if (!isAdmin) return res.sendStatus(403) // forbidden
    return next()
  } catch (error) {
    next(error)
  }
}
