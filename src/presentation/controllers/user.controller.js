import UserManager from '../../domain/managers/userManager.js'

export class UserController {
  static async getAll(req, res, next) {
    try {
      const manager = new UserManager()
      const users = await manager.getAll()
      res.status(200).send({ ok: true, payload: users })
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const manager = new UserManager()
      const newUser = await manager.create(req.body)
      res.status(201).send({ ok: true, payload: newUser })
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const user = await manager.getOne({ _id: id })
      res.status(200).send({ ok: true, payload: { ...user, password: undefined } })
    } catch (error) {
      next(error)
    }
  }

  static async updateOne(req, res, next) {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const updatedUser = await manager.updateOne(id, req.body)
      res.status(200).send({ ok: true, payload: updatedUser })
    } catch (error) {
      next(error)
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const user = await manager.deleteOne(id)
      res.status(200).send({ ok: true, payload: user })
    } catch (error) {
      next(error)
    }
  }
}
