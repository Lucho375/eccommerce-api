import UsersDao from '../../data/daos/usersDao.js'
import PasswordService from '../../services/passwordService.js'
import User from '../entities/user.js'
import { ValidationError } from '../validations/ValidationError.js'

class UserManager {
  #userDao
  #passwordService
  constructor() {
    this.#userDao = new UsersDao()
    this.#passwordService = PasswordService
  }

  async getAll() {
    const users = await this.#userDao.getAll()
    return this.#transformUsers(users)
  }

  async create(user) {
    const userExists = await this.#userDao.getOne({ email: user.email })
    if (userExists) throw new ValidationError('El email ya esta registrado')
    const createdUser = await this.#userDao.create({
      ...user,
      password: await this.#passwordService.hash(user.password)
    })
    return this.#transformUsers(createdUser)
  }

  async getOne(value) {
    const user = await this.#userDao.getOne(value)
    if (!user) return null
    return this.#transformUsers(user)
  }

  async updateOne(id, update) {
    const updatedUser = await this.#userDao.updateOne(id, update)
    return this.#transformUsers(updatedUser)
  }

  async updatePassword(id, updatedPassword) {
    return this.#userDao.updatePassword(id, updatedPassword)
  }

  deleteOne(id) {
    return this.#userDao.deleteOne(id)
  }

  #transformUsers(data) {
    if (Array.isArray(data)) {
      return data.map(user => new User({ id: user._id.toString(), ...user.toObject() }))
    }

    return new User({
      id: data._id.toString(),
      age: data.age,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      image: data.image,
      password: data.password,
      role: data.role,
      enabled: data.enabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }
}

export default UserManager
