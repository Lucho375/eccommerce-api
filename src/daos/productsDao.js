import ProductModel from '../models/product.model.js'

export class ProductsDao {
  async getAllProducts(limit, category, sort) {
    const query = category ? { category } : {}
    const limitQuery = limit ? { limit } : {}
    const sortQuery =
      sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    const products = await ProductModel.find(query, {}, limitQuery).sort(
      sortQuery
    )

    return products.map(
      ({
        title,
        description,
        price,
        stock,
        thumbnail,
        _id,
        category,
        status
      }) => ({
        id: _id,
        title,
        description,
        price,
        stock,
        thumbnail,
        category,
        status
      })
    )
  }

  async createProduct(newProduct) {
    const { title, category, description, code, thumbnail, price, stock } =
      newProduct
    return ProductModel.create({
      title,
      category,
      description,
      code,
      thumbnail,
      price,
      stock
    })
  }

  async getProductById(id) {
    const product = await ProductModel.findById(id)
    if (!product) return null
    return {
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
      category: product.category,
      status: product.status
    }
  }

  async updateProduct(id, update) {
    return ProductModel.findByIdAndUpdate(id, update, { new: true })
  }

  async deleteProduct(id) {
    return ProductModel.findByIdAndUpdate(id, { status: false }, { new: true })
  }
}
