import request from 'supertest'
import TestServer from '../../index.js'
import TokenService from '../../../services/tokenService.js'
import { login, user } from '../../mocks/user.js'

describe('Testing session controller', () => {
  let db
  let token
  let requester
  let tokenService

  beforeAll(async () => {
    const { db: dbInstance, app } = await TestServer()
    db = dbInstance
    await db.init(process.env.MONGO_DB_URI_TEST)
    requester = request(app.getApp())
    tokenService = new TokenService()
  })

  afterAll(async () => {
    await db.dropDatabase()
    await db.close()
  })

  describe('Unauthorized Access', () => {
    it('should return status 401 for /current', async () => {
      await requester.get('/sessions/current').expect(401)
    })
  })

  describe('Account Creation (/sessions/signup)', () => {
    it('should return status 201 for successful account creation', async () => {
      await requester.post('/sessions/signup').send(user).expect(201).expect('Content-Type', /json/)
    })
  })

  describe('User Login (/sessions/login)', () => {
    it('should return a valid token', async () => {
      const response = await requester.post('/sessions/login').send(login).expect('Content-Type', /json/).expect(200)
      const verifiyToken = tokenService.verifyAccessToken(response.body.payload)
      expect(verifiyToken.email).toEqual(login.email)
      token = response.body.payload
    })
  })

  describe('Unauthorized Access to (/sessions/current)', () => {
    it('should return status 401 for invalid login credentials', async () => {
      const response = await requester
        .post('/sessions/login')
        .send({ ...login, password: 'invalidpassword' })
        .expect(401)
      expect(response.body).toEqual({ ok: false, message: 'Wrong email or password' })
    })
  })

  describe('Accessing (/sessions/current) with a valid token', () => {
    it('should return user data for authenticated request', async () => {
      const response = await requester
        .get('/sessions/current')
        .expect('Content-Type', /json/)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(response.body.payload.firstname).toEqual(user.firstname)
    })
  })

  describe('Accessing (/sessions/current) with a invalid token', () => {
    it('should return status 403', async () => {
      const response = await requester
        .get('/sessions/current')
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer invalidtoken')
        .expect(403)
      expect(response.body).toEqual({ status: 'error', message: 'Invalid token' })
    })
  })
})
