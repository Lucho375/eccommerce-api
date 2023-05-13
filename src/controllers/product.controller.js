import { request, response } from 'express'
import { ProductManager } from '../helpers/ProductManager.js'
import { uploadImage } from '../services/cloudinary.js'

const productController = Object.freeze({
  getProducts: async (req = request, res = response) => {
    try {
      const { limit, category, sort } = req.query
      const manager = new ProductManager()
      const products = await manager.findAll(limit, category, sort)
      res.status(200).send({ status: 'success', payload: products })
    } catch (error) {
      res.status(500).send(error.message)
    }
  },

  getProductById: async (req = request, res = response) => {
    try {
      const { id } = req.params
      const manager = new ProductManager()
      const product = await manager.findById(id)
      if (product === null)
        return res
          .status(404)
          .send({ status: 'error', message: `cannot find product ${id}` })

      res.status(200).send(product)
    } catch (error) {
      res.status(500).send(error.message)
    }
  },

  createProduct: async (req = request, res = response) => {
    try {
      const manager = new ProductManager()
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
      const newProduct = { ...req.body }
      const addedProd = await manager.createProduct(newProduct)
      res.status(201).send(addedProd)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },

  deleteProductById: async (req = request, res = response) => {
    try {
      const manager = new ProductManager()
      const { id } = req.params

      const product = await manager.delete(id)
      if (product === null)
        return res
          .status(404)
          .send({ status: 'error', message: `cannot find product ${id}` })
      return res.send(product)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },

  updateProduct: async (req = request, res = response) => {
    try {
      const manager = new ProductManager()
      const update = req.body
      const { id } = req.params
      const updatedProduct = await manager.update(id, update)
      if (updatedProduct === null) {
        return res
          .status(404)
          .send({ status: 'error', message: `Cannot find product ${id}` })
      }
      res.status(200).send(updatedProduct)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
})

export default productController
