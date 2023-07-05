import request from 'supertest'
import TestServer from '../index.js'
import { verifyAccessToken } from '../../helpers/JWT.js'

describe('Testing endpoints', function () {
  let db
  let token
  let requester
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
    requester = request(app.getApp())
  })

  describe('Unauthorized Access', function () {
    it('should return status 401 for /products', async function () {
      await requester.get('/products').expect(401)
    })
  })

  describe('Account Creation (/sessions/signup)', function () {
    it('should return status 201 for successful account creation', async function () {
      await requester.post('/sessions/signup').send(newAccount).expect(201).expect('Content-Type', /json/)
    })
  })

  describe('User Login (/sessions/login)', function () {
    it('should return a valid JWT token', async function () {
      const response = await requester.post('/sessions/login').send(userData).expect('Content-Type', /json/).expect(200)
      const verifiyToken = verifyAccessToken(response.body.payload)
      expect(verifiyToken.email).toEqual(userData.email)
      token = response.body.payload
    })
  })

  describe('Unauthorized Access to /sessions/current', function () {
    it('should return status 401 for invalid login credentials', async function () {
      const response = await requester
        .post('/sessions/login')
        .send({ ...userData, password: 'invalidpassword' })
        .expect(401)
      expect(response.body).toEqual({ ok: false, message: 'Wrong email or password' })
    })
  })

  describe('Accessing /sessions/current with a valid token', function () {
    it('should return user data for authenticated request', async function () {
      const response = await requester
        .get('/sessions/current')
        .expect('Content-Type', /json/)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(response.body.payload.firstname).toEqual(newAccount.firstname)
    })
  })

  describe('Accessing /sessions/current with a invalid token', function () {
    it('should return status 403', async function () {
      const response = await requester
        .get('/sessions/current')
        .expect('Content-Type', /json/)
        .set('Authorization', `Bearer ${token}125`)
        .expect(403)
      expect(response.body).toEqual({ status: 'error', message: 'Invalid token' })
    })
  })

  afterAll(async function () {
    await db.dropDatabase()
    await db.close()
  })
})
