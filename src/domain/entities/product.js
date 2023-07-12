class Product {
  constructor({ id, title, category, description, code, thumbnail, price, stock, status, createdAt, updatedAt }) {
    this.id = id
    this.title = title
    this.category = category
    this.description = description
    this.code = code
    this.thumbnail = thumbnail
    this.price = price
    this.stock = stock
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

export default Product
