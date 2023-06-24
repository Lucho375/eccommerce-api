import { CartManager } from '../../domain/managers/cartManager.js'

export class CartController {
  static async addProduct(req, res, next) {
    try {
      const { cid, pid } = req.params
      const manager = new CartManager()
      const cart = await manager.addProduct(cid, pid)
      res.status(200).send({ ok: true, payload: cart })
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const manager = new CartManager()
      const cart = await manager.create(req.body)
      res.status(201).send({ ok: true, payload: cart })
    } catch (error) {
      next(error)
    }
  }

  static async get(req, res, next) {
    try {
      const { userId } = req.params
      const manager = new CartManager()
      const cart = await manager.get(userId)
      res.status(200).send({ ok: true, payload: cart })
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { cid, pid } = req.params
      const manager = new CartManager()
      const cart = await manager.deleteProduct(cid, pid)
      res.status(200).send({ ok: true, payload: cart })
    } catch (error) {
      next(error)
    }
  }

  static async updateProductQuantity(req, res, next) {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body
      const manager = new CartManager()
      const updatedCart = await manager.updateProductQuantity(cid, pid, quantity)
      if (!updatedCart) return res.status(404).send({ ok: false, message: 'Cart or product not found' })

      res.status(200).send({ ok: true, payload: updatedCart })
    } catch (error) {
      next(error)
    }
  }

  static async deleteAllProducts(req, res, next) {
    try {
      const { cid } = req.params
      const manager = new CartManager()
      const cart = await manager.deleteAllProducts(cid)
      res.status(200).send({ ok: true, payload: cart })
    } catch (error) {
      next(error)
    }
  }

  static async checkout(req, res, next) {
    try {
      const { cid } = req.params
      const manager = new CartManager()
      const buyDetails = await manager.checkout(cid)
      res.status(200).send({ ok: true, payload: buyDetails })
    } catch (error) {
      next(error)
    }
  }
}
