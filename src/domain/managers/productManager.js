import { ProductsDao } from '../../data/daos/productsDao.js'

export class ProductManager {
  constructor() {
    this.productDao = new ProductsDao()
  }

  async findAll(limit, category, sort) {
    return this.productDao.getAllProducts(limit, category, sort)
  }

  async findById(id) {
    return this.productDao.getProductById(id)
  }

  async createProduct(product) {
    return this.productDao.createProduct(product)
  }

  async update(id, update) {
    return this.productDao.updateProduct(id, update)
  }

  async delete(id) {
    return this.productDao.deleteProduct(id)
  }
}
