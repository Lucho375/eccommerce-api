import UsersDao from '../daos/usersDao.js'
import jwt from 'jsonwebtoken'
import { createAccessToken, createRefreshToken } from './JWT.js'
import { compareHash, createHash } from './bcryptHash.js'

class SessionManager {
  constructor() {
    this.userDao = new UsersDao()
  }

  async signup(user) {
    const { password } = user
    const hashedPassword = await createHash(password)
    return this.userDao.create({ ...user, password: hashedPassword })
  }

  async login(email, password) {
    const user = await this.userDao.getOne({ email })
    if (!user) return null // Wrong email

    const isValidPass = await compareHash(password, user.password)
    if (!isValidPass) return false // Wrong password

    const dto = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      age: user.age,
      image: user.image,
      roles: user.role
    }

    const accessToken = createAccessToken(dto)
    const refreshToken = createRefreshToken(dto)

    await this.userDao.updateOne(user._id, { refreshToken })

    return {
      accessToken,
      refreshToken
    }
  }

  async logout(refreshToken) {
    const user = await this.userDao.getOne({ refreshToken })
    if (!user) return
    await this.userDao.updateOne(user._id, { refreshToken: '' })
  }

  async refreshToken(refreshToken) {
    const user = await this.userDao.getOne({ refreshToken })
    if (!user) return null // Forbidden

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedUser) => {
      if (err || decodedUser.username !== user.username) return null // Forbidden

      return createAccessToken({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age,
        image: user.image,
        roles: user.role
      })
    })
  }
}

export default SessionManager
