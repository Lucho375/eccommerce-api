import { User } from '../../../domain/index.js'
import { UserModel } from '../../models/index.js'

export class UserMongooseRepository {
  async create(user) {
    const created = await UserModel.create(user)
    return this.#transformUsers(created)
  }

  async getAll() {
    const users = await UserModel.find()
    return this.#transformUsers(users)
  }

  async getOne(value) {
    const user = await UserModel.findOne(value)
    return this.#transformUsers(user)
  }

  async updateOne(id, update) {
    const updated = await UserModel.findByIdAndUpdate({ _id: id }, update, { new: true })
    return this.#transformUsers(updated)
  }

  async deleteOne(id) {
    const deleted = await UserModel.findByIdAndUpdate({ _id: id }, { enabled: false }, { new: true })
    return this.#transformUsers(deleted)
  }

  async updatePassword(id, newPassword) {
    return UserModel.findByIdAndUpdate({ _id: id }, newPassword)
  }

  async deleteInactive() {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const deletedUsers = await UserModel.deleteMany({
      role: 'user',
      last_connection: { $lt: thirtyDaysAgo }
    })

    return deletedUsers.deletedCount
  }

  #transformUsers(data) {
    if (!data) return null
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
