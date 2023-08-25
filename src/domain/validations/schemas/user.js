import { z } from 'zod'

export const userSchemaValidation = z.object({
  firstname: z.string().nonempty('Firstname field is required'),
  lastname: z.string().nonempty('Lastname field is required'),
  password: z.string().min(8, 'Password min 8 characters').nonempty('Password field is required'),
  age: z.number().int().positive('Age must be a number').default(18),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin']).default('user'),
  enabled: z.boolean().default(true),
  image: z
    .string()
    .url('Invalid image URL')
    .default('https://res.cloudinary.com/dkruwae6j/image/upload/v1682373644/users/ghs4werjrztszflmxodw.webp')
})

export const loginSchemaValidation = z.object({
  email: z.string().email('Invalid email address').nonempty('Email address is required'),
  password: z.string().min(5, 'Password min 5 characters').nonempty('Password is required')
})

export const emailValidate = z.object({
  email: z.string().email('Invalid email address').nonempty('Email address is required')
})

export const resetPasswordValidate = z.object({
  password: z.string().min(8, 'Password min 8 characters').nonempty('Password field is required'),
  token: z.string().nonempty('Token field is required')
})
