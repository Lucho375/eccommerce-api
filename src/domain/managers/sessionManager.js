import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {
  createAccessToken,
  createForgotPasswordToken,
  createRefreshToken,
  verifyRefreshToken
} from '../../helpers/JWT.js'
import { compareHash, createHash } from '../../helpers/bcryptHash.js'
import { emailOptions, sendMail } from '../../services/sendEmail.js'
import UserManager from './userManager.js'
import ZodValidator from '../validations/zodValidator.js'
import { loginSchemaValidation, userSchemaValidation } from '../validations/schemas/user.js'
import User from '../entities/user.js'

class SessionManager {
  constructor() {
    this.userManager = new UserManager()
    this.validator = schema => new ZodValidator(schema)
  }

  async signup(user) {
    const validatedUser = this.validator(userSchemaValidation).create(user)
    const { password } = validatedUser
    const hashedPassword = await createHash(password)
    return this.userManager.create({ ...validatedUser, password: hashedPassword })
  }

  async login(email, password) {
    const loginValidation = this.validator(loginSchemaValidation).create({ email, password })

    const user = await this.userManager.getOne({ email: loginValidation.email })

    if (!user) return null // Wrong email

    const isValidPass = await compareHash(loginValidation.password, user.password)
    if (!isValidPass) {
      await sendMail({ email }, emailOptions.wrongPassword)
      return false // Wrong password
    }

    const userForToken = new User({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      age: user.age,
      image: user.image,
      role: user.role
    })

    const accessToken = createAccessToken(userForToken)
    const refreshToken = createRefreshToken(userForToken)

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshToken(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken)

    return createAccessToken({
      id: decoded.id,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
      email: decoded.email,
      age: decoded.age,
      image: decoded.image,
      role: decoded.role
    })
  }

  async forgotPassword(email) {
    const user = await this.userManager.getOne({ email })
    if (!user) return null
    const { id } = user
    const token = createForgotPasswordToken(id.toString())
    await sendMail({ email: user.email, token }, emailOptions.changePassword)
  }

  async resetPassword(token, newPassword) {
    const decodedUser = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET)
    const hashedPassword = await createHash(newPassword)
    const updatedUser = await this.userDao.updateOne(decodedUser._id, { password: hashedPassword })
    return updatedUser
  }

  async getCurrentUser(id) {
    const user = await this.userManager.getOne({ _id: id })
    return { ...user, password: undefined }
  }
}

export default SessionManager
