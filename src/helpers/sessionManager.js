import UsersDao from '../daos/usersDao.js'
import bcrypt from 'bcrypt'

class SessionManager {
  constructor() {
    this.userDao = new UsersDao()
  }

  signup(user) {
    return this.userDao.create(user)
  }

  async login(password, databaseUser) {
    const isValidPass = await bcrypt.compare(password, databaseUser.password)

    if (!isValidPass) return false

    return {
      id: databaseUser._id,
      firstname: databaseUser.firstname,
      lastname: databaseUser.lastname,
      email: databaseUser.email,
      age: databaseUser.age
    }
  }

  get(user) {
    return this.userDao.get(user)
  }
}

export default SessionManager
