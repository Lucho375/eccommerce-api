import TestServer from '../..'
import request from 'supertest'
import { login, user } from '../../mocks/user'

describe('Testing /products endpoint', () => {
  let db, requester, token
  beforeAll(async function () {
    const { db: dbInstance, app } = await TestServer()
    db = dbInstance
    await db.init(process.env.MONGO_DB_URI_TEST)
    requester = request(app.getApp())
    await requester.post('/sessions/signup').send(user)
    const {
      body: { payload }
    } = await requester.post('/sessions/login').send(login)
    token = payload
  })

  it('GET /products should return Products[] and status 200', async () => {
    const response = await requester.get('/products').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.payload)).toBe(true)
    expect(response.body.payload.length).toEqual(0)
  })

  afterAll(async () => {
    await db.dropDatabase()
    await db.close()
  })
})
