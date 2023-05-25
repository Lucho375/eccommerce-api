import { request, response } from 'express'
import { ZodError } from 'zod'
import { Error } from 'mongoose'
import jwt from 'jsonwebtoken'
const { TokenExpiredError, JsonWebTokenError } = jwt // COMMONJS

export default function (error, req = request, res = response) {
  // JWT TOKENS
  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) return res.sendStatus(401)

  // ZodError
  if (error instanceof ZodError) {
    return res.status(400).send(error.issues.map(issue => ({ [issue.path[0]]: issue.message })))
  }

  // Mongoose
  if (error instanceof Error.ValidationError) return res.status(400).send(error)

  return res.status(500).send({ error: 'Server error status 500' })
}
