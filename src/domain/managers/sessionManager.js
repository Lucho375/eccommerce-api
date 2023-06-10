import jwt from 'jsonwebtoken'
import 'dotenv/config'
import UsersDao from '../../data/daos/usersDao.js'
import {
  createAccessToken,
  createForgotPasswordToken,
  createRefreshToken,
  verifyRefreshToken
} from '../../helpers/JWT.js'
import { compareHash, createHash } from '../../helpers/bcryptHash.js'
import { emailOptions, sendMail } from '../../services/sendEmail.js'

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
    if (!isValidPass) {
      await sendMail({ email }, emailOptions.wrongPassword)
      return false // Wrong password
    }

    const dto = {
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      age: user.age,
      image: user.image,
      roles: user.role
    }

    const accessToken = createAccessToken(dto)
    const refreshToken = createRefreshToken(dto)

    return {
      accessToken,
      refreshToken,
      dto
    }
  }

  async refreshToken(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken)
    return createAccessToken({
      id: decoded._id,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
      email: decoded.email,
      age: decoded.age,
      image: decoded.image,
      roles: decoded.role
    })
  }

  async forgotPassword(email) {
    const user = await this.userDao.getOne({ email })
    if (!user) return null
    const { password, refreshToken, role, createdAt, updatedAt, __v, enabled, image, ...rest } = user._doc
    const token = createForgotPasswordToken({ ...rest })
    await sendMail({ email: user.email, token }, emailOptions.changePassword)
  }

  async resetPassword(token, newPassword) {
    const decodedUser = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET)
    const hashedPassword = await createHash(newPassword)
    const updatedUser = await this.userDao.updateOne(decodedUser._id, { password: hashedPassword })
    return updatedUser
  }
}

export default SessionManager
