import { CartManager } from '../../domain/index.js'

export class CartController {
  static async addProduct(req, res) {
    const { cid, pid } = req.params
    const manager = new CartManager()
    const cart = await manager.addProduct(cid, pid)
    res.status(200).send({ ok: true, payload: cart })
  }

  static async create(req, res) {
    const manager = new CartManager()
    const cart = await manager.create(req.body)
    res.status(201).send({ ok: true, payload: cart })
  }

  static async get(req, res) {
    const { user } = req.params
    const manager = new CartManager()
    const cart = await manager.get(user)
    res.status(200).send({ ok: true, payload: cart })
  }

  static async deleteProduct(req, res) {
    const { cid, pid } = req.params
    const manager = new CartManager()
    const cart = await manager.deleteProduct(cid, pid)
    res.status(200).send({ ok: true, payload: cart })
  }

  static async updateProductQuantity(req, res) {
    const { cid, pid } = req.params
    const { quantity } = req.body
    const manager = new CartManager()
    const updatedCart = await manager.updateProductQuantity(cid, pid, quantity)
    if (!updatedCart) return res.status(404).send({ ok: false, message: 'Cart or product not found' })

    res.status(200).send({ ok: true, payload: updatedCart })
  }

  static async deleteAllProducts(req, res) {
    const { cid } = req.params
    const manager = new CartManager()
    const cart = await manager.deleteAllProducts(cid)
    res.status(200).send({ ok: true, payload: cart })
  }

  static async checkout(req, res) {
    const { cid } = req.params
    const manager = new CartManager()
    const buyDetails = await manager.checkout(cid)
    res.status(200).send({ ok: true, payload: buyDetails })
  }
}
