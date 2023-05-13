import { request, response } from 'express'
import UserManager from '../helpers/userManager.js'

const userController = Object.freeze({
  getAll: async (req = request, res = response) => {
    try {
      const manager = new UserManager()
      const users = await manager.getAll
      res.status(200).send({ status: 'success', payload: users })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },
  create: async (req = request, res = response) => {
    try {
      const manager = new UserManager()
      const newUser = await manager.create(req.body)
      res.status(201).send({ status: 'success', payload: newUser })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  getOne: async (req = request, res = response) => {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const user = await manager.findOne(id)
      res.status(200).send({ status: 'success', payload: user })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  updateOne: async (req = request, res = response) => {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const updatedUser = await manager.updateOne(id, req.body)
      res.status(200).send({ status: 'success', payload: updatedUser })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  deleteOne: async (req = request, res = response) => {
    try {
      const { id } = req.params
      const manager = new UserManager()
      const user = await manager.deleteOne(id)
      res.status(200).send({ status: 'success', payload: user })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  }
})

export default userController
