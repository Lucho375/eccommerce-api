import SessionManager from '../helpers/sessionManager.js'
import bcrypt from 'bcrypt'
import UserManager from '../helpers/userManager.js'

const sessionController = Object.freeze({
  signup: async (req, res) => {
    try {
      const { firstname, lastname, email, age, password } = req.body
      const manager = new SessionManager()
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = await manager.signup({
        firstname,
        lastname,
        email,
        age,
        password: hashedPassword
      })

      res.status(201).send({
        status: 'success',
        payload: { ...newUser, password: undefined }
      })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const userManager = new UserManager()
      const dbUser = await userManager.getOne({ email })

      if (dbUser === null)
        return res
          .status(401)
          .send({ status: 'error', message: 'Wrong email or password' }) // email doesnt exist

      const manager = new SessionManager()
      const user = await manager.login(password, dbUser)

      if (user === false)
        return res
          .status(401)
          .send({ status: 'error', message: 'Wrong email or password' }) // wrong password

      req.session.user = { email: user.email, firstname: user.firstname }
      res.status(200).send({ status: 'success' })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  },

  logout: (req, res) => {
    req.session.destroy(error => {
      if (!error)
        return res.send({ status: 'success', message: 'Logout success' })
      res.status(500).send({ status: 'error', error })
    })
  }
})

export default sessionController
