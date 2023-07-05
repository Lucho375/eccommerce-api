import { createHash, compareHash } from '../../helpers/bcryptHash.js'

describe('Bcrypt test', () => {
  it('should return a hash', async () => {
    const hash = await createHash('password')
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
    expect(hash).not.toBe(null)
  })

  it('should return true for valid pass', async () => {
    const hash = await createHash('123')
    const compare = await compareHash('123', hash)
    expect(compare).toEqual(true)
  })

  it('should return false for invalid pass', async () => {
    const hash = await createHash('password')
    const compare = await compareHash('123', hash)
    expect(compare).toEqual(false)
  })
})
