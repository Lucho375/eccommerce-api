import { ZodError } from 'zod'
import { Error } from 'mongoose'
import jwt from 'jsonwebtoken'
import { NotFoundError, ValidationError } from '../../domain/validations/ValidationError.js' // COMMONJS
import logger from '../../pino.js'
const { TokenExpiredError, JsonWebTokenError } = jwt

export function errorHandler(error, req, res, next) {
  // JWT TOKENS
  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
    return res.status(403).send({ status: 'error', message: 'Invalid token' })
  }
  // ZodError
  if (error instanceof ZodError)
    return res.status(400).send(error.issues.map(issue => ({ [issue.path[0]]: issue.message })))
  // Mongoose
  if (error instanceof Error.ValidationError) return res.status(400).send(error)

  if (error instanceof ValidationError) return res.status(400).send({ message: error.message })

  if (error instanceof NotFoundError) return res.status(404).send({ message: error.message })

  logger.error(error)
  return res.status(500).send({ error: 'Internal server error', message: error.message })
}
