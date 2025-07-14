import { Context } from "hono";
import { and, eq, like, or } from "drizzle-orm";
import {
  productos,
  categorias,
  sexos,
  marcas,
  tipos,
  producto_imagenes,
  tallas,
  producto_tallas,
} from "../../drizzle/schema";

import { getDrizzleClient } from "../db/client";
import { Search } from "../models/types";

export const getAllProductos = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB);

  const rows = await db
    .select({
      producto: productos,
      categoria: categorias,
      sexo: sexos,
      marca: marcas,
      tipo: tipos,
      imagen: producto_imagenes,
      talla: tallas,
      prod_talla: producto_tallas,
    })
    .from(productos)
    .leftJoin(categorias, eq(productos.categoria_id, categorias.id))
    .leftJoin(sexos, eq(productos.sexo_id, sexos.id))
    .leftJoin(marcas, eq(productos.marca_id, marcas.id))
    .leftJoin(tipos, eq(productos.tipo_id, tipos.id))
    .leftJoin(producto_imagenes, eq(productos.id, producto_imagenes.producto_id))
    .leftJoin(producto_tallas, eq(productos.id, producto_tallas.producto_id))
    .leftJoin(tallas, eq(producto_tallas.talla_id, tallas.id))
    .where(eq(productos.activo, 1))
    .all();

  const productosMap = new Map<number, any>();

  for (const row of rows) {
    const { producto, categoria, sexo, marca, tipo, imagen, talla, prod_talla } = row;
    const existing = productosMap.get(producto.id);

    const tallaObj = talla && prod_talla
      ? { id: talla.id, valor: talla.valor, tipo: talla.tipo }
      : null;

    if (!existing) {
      productosMap.set(producto.id, {
        ...producto,
        categoria,
        sexo,
        marca,
        tipo,
        imagenes: imagen ? [imagen.url] : [],
        tallas: tallaObj ? [tallaObj] : [],
      });
    } else {
      if (imagen) {
        existing.imagenes.push(imagen.url);
      }
      if (tallaObj && !existing.tallas.some((t: any) => t.id === tallaObj.id)) {
        existing.tallas.push(tallaObj);
      }
    }
  }

  const result = Array.from(productosMap.values());
  return c.json(result);
};

export const getById = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB);
  const idParam = c.req.param("id");
  const id = Number(idParam);

  if (isNaN(id)) {
    return c.json({ error: "ID inválido" }, 400);
  }

  const rows = await db
    .select({
      producto: productos,
      categoria: categorias,
      sexo: sexos,
      marca: marcas,
      tipo: tipos,
      imagen: producto_imagenes,
      talla: tallas,
      prod_talla: producto_tallas,
    })
    .from(productos)
    .leftJoin(categorias, eq(productos.categoria_id, categorias.id))
    .leftJoin(sexos, eq(productos.sexo_id, sexos.id))
    .leftJoin(marcas, eq(productos.marca_id, marcas.id))
    .leftJoin(tipos, eq(productos.tipo_id, tipos.id))
    .leftJoin(producto_imagenes, eq(productos.id, producto_imagenes.producto_id))
    .leftJoin(producto_tallas, eq(productos.id, producto_tallas.producto_id))
    .leftJoin(tallas, eq(producto_tallas.talla_id, tallas.id))
    .where(eq(productos.id, id));

  if (rows.length === 0) {
    return c.json({ error: "Producto no encontrado" }, 404);
  }

  // Extraemos los datos básicos
  const { producto, categoria, sexo, marca, tipo } = rows[0];

  // Imágenes (pueden repetirse, pero aquí sólo hay un JOIN de imágenes)
  const imagenes = rows
    .map((row) => row.imagen?.url)
    .filter((url): url is string => !!url);

  // Agrupamos las tallas en un Map para evitar duplicados
  const tallasMap = new Map<number, { id: number; valor: string; tipo: string }>();
  for (const row of rows) {
    if (row.talla && row.prod_talla) {
      const { id, valor, tipo } = row.talla;
      tallasMap.set(id, { id, valor, tipo });
    }
  }
  const tallasArray = Array.from(tallasMap.values());

  // Resultado final
  const result = {
    ...producto,
    categoria,
    sexo,
    marca,
    tipo,
    imagenes,
    tallas: tallasArray,
  };

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

