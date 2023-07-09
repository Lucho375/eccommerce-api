class Product {
  constructor({ _id, title, category, description, code, thumbnail, price, stock, status }) {
    this.id = _id
    this.title = title
    this.category = category
    this.description = description
    this.code = code
    this.thumbnail = thumbnail
    this.price = price
    this.stock = stock
    this.status = status
  }
}

export default Product
