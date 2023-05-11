import UserManager from '../helpers/userManager.js'

export async function checkAvailableEmail(req, res, next) {
  try {
    const { email } = req.body
    const manager = new UserManager()
    const user = await manager.getOne({ email })
    if (user === null) return next()

    return res
      .status(400)
      .send({ status: 'error', message: 'User email already exists' })
  } catch (error) {
    res.status(500).send({ status: 'error', error: error.message })
  }
}
