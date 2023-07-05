import request from 'supertest'
import TestServer from '../index.js'
import { verifyAccessToken } from '../../helpers/JWT.js'

describe('Testing endpoints', function () {
  let db
  let server
  let token
  const userData = {
    email: 'test@test.com',
    password: '123456789'
  }

  const newAccount = {
    email: 'test@test.com',
    password: '123456789',
    lastname: 'test',
    firstname: 'test'
  }

  beforeAll(async function () {
    const { db: dbInstance, app } = await TestServer()
    db = dbInstance
    await db.init('mongodb://127.0.0.1:27017/test')
    server = app.getApp()
  })

  describe('unauthorized', function () {
    it('status code must be 401', async function () {
      const response = await request(server).get('/products')
      expect(response.status).toBe(401)
    })
  })

  describe('creating account /sessions/signup', function () {
    it('status code must be 201', async function () {
      const response = await request(server).post('/sessions/signup').send(newAccount)
      expect(response.status).toBe(201)
    })
  })

  describe('test /sessions/login', function () {
    it('must return valid jwt', async function () {
      const response = await request(server).post('/sessions/login').send(userData)
      expect(response.status).toEqual(200)
      const verifiedToken = verifyAccessToken(response.body.payload)
      expect(verifiedToken.email).toEqual(userData.email)
      token = response.body.payload
    })
  })

  describe('test /sessions/current', function () {
    it('must return user data', async function () {
      const response = await request(server).get('/sessions/current').set('Authorization', `Bearer ${token}`)
      expect(response.status).toEqual(200)
      expect(response.body.payload.firstname).toEqual(newAccount.firstname)
    })
  })

  afterAll(async function () {
    await db.dropDatabase()
    await db.close()
  })
})
