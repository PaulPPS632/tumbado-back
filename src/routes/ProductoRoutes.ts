import { Hono } from 'hono'
import { getAllProductos, createProducto, getproductosbycategoria, updateProducto } from '../controllers/ProductoController'
import type { Env } from '../app'

const productosRoutes = new Hono<Env>()

productosRoutes.get('/', getAllProductos)
productosRoutes.post('/', createProducto)
productosRoutes.put('/:id', updateProducto)
productosRoutes.get('/categoria/:id', getproductosbycategoria)
export default productosRoutes
