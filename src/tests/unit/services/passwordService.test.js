import PasswordService from '../../../services/passwordService.js'

describe('PasswordService', () => {
  it('hash() should return a hash', async () => {
    const hash = await PasswordService.hash('password')
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
    expect(hash).not.toBe(null)
  })

  it('should return true for valid pass', async () => {
    const hash = await PasswordService.hash('123')
    const compare = await PasswordService.compare('123', hash)
    expect(compare).toEqual(true)
  })

  it('should return false for invalid pass', async () => {
    const hash = await PasswordService.hash('password')
    const compare = await PasswordService.compare('123', hash)
    expect(compare).toEqual(false)
  })
})
