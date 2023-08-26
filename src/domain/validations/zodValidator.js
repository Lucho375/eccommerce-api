import { ValidationError } from './ValidationError.js'

export class ZodValidator {
  #schema
  #updateSchema
  constructor(schema) {
    if (!schema) throw new Error('Zod schema is needed')
    this.#schema = schema
    this.#updateSchema = this.#schema.partial()
  }

  #checkEmptyBody(data) {
    if (!data || Object.keys(data).length === 0) throw new ValidationError('Data is empty or missing')
  }

  create(data) {
    this.#checkEmptyBody(data)
    return this.#schema.required().parse(data)
  }

  update(data) {
    this.#checkEmptyBody(data)
    return this.#updateSchema.parse(data)
  }
}
