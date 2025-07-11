import { Context } from "hono";
import { and, eq } from "drizzle-orm";
import {
  productos,
  categorias,
  sexos,
  marcas,
  tipos,
  producto_imagenes,
} from "../../drizzle/schema";

import { getDrizzleClient } from "../db/client";

export const getAllProductos = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB);
  //const result = await db.select().from(productos).where(eq(productos.activo, 1))
  const rows = await db
    .select({
      producto: productos,
      categoria: categorias,
      sexo: sexos,
      marca: marcas,
      tipo: tipos,
      imagen: producto_imagenes,
    })
    .from(productos)
    .leftJoin(categorias, eq(productos.categoria_id, categorias.id))
    .leftJoin(sexos, eq(productos.sexo_id, sexos.id))
    .leftJoin(marcas, eq(productos.marca_id, marcas.id))
    .leftJoin(tipos, eq(productos.tipo_id, tipos.id))
    .leftJoin(
      producto_imagenes,
      eq(productos.id, producto_imagenes.producto_id)
    )
    .where(eq(productos.activo, 1))
    .all();
  const productosMap = new Map<number, any>();

  for (const row of rows) {
    const { producto, categoria, sexo, marca, tipo, imagen } = row;
    const existing = productosMap.get(producto.id);

    if (!existing) {
      productosMap.set(producto.id, {
        ...producto,
        categoria,
        sexo,
        marca,
        tipo,
        imagenes: imagen ? [imagen.url] : [],
      });
    } else {
      if (imagen) {
        existing.imagenes.push(imagen.url);
      }
    }
  }

  const result = Array.from(productosMap.values());
  return c.json(result);
};

export const createProducto = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB);
  const data = await c.req.json();

  await db
    .insert(productos)
    .values({
      nombre: data.nombre,
      precio_anterior: data.precio_anterior,
      precio: data.precio,
      imagen: data.imagen,
      categoria_id: data.categoria_id,
      sexo_id: data.sexo_id,
      marca_id: data.marca_id,
      tipo_id: data.tipo_id,
      stock: data.stock,
      stock_minimo: data.stock_minimo,
      isdescuento: data.isdescuento,
      descuento: data.descuento,
      activo: data.activo ?? 1,
      created_at: new Date(),
    })
    .run();

  return c.json({ ok: true });
};
export const updateProducto = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB);
  const id = c.req.param("id");
  const data = await c.req.json();

  await db
    .update(productos)
    .set({
      nombre: data.nombre,
      precio_anterior: data.precio_anterior,
      precio: data.precio,
      imagen: data.imagen,
      categoria_id: data.categoria_id,
      sexo_id: data.sexo_id,
      marca_id: data.marca_id,
      tipo_id: data.tipo_id,
      stock: data.stock,
      stock_minimo: data.stock_minimo,
      isdescuento: data.isdescuento,
      descuento: data.descuento,
      activo: data.activo ?? 1,
      created_at: new Date(),
    })
    .where(eq(productos.id, Number(id)))
    .run();

  return c.json({ ok: true });
};

export const getproductosbycategoria = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const id = Number(c.req.param("id"))

  if (isNaN(id)) {
    return c.json({ error: "ID de categoría inválido" }, 400)
  }

  const rows = await db
    .select({
      producto: productos,
      categoria: categorias,
      sexo: sexos,
      marca: marcas,
      tipo: tipos,
      imagen: producto_imagenes
    })
    .from(productos)
    .leftJoin(categorias, eq(productos.categoria_id, categorias.id))
    .leftJoin(sexos, eq(productos.sexo_id, sexos.id))
    .leftJoin(marcas, eq(productos.marca_id, marcas.id))
    .leftJoin(tipos, eq(productos.tipo_id, tipos.id))
    .leftJoin(producto_imagenes, eq(productos.id, producto_imagenes.producto_id))
    .where(
      and(eq(productos.activo, 1), eq(productos.categoria_id, id))
    )
    .all()

  // Agrupamos productos con sus imágenes
  const productosMap = new Map<number, any>()

  for (const row of rows) {
    const { producto, categoria, sexo, marca, tipo, imagen } = row
    const existing = productosMap.get(producto.id)

    if (!existing) {
      productosMap.set(producto.id, {
        ...producto,
        categoria,
        sexo,
        marca,
        tipo,
        imagenes: imagen ? [imagen.url] : []
      })
    } else {
      if (imagen) {
        existing.imagenes.push(imagen.url)
      }
    }
  }

  const result = Array.from(productosMap.values())
  return c.json(result)
}