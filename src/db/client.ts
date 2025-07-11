import { drizzle } from 'drizzle-orm/d1'
import type { D1Database } from '@cloudflare/workers-types'

export function getDrizzleClient(db: D1Database) {
  return drizzle(db)
}
