import UsersDao from '../daos/usersDao.js'
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

  async login(password, databaseUser) {
    const isValidPass = await compareHash(password, databaseUser.password)

    if (!isValidPass) return false

    return {
      id: databaseUser._id,
      firstname: databaseUser.firstname,
      lastname: databaseUser.lastname,
      email: databaseUser.email,
      age: databaseUser.age,
      image: databaseUser.image,
      roles: databaseUser.role
    }
  }

  get(user) {
    return this.userDao.get(user)
  }
}

export default SessionManager
