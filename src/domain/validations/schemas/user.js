import { z } from 'zod'

export const userSchemaValidation = z.object({
  firstname: z.string().nonempty('Name field is required'),
  lastname: z.string().nonempty('Lastname field is required'),
  password: z.string().nonempty('Password field is required').min(8),
  age: z.number().int().positive('Age must be a number'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin']).default('user'),
  enabled: z.boolean().default(true),
  image: z
    .string()
    .url('Invalid image URL')
    .default('https://res.cloudinary.com/dkruwae6j/image/upload/v1682373644/users/ghs4werjrztszflmxodw.webp')
})
