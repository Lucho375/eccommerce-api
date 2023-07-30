import { z } from 'zod'

const queryValidation = z.object({
  limit: z.number().max(10).positive().optional(),
  category: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional()
})
