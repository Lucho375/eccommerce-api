import { CONTAINERS } from '../../constants/containers.js'
import containers from '../../containers.js'

export class ProductManager {
  #productRepository
  constructor() {
    this.#productRepository = containers.resolve(CONTAINERS.productDao)
  }

  findAll(limit, category, sort) {
    return this.#productRepository.getAllProducts(limit, category, sort)
  }

  findById(id) {
    return this.#productRepository.getProductById(id)
  }

  createProduct(product) {
    return this.#productRepository.createProduct(product)
  }

  update(id, update) {
    return this.#productRepository.updateProduct(id, update)
  }

  delete(id) {
    return this.#productRepository.deleteProduct(id)
  }
}
