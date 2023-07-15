import TestServer from '../..'
import request from 'supertest'
import { adminLogin, adminUser } from '../../mocks/user'
import { productMock } from '../../mocks/product'

describe('Testing /products endpoint', () => {
  let db, requester, token, productId, product
  beforeAll(async function () {
    const { db: dbInstance, app } = await TestServer()
    db = dbInstance
    await db.init(process.env.MONGO_DB_URI_TEST)
    requester = request(app.getApp())
    await requester.post('/sessions/signup').send(adminUser).expect(201).expect('Content-Type', /json/)
    const response = await requester.post('/sessions/login').send(adminLogin)
    token = response.body.payload
  })

  it('GET /products should return Products[] and status 200', async () => {
    const response = await requester.get('/products').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.payload)).toBe(true)
    expect(response.body.payload.length).toEqual(0)
  })

  it('/POST /product should return new Product', async () => {
    const response = await requester
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productMock)
      .expect(201)
      .expect('Content-Type', /json/)
    const createdProduct = response.body.payload
    expect(createdProduct.title).toBe(productMock.title)
    expect(createdProduct.category).toBe(productMock.category)
    expect(createdProduct.description).toBe(productMock.description)
    expect(createdProduct.code).toBe(productMock.code)
    expect(createdProduct.thumbnail).toEqual(productMock.thumbnail)
    expect(createdProduct.price).toBe(productMock.price)
    expect(createdProduct.stock).toBe(productMock.stock)
    expect(createdProduct.status).toBe(true)
    productId = createdProduct.id
    product = createdProduct
  })

  it('/GET/productId should return previous product created', async () => {
    const response = await requester
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
    expect(response.body.payload).toEqual(product)
  })

  it('/DELETE/PRODUCTID should disable product', async () => {
    await requester.delete(`/products/${productId}`).set('Authorization', `Bearer ${token}`).expect(204)
  })

  it('/PUT/PRODUCTID should update product', async () => {
    const response = await requester
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New title' })
    expect(response.body.payload.title).toBe('New title')
  })

  afterAll(async () => {
    await db.dropDatabase()
    await db.close()
  })
})
