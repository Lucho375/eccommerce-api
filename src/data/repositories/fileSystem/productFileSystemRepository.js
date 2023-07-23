import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

class ProductFileSystemRepository {
  constructor() {
    this.filePath = path.resolve('./src/database/products/products.json')
  }

  async getAllProducts() {
    try {
      const products = await this.loadProducts()
      return products
    } catch (error) {
      return []
    }
  }

  async getProductById(id) {
    const products = await this.loadProducts()
    return products.find(prod => prod.id === id)
  }

  async createProduct(product) {
    try {
      const products = await this.loadProducts()
      const newProduct = { ...product, id: uuidv4(), status: true }
      await this.saveProducts([...products, newProduct])
      return newProduct
    } catch (error) {
      throw new Error('Failed to create a new product')
    }
  }

  async updateProduct(id, update) {
    const products = await this.loadProducts()
    const existingProduct = products.find(product => product.id === id)
    if (!existingProduct) throw new Error(`Cannot find product ${id}`)
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          ...update
        }
      }
      return product
    })
    await this.saveProducts(updatedProducts)
    return updatedProducts.find(product => product.id === id)
  }

  async deleteProduct(id) {
    const products = await this.loadProducts()
    const updated = products.map(prod => (prod.id === id ? { ...prod, status: false } : { prod }))
    return this.saveProducts(updated)
  }

  async loadProducts() {
    return JSON.parse(await fs.readFile(this.filePath, 'utf-8'))
  }

  async saveProducts(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data), 'utf-8')
    return [...data]
  }
}

export default ProductFileSystemRepository
