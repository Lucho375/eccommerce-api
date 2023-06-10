import { ZodError } from 'zod'
import { Error } from 'mongoose'
import jwt from 'jsonwebtoken'
const { TokenExpiredError, JsonWebTokenError } = jwt // COMMONJS

export default function (error, req, res, next) {
  // JWT TOKENS
  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
    return res.status(403).send({ status: 'error', message: 'Invalid token' })
  }

  // ZodError
  if (error instanceof ZodError)
    return res.status(400).send(error.issues.map(issue => ({ [issue.path[0]]: issue.message })))

  // Mongoose
  if (error instanceof Error.ValidationError) return res.status(400).send(error)

  return res.status(500).send({ error: 'Internal server error', message: error.message })
}
