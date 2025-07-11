import { Hono } from 'hono'
import type { Env } from '../app'
import { createSexo, getAllSexos } from '../controllers/SexoController'

const sexosRoutes = new Hono<Env>()

sexosRoutes.get('/', getAllSexos)
sexosRoutes.post('/', createSexo)

export default sexosRoutes
