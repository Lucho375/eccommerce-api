import Cart from '../../../../domain/entities/cart'

describe('Cart', () => {
  const cartData = {
    id: 'cart_id',
    user: 'user_id',
    products: ['product1', 'product2']
  }

  it('should create a new instance of Cart', () => {
    const cart = new Cart(cartData)
    expect(cart instanceof Cart).toBe(true)
  })

  it('should have correct properties', () => {
    const cart = new Cart(cartData)
    expect(cart).toHaveProperty('id', expect.any(String))
    expect(cart).toHaveProperty('user', expect.any(String))
    expect(cart).toHaveProperty('products', expect.any(Array))
  })

  it('should have valid property values', () => {
    const cart = new Cart(cartData)
    expect(cart.id).toEqual(cartData.id)
    expect(cart.user).toEqual(cartData.user)
    expect(cart.products).toEqual(cartData.products)
  })

  it('should match the cartData object', () => {
    const cart = new Cart(cartData)
    expect(cart).toEqual(cartData)
  })
})
