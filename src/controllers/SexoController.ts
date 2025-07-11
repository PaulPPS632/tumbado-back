import { Context } from 'hono'
import { eq } from 'drizzle-orm'
import { sexos } from '../../drizzle/schema'
import { getDrizzleClient } from '../db/client'

export const getAllSexos = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const result = await db.select().from(sexos).where(eq(sexos.activo, 1))
  return c.json(result)
}

export const createSexo = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const data = await c.req.json()

  await db.insert(sexos).values({
    nombre: data.nombre,
    activo: data.activo ?? 1,
    created_at: new Date()
  }).run()

  return c.json({ ok: true })
}
