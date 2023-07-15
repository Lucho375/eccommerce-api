import TokenService from '../../../services/tokenService'
import { jwtPayload } from '../../mocks/user'
describe('TokenService', () => {
  let accessToken, refreshToken, forgotPasswordToken
  let tokenService = new TokenService()

  describe('create', () => {
    it('should return accessToken', () => {
      const token = tokenService.generateAccessToken(jwtPayload)
      accessToken = token
      expect(token).not.toBe(null)
    })

    it('should return refreshToken', () => {
      const token = tokenService.generateRefreshToken(jwtPayload)
      refreshToken = token
      expect(token).not.toBe(null)
    })

    it('should return forgotPasswordToken', () => {
      const token = tokenService.generateChangePasswordToken(jwtPayload)
      forgotPasswordToken = token
      expect(token).not.toBe(null)
    })
  })

  describe('Verifying Tokens', () => {
    it('verify accessToken', () => {
      const token = tokenService.verifyAccessToken(accessToken)
      expect(token).not.toBe(null)
      expect(token.firstname).toBe(jwtPayload.firstname)
      expect(token.email).toBe(jwtPayload.email)
      expect(token.lastname).toBe(jwtPayload.lastname)
    })

    it('verify refreshToken', () => {
      const token = tokenService.verifyRefreshToken(refreshToken)
      expect(token).not.toBe(null)
      expect(token.firstname).toBe(jwtPayload.firstname)
      expect(token.email).toBe(jwtPayload.email)
      expect(token.lastname).toBe(jwtPayload.lastname)
    })
  })
})
