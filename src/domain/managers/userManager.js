import UsersDao from '../../data/daos/usersDao.js'
import User from '../entities/user.js'
import { ValidationError } from '../validations/ValidationError.js'

class UserManager {
  constructor() {
    this.userDao = new UsersDao()
  }

  getAll() {
    return this.userDao.getAll()
  }

  async create(user) {
    const userExists = await this.userDao.getOne({ email: user.email })
    if (userExists) throw new ValidationError('El email ya esta registrado')
    return this.userDao.create(user)
  }

  async getOne(value) {
    const user = await this.userDao.getOne(value)

    if (!user) return null

    return new User({
      id: user._id,
      age: user.age,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      image: user.image,
      password: user.password,
      role: user.role,
      enabled: user.enabled
    })
  }

  updateOne(id, update) {
    return this.userDao.updateOne(id, update)
  }

  deleteOne(id) {
    return this.userDao.deleteOne(id)
  }
}

export default UserManager
