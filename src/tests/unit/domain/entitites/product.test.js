import Product from '../../../../domain/entities/product'

describe('Product', () => {
  const productData = {
    id: 'id',
    title: 'product',
    category: 'category',
    description: 'description',
    code: 'code',
    thumbnail: 'thumb',
    price: 150,
    stock: 10,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  it('should create a new instance of Product', () => {
    const product = new Product(productData)
    expect(product instanceof Product).toBe(true)
  })

  it('should have correct properties', () => {
    const product = new Product(productData)
    expect(product).toHaveProperty('id', expect.any(String))
    expect(product).toHaveProperty('title', expect.any(String))
    expect(product).toHaveProperty('category', expect.any(String))
    expect(product).toHaveProperty('description', expect.any(String))
    expect(product).toHaveProperty('code', expect.any(String))
    expect(product).toHaveProperty('thumbnail', expect.any(String))
    expect(product).toHaveProperty('price', expect.any(Number))
    expect(product).toHaveProperty('stock', expect.any(Number))
    expect(product).toHaveProperty('status', expect.any(Boolean))
    expect(product).toHaveProperty('createdAt', expect.any(Date))
    expect(product).toHaveProperty('updatedAt', expect.any(Date))
  })

  it('should have valid property values', () => {
    const product = new Product(productData)
    expect(product.title).toEqual(productData.title)
    expect(product.category).toEqual(productData.category)
    expect(product.description).toEqual(productData.description)
    expect(product.code).toEqual(productData.code)
    expect(product.thumbnail).toEqual(productData.thumbnail)
    expect(product.price).toBeGreaterThan(0)
    expect(product.stock).toBeGreaterThan(0)
    expect(product.status).toEqual(productData.status)
    expect(product.createdAt).toEqual(productData.createdAt)
    expect(product.updatedAt).toEqual(productData.updatedAt)
  })

  it('should match the productData', () => {
    const product = new Product(productData)
    expect(product).toEqual(productData)
  })
})
