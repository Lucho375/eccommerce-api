import jwt from 'jsonwebtoken'
import { createAccessToken, createRefreshToken } from '../helpers/JWT.js'
import SessionManager from '../helpers/sessionManager.js'
import UserManager from '../helpers/userManager.js'
import { request, response } from 'express'

const sessionController = Object.freeze({
  signup: async (req = request, res = response, next) => {
    try {
      const manager = new SessionManager()
      // eslint-disable-next-line
      const newUser = await manager.signup(req.body)
      res.status(201).send({ status: 'success' })
    } catch (error) {
      next(error)
    }
  },
  login: async (req = request, res = response, next) => {
    try {
      if (req?.session?.user) {
        return res.redirect(`${req.protocol}://${req.get('host')}/products`)
      }
      const { email, password } = req.body
      const userManager = new UserManager()
      const dbUser = await userManager.getOne({ email })

      if (dbUser === null) return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // email doesnt exist

      const manager = new SessionManager()
      const user = await manager.login(password, dbUser)

      if (user === false) return res.status(401).send({ status: 'error', message: 'Wrong email or password' }) // wrong password

      const accessToken = createAccessToken(user, '10s')
      const refreshToken = createRefreshToken(user, '30s')

      dbUser.refreshToken = refreshToken
      await dbUser.save()

      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'none',
          maxAge: 60 * 1000 * 5 //
        })
        .status(200)
        .send({ accessToken })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req = request, res = response, next) => {
    try {
      const cookies = req?.cookies
      const manager = new UserManager()
      if (!cookies?.refreshToken) return res.sendStatus(204) // if no cookies status no-content

      const refreshToken = cookies.refreshToken
      const user = await manager.getOne({ refreshToken })

      if (!user) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: false })
        return res.sendStatus(204)
      }

      await manager.updateOne(user._id, { refreshToken: '' })
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: false })
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const cookies = req.cookies
      const manager = new UserManager()
      if (!cookies?.refreshToken) return res.sendStatus(401) // Unauthorized
      const refreshToken = cookies.refreshToken

      const user = await manager.getOne({ refreshToken })
      if (!user) return res.sendStatus(403) // Forbidden

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedUser) => {
        if (err || decodedUser.username !== user.username) return res.status(403).send('expiredToken') // Forbidden
        const accessToken = createAccessToken({
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          age: user.age,
          image: user.image,
          roles: user.role
        })
        res.status(200).send({ accessToken })
      })
    } catch (error) {
      next(error)
    }
  }
})

export default sessionController
