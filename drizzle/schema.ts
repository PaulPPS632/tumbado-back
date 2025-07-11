import { sql } from 'drizzle-orm'
import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core'

//
// Tabla de Productos
//
export const productos = sqliteTable('productos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  precio_anterior: real('precio_anterior').notNull(),
  precio: real('precio').notNull(),
  isdescuento: integer('isdescuento').notNull(), // 0 o 1
  descuento: real('descuento').notNull(),
  stock: integer('stock').notNull(),
  stock_minimo: integer('stock_minimo').notNull(),
  imagen: text('imagen').notNull(),
  categoria_id: integer('categoria_id').notNull(),
  sexo_id: integer('sexo_id').notNull(),
  marca_id: integer('marca_id').notNull(),
  tipo_id: integer('tipo_id').notNull(),
  activo: integer('activo').default(1),
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla de Imagenes de Productos
//
export const producto_imagenes = sqliteTable('producto_imagenes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  producto_id: integer('producto_id').notNull(),
  url: text('url').notNull(),
  orden: integer('orden').default(0) // útil para mostrar en cierto orden
})


//
// Tabla de Sexos
//
export const sexos = sqliteTable('sexos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  activo: integer('activo').default(1),
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla de Categorías
//
export const categorias = sqliteTable('categorias', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  activo: integer('activo').default(1),
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla de Marcas
//
export const marcas = sqliteTable('marcas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  activo: integer('activo').default(1),
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla de Flyers (promocionales)
//
export const flyers = sqliteTable('flyers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  url_imagen: text('url_imagen').notNull(),
  link: text('link').notNull(),
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla de Primer Usuario (leads)
//
export const primer_usuario = sqliteTable('primer_usuario', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  numero_telefono: text('numero_telefono').notNull(),
  distrito: text('distrito').notNull(),
  registrado: integer('registrado').default(0), // 0 = pendiente, 1 = registrado/contactado
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla base de Medidas (tallas disponibles globales)
//
export const medidas_base = sqliteTable('medidas_base', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  valor: text('valor').notNull(), // Ejemplo: "S", "M", "L", "38", "39", etc.
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla intermedia entre productos y medidas
//
export const producto_medidas = sqliteTable('producto_medidas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  producto_id: integer('producto_id').notNull(),   // FK lógica a productos
  medida_id: integer('medida_id').notNull(),       // FK lógica a medidas_base
  stock: integer('stock').notNull(),
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})

//
// Tabla de Tipos
//
export const tipos = sqliteTable('tipos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  activo: integer('activo').default(1),
  created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(STRFTIME('%s', 'now')*1000)`)
})
