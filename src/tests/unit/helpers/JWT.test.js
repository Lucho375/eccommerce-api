import * as jwtUtils from '../../../helpers/JWT'
import { user } from '../../mocks/user'

describe('JWT utils', () => {
  let tokenCreated, refreshToken, forgotPasswordToken

  describe('JWTs creations', () => {
    it('should return accessToken', () => {
      const token = jwtUtils.createAccessToken(user, '5s')
      tokenCreated = token
      expect(token).not.toBe(null)
    })

    it('should return refreshToken', () => {
      const token = jwtUtils.createRefreshToken(user, '5s')
      refreshToken = token
      expect(token).not.toBe(null)
    })

    it('should return forgotPasswordToken', () => {
      const token = jwtUtils.createForgotPasswordToken(user, '5s')
      forgotPasswordToken = token
      expect(token).not.toBe(null)
    })
  })

  describe('Verifying JWTs', () => {
    it('verify accessToken', () => {
      const token = jwtUtils.verifyAccessToken(tokenCreated)
      expect(token).not.toBe(null)
      expect(token.firstname).toBe(user.firstname)
      expect(token.email).toBe(user.email)
      expect(token.password).toBe(user.password)
      expect(token.lastname).toBe(user.lastname)
    })

    it('verify refreshToken', () => {
      const token = jwtUtils.verifyRefreshToken(refreshToken)
      expect(token).not.toBe(null)
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
        jwtUtils.verifyAccessToken(tokenCreated)
      } catch (error) {
        err = error
      }
      expect(err.name).toBe('TokenExpiredError')
    }, 6000)

    it('should throw TokenExpiredError for invalid refreshToken', async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))
      let err
      try {
        jwtUtils.verifyRefreshToken(refreshToken)
      } catch (error) {
        err = error
      }
      expect(err.name).toBe('TokenExpiredError')
    }, 6000)
  })
})
