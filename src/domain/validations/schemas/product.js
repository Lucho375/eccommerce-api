import { z } from 'zod'

export const productSchemaValidation = z.object({
  title: z.string().nonempty('Product title is required'),
  code: z.string().nonempty('Product code is required'),
  description: z.string().nonempty('Product description is required'),
  thumbnail: z.array(z.string().url()).default([]),
  price: z.number().positive('Product price must be a number'),
  stock: z.number().positive('Product stock must be a positive number'),
  category: z.string().nonempty('Product category is required')
})
