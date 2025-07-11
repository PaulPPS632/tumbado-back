import { Hono } from 'hono'
import type { Env } from '../app'
import { createTipo, getAllTipos } from '../controllers/TipoController'

const tiposRoutes = new Hono<Env>()
tiposRoutes.get('/', getAllTipos)
tiposRoutes.post('/', createTipo)

export default tiposRoutes
