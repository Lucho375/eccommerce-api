import containers from '../../containers.js'
import Product from '../entities/product.js'

export class ProductManager {
  #productRepository
  constructor() {
    this.#productRepository = containers.resolve('productDao')
  }

  async findAll(limit, category, sort) {
    const products = await this.#productRepository.getAllProducts(limit, category, sort)
    return this.transformProducts(products)
  }

  async findById(id) {
    const product = await this.#productRepository.getProductById(id)
    return this.transformProducts(product)
  }

  async createProduct(product) {
    const productCreated = await this.#productRepository.createProduct(product)
    return this.transformProducts(productCreated)
  }

  async update(id, update) {
    const product = await this.#productRepository.updateProduct(id, update)
    return this.transformProducts(product)
  }

  async delete(id) {
    return this.#productRepository.deleteProduct(id)
  }

  transformProducts(data) {
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
