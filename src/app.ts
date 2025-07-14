import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { D1Database } from '@cloudflare/workers-types'

// Rutas
import productosRoutes from './routes/ProductoRoutes'
import marcasRoutes from './routes/MarcaRoutes'
import categoriasRoutes from './routes/CategoriaRoutes'
import sexosRoutes from './routes/SexoRoutes'
import tiposRoutes from './routes/TipoRoutes'
import tallasRoutes from './routes/TallasRoutes'

export type Env = {
  Bindings: {
    DB: D1Database
  }
}

export const createApp = () => {
  const app = new Hono<Env>()
  app.use(cors())

  // Registrar rutas principales
  app.route('/productos', productosRoutes)
  app.route('/marcas', marcasRoutes)
  app.route('/categorias', categoriasRoutes)
  app.route('/sexos', sexosRoutes)
  app.route('/tipos', tiposRoutes)
  app.route('/tallas', tallasRoutes)
  return app
}
