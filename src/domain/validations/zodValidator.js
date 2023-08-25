export class ZodValidator {
  #schema
  #updateSchema
  constructor(schema) {
    if (!schema) throw new Error('Zod schema is needed')
    this.#schema = schema
    this.#updateSchema = this.#schema.partial()
  }

  create(data) {
    return this.#schema.required().parse(data)
  }

  update(data) {
    return this.#updateSchema.parse(data)
  }
}
