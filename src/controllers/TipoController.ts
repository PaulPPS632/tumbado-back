import { Context } from 'hono'
import { eq } from 'drizzle-orm'
import { tipos } from '../../drizzle/schema'
import { getDrizzleClient } from '../db/client'

export const getAllTipos = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const result = await db.select().from(tipos).where(eq(tipos.activo, 1))
  return c.json(result)
}

export const createTipo = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const data = await c.req.json()

  await db.insert(tipos).values({
    nombre: data.nombre,
    activo: data.activo ?? 1,
    created_at: new Date()
  }).run()

  return c.json({ ok: true })
}
