import { Context } from 'hono'
import { eq } from 'drizzle-orm'
import { categorias } from '../../drizzle/schema'
import { getDrizzleClient } from '../db/client'

export const getAllCategorias = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const result = await db.select().from(categorias).where(eq(categorias.activo, 1))
  return c.json(result)
}

export const createCategoria = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const data = await c.req.json()

  await db.insert(categorias).values({
    nombre: data.nombre,
    activo: data.activo ?? 1,
    created_at: new Date()
  }).run()

  return c.json({ ok: true })
}

