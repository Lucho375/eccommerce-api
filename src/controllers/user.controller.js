import { request, response } from 'express'
import UserManager from '../helpers/userManager.js'

export class UserController {
  static async getAll(req = request, res = response, next) {
    try {
      const manager = new UserManager()
      const users = await manager.getAll()
      res.status(200).send({ status: 'success', payload: users })
    } catch (error) {
      next(error)
    }
  }

  static async create(req = request, res = response, next) {
    try {
      const manager = new UserManager()
      const newUser = await manager.create(req.body)
      res.status(201).send({ status: 'success', payload: newUser })
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req = request, res = response, next) {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const user = await manager.findOne(id)
      res.status(200).send({ status: 'success', payload: user })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  }

  static async updateOne(req = request, res = response, next) {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const updatedUser = await manager.updateOne(id, req.body)
      res.status(200).send({ status: 'success', payload: updatedUser })
    } catch (error) {
      next(error)
    }
  }

  static async deleteOne(req = request, res = response, next) {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const user = await manager.deleteOne(id)
      res.status(200).send({ status: 'success', payload: user })
    } catch (error) {
      next(error)
    }
  }
}
