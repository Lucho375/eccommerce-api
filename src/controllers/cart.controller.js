import { CartManager } from '../helpers/cartManager.js'

const cartController = Object.freeze({
  addProduct: async (req, res) => {
    try {
      const { cid, pid } = req.params
      const manager = new CartManager()
      const cart = await manager.addProduct(cid, pid)
      res.status(201).send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  create: async (req, res) => {
    try {
      const manager = new CartManager()
      const cart = await manager.create()
      res.status(201).send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  get: async (req, res) => {
    try {
      const { cid } = req.params
      const manager = new CartManager()
      const cart = await manager.get(cid)
      res.send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { cid, pid } = req.params
      const manager = new CartManager()
      await manager.deleteProduct(cid, pid)
      res.status(200).send({ status: 'success' })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  updateProductQuantity: async (req, res) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body
      const manager = new CartManager()
      const updatedCart = await manager.updateProductQuantity(
        cid,
        pid,
        quantity
      )
      if (!updatedCart)
        return res
          .status(404)
          .send({ status: 'error', message: 'Cart or product not found' })

      res.status(200).send({ status: 'success', payload: updatedCart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  },

  deleteAllProducts: async (req, res) => {
    try {
      const { cid } = req.params
      const manager = new CartManager()
      const cart = await manager.deleteAllProducts(cid)
      res.send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  }
})

export default cartController
