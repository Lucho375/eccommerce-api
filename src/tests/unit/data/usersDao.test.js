import UserMongooseRepository from '../../../data/repositories/mongoose/userMongooseRepository'
import TestServer from '../..'
import { user } from '../../mocks/user'

const userDao = new UserMongooseRepository()

describe('UsersDao', () => {
  let db, userId

  beforeAll(async () => {
    const { db: dbInstance } = await TestServer()
    db = dbInstance
    await db.init(process.env.DB_URI_TEST)
  })

  describe('UsersDao.create()', () => {
    it('should return an user created', async () => {
      const newUser = await userDao.create(user)
      userId = newUser.id
      expect(newUser).toBeTruthy()
    })
  })

  describe('UsersDao.getOne()', () => {
    it('should return null', async () => {
      const user = await userDao.getOne({ firstname: 'not_existing_user' })
      expect(user).toBeNull()
    })

    it('should return User{}', async () => {
      const user = await userDao.getOne({ firstname: 'test' })
      expect(user).toBeTruthy()
    })
  })

  describe('UsersDao.getAll()', () => {
    it('should return Users[]', async () => {
      const users = await userDao.getAll()
      expect(Array.isArray(users)).toBe(true)
    })
  })

  describe('UsersDao.updateOne()', () => {
    it('should return updated user', async () => {
      const updatedUser = await userDao.updateOne(userId, { firstname: 'Updated User' })
      expect(updatedUser.firstname).toMatch('Updated User')
      expect(updatedUser.firstname).not.toBe(user.firstname)
    })
  })

  describe('UsersDao.deleteOne()', () => {
    it('should return user.enabled false', async () => {
      const disabledUser = await userDao.deleteOne(userId)
      expect(disabledUser.enabled).toBe(false)
    })
  })

  afterAll(async () => {
    await db.dropDatabase()
    await db.close()
  })
})
