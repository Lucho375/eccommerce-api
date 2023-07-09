import { compareHash, createHash } from '../../../helpers/bcryptHash'

describe('Bcrypt test', () => {
  describe('createHash()', () => {
    it('should return a hash', async () => {
      const hash = await createHash('password')
      expect(hash).toBeDefined()
      expect(typeof hash).toBe('string')
      expect(hash).not.toBe(null)
    })
  })

  describe('compareHash()', () => {
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
})
