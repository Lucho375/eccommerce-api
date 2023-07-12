import { ProductsDao } from '../../data/daos/productsDao.js'
import Product from '../entities/product.js'

export class ProductManager {
  #productDao
  constructor() {
    this.#productDao = new ProductsDao()
  }

  async findAll(limit, category, sort) {
    const products = await this.#productDao.getAllProducts(limit, category, sort)
    return this.transformProducts(products)
  }

  async findById(id) {
    const product = await this.#productDao.getProductById(id)
    return this.transformProducts(product)
  }

  async createProduct(product) {
    const productCreated = await this.#productDao.createProduct(product)
    return this.transformProducts(productCreated)
  }

  async update(id, update) {
    const product = await this.#productDao.updateProduct(id, update)
    return this.transformProducts(product)
  }

  async delete(id) {
    return this.#productDao.deleteProduct(id)
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
