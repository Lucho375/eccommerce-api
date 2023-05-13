import UserManager from '../../helpers/userManager.js'

export function isAuthenticated(req, res, next) {
  if (req.session.user) return next()
  return res.status(401).end() // Unauthorized
}

export async function isAdminAuthenticated(req, res, next) {
  try {
    const user = req.session.user
    if (!user) return res.status(401).end()
    const manager = new UserManager()
    const isAdmin = (await manager.getOne({ email: user.email })).role === 'admin'
    if (!isAdmin) return res.status(403).end() // forbidden
    return next()
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message })
  }
}
