export function authUser(req, res, next) {
  if (req.session.user) return next()
  return res.status(401)
}

export function authAdmin(req, res, next) {
  if (req.session.user.admin) return next()
  return res.status(403)
}
