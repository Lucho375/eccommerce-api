class ZodValidator {
  #schema
  #updateSchema
  constructor(schema) {
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

export default ZodValidator
