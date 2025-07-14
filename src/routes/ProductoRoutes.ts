import { Hono } from "hono";
import {
  getAllProductos,
  createProducto,
  getproductosbycategoria,
  updateProducto,
  getById,
  addImageByProducto,
  ImagenesByProducto,
  deleteImageById,
  searchProductos,
} from "../controllers/ProductoController";
import type { Env } from "../app";

const productosRoutes = new Hono<Env>();

productosRoutes.get("/", getAllProductos);
productosRoutes.post("/", createProducto);
productosRoutes.put("/:id", updateProducto);
productosRoutes.get("/categoria/:id", getproductosbycategoria);
productosRoutes.get("/:id", getById);
productosRoutes.get("/:id/image", ImagenesByProducto);
productosRoutes.post("/search", searchProductos);
productosRoutes.post("/:id/image", addImageByProducto);
productosRoutes.delete("/productoimage/:id", deleteImageById);
export default productosRoutes;
