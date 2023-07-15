import TokenService from '../../../services/tokenService'
import { user } from '../../mocks/user'

describe('JWT utils', () => {
  let tokenCreated, refreshToken, forgotPasswordToken
  let tokenService = new TokenService()
  describe('JWTs creations', () => {
    it('should return accessToken', () => {
      const token = tokenService.generateAccessToken(user)
      tokenCreated = token
      expect(token).not.toBe(null)
    })

    it('should return refreshToken', () => {
      const token = tokenService.generateRefreshToken(user)
      refreshToken = token
      expect(token).not.toBe(null)
    })

    it('should return forgotPasswordToken', () => {
      const token = tokenService.generateChangePasswordToken(user)
      forgotPasswordToken = token
      expect(token).not.toBe(null)
    })
  })

  describe('Verifying JWTs', () => {
    it('verify accessToken', () => {
      const token = tokenService.verifyAccessToken(tokenCreated)
      expect(token).not.toBe(null)
      expect(token.firstname).toBe(user.firstname)
      expect(token.email).toBe(user.email)
      expect(token.password).toBe(user.password)
      expect(token.lastname).toBe(user.lastname)
    })

    it('verify refreshToken', () => {
      const token = tokenService.verifyRefreshToken(refreshToken)
      expect(token).not.toBe(null)
      expect(token.firstname).toBe(user.firstname)
      expect(token.email).toBe(user.email)
      expect(token.password).toBe(user.password)
      expect(token.lastname).toBe(user.lastname)
    })
  })

  describe('Expired JWTs', () => {
    it('should throw TokenExpiredError for invalid accessToken', async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))
      let err
      try {
        tokenService.verifyAccessToken(tokenCreated)
      } catch (error) {
        err = error
      }
      expect(err.name).toBe('TokenExpiredError')
    }, 6000)

    it('should throw TokenExpiredError for invalid refreshToken', async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))
      let err
      try {
        tokenService.verifyRefreshToken(refreshToken)
      } catch (error) {
        err = error
      }
      expect(err.name).toBe('TokenExpiredError')
    }, 6000)
  })
})
