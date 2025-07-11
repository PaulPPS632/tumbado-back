import { Hono } from 'hono'
import type { Env } from '../app'
import { createMarca, getAllMarcas } from '../controllers/MarcaController'

const marcasRoutes = new Hono<Env>()

marcasRoutes.get('/', getAllMarcas)
marcasRoutes.post('/', createMarca)

export default marcasRoutes
