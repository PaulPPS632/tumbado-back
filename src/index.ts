/*import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productos } from '../drizzle/schema'
import { getDrizzleClient } from './db/client'
import { eq } from 'drizzle-orm'
import type { D1Database } from '@cloudflare/workers-types'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(cors())

app.get('/productos', async (c) => {
  const db = getDrizzleClient(c.env.DB)
  const result = await db.select().from(productos).where(eq(productos.activo, 1))
  return c.json(result)
})

app.post('/productos', async (c) => {
  const db = getDrizzleClient(c.env.DB)
  const data = await c.req.json()

  await db.insert(productos).values({
    nombre: data.nombre,
    precio: data.precio,
    imagen: data.imagen,
    categoria_id: data.categoria_id,
    sexo_id: data.sexo_id,
    marca_id: data.marca_id,
    stock: data.stock,
    stock_minimo: data.stock_minimo,
    isdescuento: data.isdescuento,
    descuento: data.descuento,
    precio_anterior: data.precio_anterior,
    activo: data.activo,
    created_at: data.created_at
  }).run()

  return c.json({ ok: true })
})

// 👇 Esto es CRUCIAL para que Cloudflare lo reconozca como ESModule
export default app
*/

import { createApp } from './app'

const app = createApp()

export default app
