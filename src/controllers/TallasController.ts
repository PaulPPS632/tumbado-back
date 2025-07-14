import { Context } from "hono"
import { getDrizzleClient } from "../db/client"
import { producto_tallas, tallas } from "../../drizzle/schema"
import { eq } from "drizzle-orm"

export const getAllTallas = async (c: Context) => {
    const db = getDrizzleClient(c.env.DB)
    const result = await db.select().from(tallas).where(eq(tallas.activo, 1))
    return c.json(result)
}

export const createTalla = async (c: Context) => {
    const db = getDrizzleClient(c.env.DB)
    const data = await c.req.json()

    await db.insert(tallas).values({
        valor: data.valor,
        tipo: data.tipo,
        activo: data.activo ?? 1,
        created_at: new Date()
    }).run()

    return c.json({ ok: true })
}

export const bindTallaToProducto = async (c: Context) => {
    const db = getDrizzleClient(c.env.DB)
    const data = await c.req.json()

    await db.insert(producto_tallas).values({
        producto_id: data.producto_id,
        talla_id: data.talla_id,
        created_at: new Date()
    }).run()

    return c.json({ ok: true })
}