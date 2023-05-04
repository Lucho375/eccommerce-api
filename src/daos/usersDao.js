import { hash } from '../helpers/hash.js'
import UserModel from '../models/user.model.js'

class UsersDao {
  create(user) {
    const hashedPass = hash(user.password)
    return UserModel.create({ ...user, password: hashedPass })
  }

  get(id) {
    return UserModel.findById(id)
  }

  update(id, update) {
    return UserModel.findByIdAndUpdate(id, { ...update })
  }

  delete(id) {
    return UserModel.findByIdAndUpdate(id, { enabled: false })
  }
}

export default UsersDao
