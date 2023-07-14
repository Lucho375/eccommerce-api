import Product from '../../domain/entities/product.js'
import ProductModel from '../models/product.model.js'

class ProductMongooseRepository {
  async getAllProducts(limit, category, sort) {
    const query = category ? { category } : {}
    const limitQuery = limit ? { limit } : {}
    const sortQuery = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    const products = await ProductModel.find(query, {}, limitQuery).sort(sortQuery)
    return this.#transformProducts(products)
  }

  async createProduct(newProduct) {
    return ProductModel.create(newProduct)
  }

  async getProductById(id) {
    const product = await ProductModel.findById(id)
    if (!product) return null
    return this.#transformProducts(product)
  }

  async updateProduct(id, update) {
    const updated = await ProductModel.findByIdAndUpdate(id, update, { new: true })
    return this.#transformProducts(updated)
  }

  async deleteProduct(id) {
    return ProductModel.findByIdAndUpdate(id, { status: false }, { new: true })
  }

  #transformProducts(data) {
    if (!data) return null
    if (Array.isArray(data)) {
      return data.map(product => new Product({ id: product._id.toString(), ...product.toObject() }))
    }

    return new Product({
      id: data._id.toString(),
      title: data.title,
      category: data.category,
      description: data.description,
      code: data.code,
      thumbnail: data.thumbnail,
      price: data.price,
      stock: data.stock,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }
}

export default ProductMongooseRepository
