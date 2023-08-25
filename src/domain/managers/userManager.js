import { CONTAINERS } from '../../constants/containers.js'
import containers from '../../containers.js'
import { PasswordService } from '../../services/index.js'
import { NotFoundError, ValidationError } from '../validations/ValidationError.js'

export class UserManager {
  #userRepository
  #passwordService
  constructor() {
    this.#userRepository = containers.resolve(CONTAINERS.userDao)
    this.#passwordService = PasswordService
  }

  getAll() {
    return this.#userRepository.getAll()
  }

  async create(user) {
    const userExists = await this.#userRepository.getOne({ email: user.email })
    if (userExists) throw new ValidationError('Email is already registered.')
    const createdUser = await this.#userRepository.create({
      ...user,
      password: await this.#passwordService.hash(user.password)
    })
    return createdUser
  }

  async getOne(value) {
    const user = await this.#userRepository.getOne(value)
    if (!user) throw new NotFoundError('User not found')
    return user
  }

  updateOne(id, update) {
    return this.#userRepository.updateOne(id, update)
  }

  updatePassword(id, updatedPassword) {
    return this.#userRepository.updatePassword(id, updatedPassword)
  }

  deleteOne(id) {
    return this.#userRepository.deleteOne(id)
  }
}
