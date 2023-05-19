import { request, response } from 'express'
import { CartManager } from '../helpers/cartManager.js'

const cartController = Object.freeze({
  addProduct: async (req = request, res = response, next) => {
    try {
      const { cid, pid } = req.params
      const manager = new CartManager()
      const cart = await manager.addProduct(cid, pid)
      res.status(201).send({ status: 'success', payload: cart })
    } catch (error) {
      next(error)
    }
  },

  create: async (req = request, res = response, next) => {
    try {
      const manager = new CartManager()
      const cart = await manager.create()
      res.status(201).send({ status: 'success', payload: cart })
    } catch (error) {
      next(error)
    }
  },

  get: async (req = request, res = response, next) => {
    try {
      const { cid } = req.params
      const manager = new CartManager()
      const cart = await manager.get(cid)
      res.send({ status: 'success', payload: cart })
    } catch (error) {
      next(error)
    }
  },

  deleteProduct: async (req = request, res = response, next) => {
    try {
      const { cid, pid } = req.params
      const manager = new CartManager()
      await manager.deleteProduct(cid, pid)
      res.status(200).send({ status: 'success' })
    } catch (error) {
      next(error)
    }
  },

  updateProductQuantity: async (req = request, res = response, next) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body
      const manager = new CartManager()
      const updatedCart = await manager.updateProductQuantity(cid, pid, quantity)
      if (!updatedCart) return res.status(404).send({ status: 'error', message: 'Cart or product not found' })

      res.status(200).send({ status: 'success', payload: updatedCart })
    } catch (error) {
      next(error)
    }
  },

  deleteAllProducts: async (req = request, res = response, next) => {
    try {
      const { cid } = req.params
      const manager = new CartManager()
      const cart = await manager.deleteAllProducts(cid)
      res.send({ status: 'success', payload: cart })
    } catch (error) {
      next(error)
    }
  }
})

export default cartController
