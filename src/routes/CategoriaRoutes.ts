import { Hono } from 'hono'
import type { Env } from '../app'
import { createCategoria, getAllCategorias } from '../controllers/CategoriaController'

const categoriasRoutes = new Hono<Env>()

categoriasRoutes.get('/', getAllCategorias)
categoriasRoutes.post('/', createCategoria)
export default categoriasRoutes
