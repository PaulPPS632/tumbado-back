import { Context } from 'hono'
import { eq } from 'drizzle-orm'
import { marcas } from '../../drizzle/schema'
import { getDrizzleClient } from '../db/client'

export const getAllMarcas = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const result = await db.select().from(marcas).where(eq(marcas.activo, 1))
  return c.json(result)
}

export const createMarca = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const data = await c.req.json()

  await db.insert(marcas).values({
    nombre: data.nombre,
    activo: data.activo ?? 1,
    created_at: new Date()
  }).run()

  return c.json({ ok: true })
}
