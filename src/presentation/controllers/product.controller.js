import { ProductManager } from '../../domain/managers/productManager.js'
import { uploadImage } from '../../services/cloudinary.js'
import ZodValidator from '../../domain/validations/zodValidator.js'
import { productSchemaValidation } from '../../domain/validations/schemas/product.js'
export class ProductController {
  static async getProducts(req, res, next) {
    try {
      const { limit, category, sort } = req.query
      const manager = new ProductManager()
      const products = await manager.findAll(limit, category, sort)
      res.status(200).send({ ok: true, payload: products })
    } catch (error) {
      next(error)
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params
      const manager = new ProductManager()
      const product = await manager.findById(id)
      if (product === null) return res.status(404).send({ ok: false, message: `cannot find product ${id}` })
      res.status(200).send({ ok: true, payload: product })
    } catch (error) {
      next(error)
    }
  }

  static async createProduct(req, res, next) {
    try {
      // const img = await uploadImage(
      //   req.body.image,
      //   'products',
      //   `${req.body.title} - ${Date.now()}`
      // )
      // console.log(img)
      // if (Object.keys(img)[0] === 'error')
      //   return res
      //     .status(400)
      //     .send({ status: 'error', message: 'Failed to upload image!' })
      // const newProduct = { ...req.body, thumbnail: img.public_id }
      // const newProduct = { ...req.body }

      const newProduct = new ZodValidator(productSchemaValidation).create({ ...req.body })
      const manager = new ProductManager()
      const addedProd = await manager.createProduct(newProduct)
      res.status(201).send({ ok: true, payload: addedProd })
    } catch (error) {
      next(error)
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const { id } = req.params
      const manager = new ProductManager()
      const product = await manager.delete(id)
      if (product === null) return res.status(404).send({ ok: false, message: `cannot find product ${id}` })
      res.status(204).send({ ok: true })
    } catch (error) {
      next(error)
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const update = req.body
      const { id } = req.params
      const manager = new ProductManager()
      const updatedProduct = await manager.update(id, update)
      if (updatedProduct === null) {
        return res.status(404).send({ ok: false, message: `Cannot find product ${id}` })
      }
      res.status(200).send({ ok: true, payload: updatedProduct })
    } catch (error) {
      next(error)
    }
  }
}
