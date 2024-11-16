export const LIMIT = {
  USER: 'user',
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  YEARLY: 'yearly',
  MONTHLY: 'monthly',
} as const

export type Limit = (typeof LIMIT)[keyof typeof LIMIT]
