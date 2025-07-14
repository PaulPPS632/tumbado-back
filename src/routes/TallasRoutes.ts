import { Hono } from 'hono'
import type { Env } from '../app'
import { createTalla, getAllTallas, bindTallaToProducto } from '../controllers/TallasController'

const tallasRoutes = new Hono<Env>()

tallasRoutes.get('/', getAllTallas)
tallasRoutes.post('/', createTalla)
tallasRoutes.post('/bindProducto', bindTallaToProducto)
export default tallasRoutes
