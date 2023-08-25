import { UserManager } from '../../domain/index.js'

export class UserController {
  static async getAll(req, res) {
    const manager = new UserManager()
    const users = await manager.getAll()
    res.status(200).send({ ok: true, payload: users })
  }

  static async create(req, res) {
    const manager = new UserManager()
    const newUser = await manager.create(req.body)
    res.status(201).send({ ok: true, payload: newUser })
  }

  static async getOne(req, res) {
    const { id } = req.params
    const manager = new UserManager()
    const user = await manager.getOne({ _id: id })
    res.status(200).send({ ok: true, payload: { ...user, password: undefined } })
  }

  static async updateOne(req, res) {
    const { id } = req.params
    const manager = new UserManager()
    const updatedUser = await manager.updateOne(id, req.body)
    res.status(200).send({ ok: true, payload: updatedUser })
  }

  static async deleteOne(req, res) {
    const { id } = req.params
    const manager = new UserManager()
    const user = await manager.deleteOne(id)
    res.status(200).send({ ok: true, payload: user })
  }
}
