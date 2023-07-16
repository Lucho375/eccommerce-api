import request from 'supertest'
import TestServer from '../../index.js'
import { adminLogin, adminUser, user } from '../../mocks/user.js'

let db, token, requester, userId

beforeAll(async () => {
  const { db: dbInstance, app } = await TestServer()
  db = dbInstance
  await db.init(process.env.DB_URI_TEST)
  requester = request(app.getApp())
  await requester.post('/sessions/signup').send(adminUser).expect(201).expect('Content-Type', /json/)
  const response = await requester.post('/sessions/login').send(adminLogin)
  token = response.body.payload
})

afterAll(async () => {
  await db.dropDatabase()
  await db.close()
})

describe('Testing User Routes', () => {
  describe('/GET', () => {
    it('should return Users[]', async () => {
      const { body } = await requester.get('/users').set('Authorization', `Bearer ${token}`).expect(200)
      expect(Array.isArray(body.payload)).toBe(true)
      expect(body.payload.length).toBe(1)
    })
  })

  describe('/POST', () => {
    it('should return a user created', async () => {
      const { body } = await requester.post('/users').set('Authorization', `Bearer ${token}`).send(user).expect(201)
      userId = body.payload.id
      expect(body.payload.email).toBe(user.email)
      expect(body.payload.firstname).toBe(user.firstname)
      expect(body.payload.lastname).toBe(user.lastname)
      expect(body.payload.role).toBe('user')
      expect(body.payload.enabled).toBe(true)
    })
  })

  describe('/GET/USERID', () => {
    it('should return previous user created', async () => {
      const { body } = await requester.get(`/users/${userId}`).set('Authorization', `Bearer ${token}`)
      expect(body.payload.id).toBe(userId)
      expect(body.payload.email).toBe(user.email)
      expect(body.payload.firstname).toBe(user.firstname)
      expect(body.payload.lastname).toBe(user.lastname)
      expect(body.payload.role).toBe('user')
      expect(body.payload.enabled).toBe(true)
    })
  })

  describe('/PUT/USERID', () => {
    it('should return updated user', async () => {
      const { body } = await requester
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ firstname: 'updated' })
        .expect(200)
      expect(body.payload.firstname).toBe('updated')
    })
  })

  describe('/DELETE/USERID', () => {
    it('should return previous user deleted', async () => {
      const { body } = await requester.delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`).expect(200)
      expect(body.payload.enabled).toBe(false)
    })
  })
})
