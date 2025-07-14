-- --------------------------------------------------
-- 1. Sexos
-- --------------------------------------------------
INSERT INTO sexos (id, nombre, activo, created_at) VALUES
  (1, 'Hombre', 1, STRFTIME('%s','now')*1000),
  (2, 'Mujer',   1, STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 2. Categorías
-- --------------------------------------------------
INSERT INTO categorias (id, nombre, activo, created_at) VALUES
  (1, 'Camisetas', 1, STRFTIME('%s','now')*1000),
  (2, 'Pantalones',1, STRFTIME('%s','now')*1000),
  (3, 'Zapatos',   1, STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 3. Marcas
-- --------------------------------------------------
INSERT INTO marcas (id, nombre, activo, created_at) VALUES
  (1, 'Nike',     1, STRFTIME('%s','now')*1000),
  (2, 'Adidas',   1, STRFTIME('%s','now')*1000),
  (3, 'Puma',     1, STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 4. Tipos (de producto)
-- --------------------------------------------------
INSERT INTO tipos (id, nombre, activo, created_at) VALUES
  (1, 'Deportivo', 1, STRFTIME('%s','now')*1000),
  (2, 'Casual',    1, STRFTIME('%s','now')*1000),
  (3, 'Formal',    1, STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 5. Tallas
-- --------------------------------------------------
INSERT INTO tallas (id, valor, tipo, activo, created_at) VALUES
  -- Vestimenta
  (1, 'S', 'vestimenta', 1, STRFTIME('%s','now')*1000),
  (2, 'M', 'vestimenta', 1, STRFTIME('%s','now')*1000),
  (3, 'L', 'vestimenta', 1, STRFTIME('%s','now')*1000),
  -- Calzado
  (4, '38', 'calzado',   1, STRFTIME('%s','now')*1000),
  (5, '39', 'calzado',   1, STRFTIME('%s','now')*1000),
  (6, '40', 'calzado',   1, STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 6. Productos
-- --------------------------------------------------
INSERT INTO productos (
  id, nombre, precio_anterior, precio, isdescuento, descuento,
  stock, stock_minimo, imagen, categoria_id, sexo_id, marca_id,
  tipo_id, activo, created_at
) VALUES
  (1, 'Camiseta Deportiva', 29.99, 24.99, 1, 5.00,  50, 5,
   'https://tus3bucket.com/img/camiseta1.jpg', 1, 1, 1, 1, 1, STRFTIME('%s','now')*1000),
  (2, 'Pantalón Casual',    49.99, 49.99, 0, 0.00, 100, 10,
   'https://tus3bucket.com/img/pantalon1.jpg', 2, 2, 2, 2, 1, STRFTIME('%s','now')*1000),
  (3, 'Zapatillas Running', 89.99, 79.99, 1, 10.00,  30, 3,
   'https://tus3bucket.com/img/zapatillas1.jpg', 3, 1, 1, 1, 1, STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 7. Imágenes de Productos
-- --------------------------------------------------
INSERT INTO producto_imagenes (id, producto_id, url, orden) VALUES
  (1, 1, 'https://tus3bucket.com/img/camiseta1-1.jpg', 0),
  (2, 1, 'https://tus3bucket.com/img/camiseta1-2.jpg', 1),
  (3, 2, 'https://tus3bucket.com/img/pantalon1-1.jpg', 0),
  (4, 3, 'https://tus3bucket.com/img/zapatillas1-1.jpg', 0),
  (5, 3, 'https://tus3bucket.com/img/zapatillas1-2.jpg', 1);

-- --------------------------------------------------
-- 8. Producto ↔ Tallas (stock por talla)
-- --------------------------------------------------
INSERT INTO producto_tallas (id, producto_id, talla_id, stock, created_at) VALUES
  -- Camiseta Deportiva: S, M, L
  (1, 1, 1, 20, STRFTIME('%s','now')*1000),
  (2, 1, 2, 15, STRFTIME('%s','now')*1000),
  (3, 1, 3, 15, STRFTIME('%s','now')*1000),
  -- Zapatillas Running: 38, 39, 40
  (4, 3, 4, 10, STRFTIME('%s','now')*1000),
  (5, 3, 5, 10, STRFTIME('%s','now')*1000),
  (6, 3, 6, 10, STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 9. Usuarios de prueba
-- --------------------------------------------------
-- INSERT INTO usuarios (id, nombre, numero_telefono, distrito, email, password, created_at) VALUES
  -- (1, 'Paul Perez',  '999111222', 'Miraflores', 'paul@example.com', 'hashedpassword1', STRFTIME('%s','now')*1000),
  -- (2, 'Ana Gómez',   '999333444', 'San Isidro',  'ana@example.com',  'hashedpassword2', STRFTIME('%s','now')*1000);

-- --------------------------------------------------
-- 10. Opcional: Leads (primer_usuario)
-- --------------------------------------------------
-- INSERT INTO primer_usuario (id, nombre, numero_telefono, distrito, registrado, created_at) VALUES
  -- (1, 'Juan López', '987654321', 'Barranco', 0, STRFTIME('%s','now')*1000);
