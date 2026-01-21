import 'server-only'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import * as schema from './db/schema'

const trustedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://www.flarefilms.com.au',
  'https://flarefilms.com.au',
  process.env.NEXT_PUBLIC_APP_URL,
].filter(Boolean) as string[]

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins,
})

export type Session = typeof auth.$Infer.Session
