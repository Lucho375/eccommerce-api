import UsersDao from '../daos/usersDao.js'

class UserManager {
  constructor() {
    this.userDao = new UsersDao()
  }

  getAll() {
    return this.userDao.getAll()
  }

  create(user) {
    return this.userDao.create(user)
  }

  getOne(value = {}) {
    return this.userDao.getOne(value)
  }

  updateOne(id, update) {
    return this.userDao.updateOne(id, update)
  }

  deleteOne(id) {
    return this.userDao.deleteOne(id)
  }
}

export default UserManager
