import UsersDao from '../daos/usersDao.js'

class UserManager {
  constructor() {
    this.userDao = new UsersDao()
  }

  async get(id) {
    const user = await this.userDao.get(id)
    return user
  }

  async createUser(newUser) {
    return this.userDao.create(newUser)
  }

  async deleteUser(id) {
    const user = await this.userDao.delete(id)
    return user
  }

  async updateUser(id, update) {
    const findedUser = await this.userDao.update(id, update)
    return findedUser
  }
}

export default UserManager
