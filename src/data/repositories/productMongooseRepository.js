import ProductModel from '../models/product.model.js'

class ProductMongooseRepository {
  async getAllProducts(limit, category, sort) {
    const query = category ? { category } : {}
    const limitQuery = limit ? { limit } : {}
    const sortQuery = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    const products = await ProductModel.find(query, {}, limitQuery).sort(sortQuery)
    return products
  }

  async createProduct(newProduct) {
    return ProductModel.create(newProduct)
  }

  async getProductById(id) {
    const product = await ProductModel.findById(id)
    if (!product) return null
    return product
  }

  async updateProduct(id, update) {
    return ProductModel.findByIdAndUpdate(id, update, { new: true })
  }

  async deleteProduct(id) {
    return ProductModel.findByIdAndUpdate(id, { status: false }, { new: true })
  }
}

export default ProductMongooseRepository
