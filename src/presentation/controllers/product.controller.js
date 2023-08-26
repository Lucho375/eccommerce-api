import { ProductManager, ZodValidator, productSchemaValidation } from '../../domain/index.js'

export class ProductController {
  static async getProducts(req, res) {
    const { limit, category, sort } = req.query
    const manager = new ProductManager()
    const products = await manager.findAll(limit, category, sort)
    res.status(200).send({ ok: true, payload: products })
  }

  static async getProductById(req, res) {
    const { id } = req.params
    const manager = new ProductManager()
    const product = await manager.findById(id)
    if (product === null) return res.status(404).send({ ok: false, message: `Cannot find product ${id}` })
    res.status(200).send({ ok: true, payload: product })
  }

  static async createProduct(req, res) {
    const { price, stock } = req.body
    const imageUrl = req?.uploadedImage
    const thumbnail = imageUrl ? [imageUrl] : []
    const newProduct = new ZodValidator(productSchemaValidation).create({
      ...req.body,
      stock: +stock,
      price: +price,
      thumbnail
    })
    const manager = new ProductManager()
    const addedProd = await manager.createProduct(newProduct)
    res.status(201).send({ ok: true, payload: addedProd })
  }

  static async deleteProductById(req, res) {
    const { id } = req.params
    const manager = new ProductManager()
    const product = await manager.delete(id)
    if (product === null) return res.status(404).send({ ok: false, message: `Cannot find product ${id}` })
    res.status(204).send({ ok: true })
  }

  static async updateProduct(req, res) {
    const { id } = req.params
    const updateValidation = new ZodValidator(productSchemaValidation).update(req.body)
    const manager = new ProductManager()
    const updatedProduct = await manager.update(id, updateValidation)
    if (updatedProduct === null) {
      return res.status(404).send({ ok: false, message: `Cannot find product ${id}` })
    }
    res.status(200).send({ ok: true, payload: updatedProduct })
  }
}
