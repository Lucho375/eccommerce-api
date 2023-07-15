import User from '../../../../domain/entities/user'

describe('User', () => {
  const userData = {
    id: 'id',
    age: 25,
    email: 'email',
    firstname: 'firstname',
    lastname: 'lastname',
    image: 'image',
    password: 'password',
    role: 'admin',
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  it('should create a new instance of User', () => {
    const user = new User(userData)
    expect(user instanceof User).toBe(true)
  })

  it('should have correct properties', () => {
    const user = new User(userData)
    expect(user).toHaveProperty('id', expect.any(String))
    expect(user).toHaveProperty('age', expect.any(Number))
    expect(user).toHaveProperty('email', expect.any(String))
    expect(user).toHaveProperty('firstname', expect.any(String))
    expect(user).toHaveProperty('lastname', expect.any(String))
    expect(user).toHaveProperty('image', expect.any(String))
    expect(user).toHaveProperty('password', expect.any(String))
    expect(user).toHaveProperty('role', expect.stringMatching(/^(admin|user)$/))
    expect(user).toHaveProperty('enabled', expect.any(Boolean))
    expect(user).toHaveProperty('createdAt', expect.any(Date))
    expect(user).toHaveProperty('updatedAt', expect.any(Date))
  })

  it('should match the userData object', () => {
    const user = new User(userData)
    expect(user).toEqual(userData)
  })
})
