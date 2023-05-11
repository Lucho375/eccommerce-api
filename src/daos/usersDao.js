import { hash } from '../helpers/hash.js'
import UserModel from '../models/user.model.js'

class UsersDao {
  async create(user) {
    const { firstname, lastname, password, email, age } = user
    const hashedPass = hash(password)
    return UserModel.create({
      firstname,
      lastname,
      email,
      age,
      password: hashedPass
    })
  }

  getAll() {
    return UserModel.find()
  }

  getOne(id) {
    return UserModel.findOne(id)
  }

  updateOne(id, update) {
    return UserModel.findByIdAndUpdate({ _id: id }, update)
  }

  deleteOne(id) {
    return UserModel.findByIdAndUpdate({ _id: id }, { enabled: false })
  }
}

export default UsersDao