export const addImageByProducto = async (c: Context) => {
  try {
    const db = getDrizzleClient(c.env.DB)
    const id = Number(c.req.param("id"))
    const data = await c.req.json()
    console.log(data)
    await db
    .insert(producto_imagenes)
    .values({
      producto_id: id,
      url: data.url,
      orden: data.orden ?? 0
    })
    .run()

    return c.json({ ok: true })
  } catch (error) {
    console.error("Error al agregar imagen:", error)
    return c.json({ error: "Error al agregar imagen" }, 500)
  }
}
export const ImagenesByProducto = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const id = Number(c.req.param("id"))

  if (isNaN(id)) {
    return c.json({ error: "ID de producto inválido" }, 400)
  }

  const rows = await db
    .select()
    .from(producto_imagenes)
    .where(eq(producto_imagenes.producto_id, id))
    .all()

  return c.json(rows)
}
export const deleteImageById = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB)
  const id = Number(c.req.param("id"))
  await db
    .delete(producto_imagenes)
    .where(eq(producto_imagenes.id, id))
    .run()

  return c.json({ ok: true })
}

export const searchProductos = async (c: Context) => {
  const db = getDrizzleClient(c.env.DB);
  const query = await c.req.json() as Search;

  const conditions = [];

  if (query.search) {
    conditions.push(like(productos.nombre, `%${query.search}%`));
  }
  if (query.categoria_id !== undefined) {
    conditions.push(eq(productos.categoria_id, query.categoria_id));
  }
  if (query.sexo_id !== undefined) {
    conditions.push(eq(productos.sexo_id, query.sexo_id));
  }
  if (query.marca_id !== undefined) {
    conditions.push(eq(productos.marca_id, query.marca_id));
  }
  if (query.tipo_id !== undefined) {
    conditions.push(eq(productos.tipo_id, query.tipo_id));
  }

  const rows = await db
    .select({
      producto: productos,
      categoria: categorias,
      sexo: sexos,
      marca: marcas,
      tipo: tipos,
      imagen: producto_imagenes,
      talla: tallas,
      prod_talla: producto_tallas,
    })
    .from(productos)
    .leftJoin(categorias, eq(productos.categoria_id, categorias.id))
    .leftJoin(sexos, eq(productos.sexo_id, sexos.id))
    .leftJoin(marcas, eq(productos.marca_id, marcas.id))
    .leftJoin(tipos, eq(productos.tipo_id, tipos.id))
    .leftJoin(producto_imagenes, eq(productos.id, producto_imagenes.producto_id))
    .leftJoin(producto_tallas, eq(productos.id, producto_tallas.producto_id))
    .leftJoin(tallas, eq(producto_tallas.talla_id, tallas.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .all();

  // Agrupar por producto.id
  const productosMap = new Map<number, any>();

  for (const row of rows) {
    const { producto, categoria, sexo, marca, tipo, imagen, talla, prod_talla } = row;

    if (!productosMap.has(producto.id)) {
      productosMap.set(producto.id, {
        ...producto,
        categoria,
        sexo,
        marca,
        tipo,
        imagenes: [],
        tallas: new Map<number, { id: number; valor: string; tipo: string }>(),
      });
    }

    const current = productosMap.get(producto.id);

    if (imagen?.url && !current.imagenes.includes(imagen.url)) {
      current.imagenes.push(imagen.url);
    }

    if (talla && prod_talla) {
      current.tallas.set(talla.id, {
        id: talla.id,
        valor: talla.valor,
        tipo: talla.tipo,
      });
    }
  }

  // Convertimos los Maps a arreglos
  const results = Array.from(productosMap.values()).map((prod) => ({
    ...prod,
    tallas: Array.from(prod.tallas.values()),
  }));

  return c.json(results);
};