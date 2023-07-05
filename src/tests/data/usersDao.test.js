import UsersDao from '../../data/daos/usersDao'
import DbFactory from '../../data/factories/dbFactory'

const userDao = new UsersDao()
const db = DbFactory.create()

beforeAll(async () => {
  await db.init('mongodb://127.0.0.1:27017/test')
})

describe('UsersDao test', () => {
  it('must return an user created', async () => {
    const user = {
      email: 'test',
      password: 'test123456',
      lastname: 'test',
      firstname: 'test'
    }
    const newUser = await userDao.create(user)
    expect(newUser).toBeTruthy()
  })

  it('must return null', async () => {
    const user = await userDao.getOne({ name: 'not_existing_user' })
    expect(user).toBeNull()
  })

  it('must return an array of users', async () => {
    const users = await userDao.getAll()
    expect(Array.isArray(users)).toBe(true)
  })

  it('must return an user object', async () => {
    const user = await userDao.getOne({ firstname: 'test' })
    expect(user).toBeTruthy()
  })
})

afterAll(async () => {
  await db.dropDatabase()
  await db.close()
})
