-- SQL para init.sql
-- La base de datos se crea mediante variables de entorno en Docker

-- Limpiar tablas si existen (respetando el orden por las llaves foráneas)
DROP TABLE IF EXISTS movimientos;
DROP TABLE IF EXISTS productos;

-- Creación de la tabla de productos
CREATE TABLE productos (
    sku VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock_actual INTEGER NOT NULL DEFAULT 0,
    stock_minimo INTEGER NOT NULL DEFAULT 0
);

-- Creación de la tabla de movimientos
CREATE TABLE movimientos (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    tipo VARCHAR(20) NOT NULL, -- 'Entrada' o 'Salida'
    cantidad INTEGER NOT NULL,
    stock_resultante INTEGER NOT NULL,
    producto_sku VARCHAR(50) NOT NULL, -- Ajustado a 50 para coincidir con productos.sku
    CONSTRAINT fk_producto 
        FOREIGN KEY (producto_sku) 
        REFERENCES productos(sku)
        ON DELETE CASCADE
);

-- Insertar catálogo inicial de productos
INSERT INTO productos (sku, nombre, precio, stock_actual, stock_minimo) VALUES
('PROD-2026-0000001', 'Laptop Gaming Asus', 1250.00, 0, 5),
('PROD-2026-0000002', 'Monitor LG 27 pulgadas', 280.50, 0, 8),
('PROD-2026-0000003', 'Teclado Mecanico RGB', 85.00, 0, 10),
('PROD-2026-0000004', 'Mouse Inalambrico Pro', 45.99, 0, 15),
('PROD-2026-0000005', 'Auriculares HyperX Cloud', 95.00, 0, 10),
('PROD-2026-0000006', 'Silla Ergonomica Pro', 210.00, 0, 4),
('PROD-2026-0000007', 'Disco Duro Externo 2TB', 75.00, 0, 7),
('PROD-2026-0000008', 'Memoria RAM 16GB DDR4', 65.25, 0, 12),
('PROD-2026-0000009', 'Procesador Intel i7-13th', 380.00, 0, 3),
('PROD-2026-0000010', 'Placa Base ATX Z790', 245.00, 0, 2);

-- Insertar movimientos de prueba
INSERT INTO movimientos (fecha, tipo, cantidad, stock_resultante, producto_sku) VALUES
(CURRENT_DATE, 'Entrada', 5, 20, 'PROD-2026-0000001'), 
(CURRENT_DATE, 'Entrada', 10, 30, 'PROD-2026-0000002'), 
(CURRENT_DATE, 'Entrada', 15, 60, 'PROD-2026-0000003'), 
(CURRENT_DATE, 'Entrada', 20, 80, 'PROD-2026-0000004'),
(CURRENT_DATE, 'Entrada', 5, 35, 'PROD-2026-0000005'),  
(CURRENT_DATE, 'Entrada', 3, 15, 'PROD-2026-0000006'),  
(CURRENT_DATE, 'Entrada', 10, 35, 'PROD-2026-0000007'), 
(CURRENT_DATE, 'Entrada', 10, 50, 'PROD-2026-0000008'), 
(CURRENT_DATE, 'Entrada', 2, 12, 'PROD-2026-0000009'), 
(CURRENT_DATE, 'Entrada', 4, 12, 'PROD-2026-0000010'); 

-- Actualización manual del stock_actual en productos basada en los movimientos anteriores
UPDATE productos SET stock_actual = 20 WHERE sku = 'PROD-2026-0000001';
UPDATE productos SET stock_actual = 30 WHERE sku = 'PROD-2026-0000002';
UPDATE productos SET stock_actual = 60 WHERE sku = 'PROD-2026-0000003';
UPDATE productos SET stock_actual = 80 WHERE sku = 'PROD-2026-0000004';
UPDATE productos SET stock_actual = 35 WHERE sku = 'PROD-2026-0000005';
UPDATE productos SET stock_actual = 15 WHERE sku = 'PROD-2026-0000006';
UPDATE productos SET stock_actual = 35 WHERE sku = 'PROD-2026-0000007';
UPDATE productos SET stock_actual = 50 WHERE sku = 'PROD-2026-0000008';
UPDATE productos SET stock_actual = 12 WHERE sku = 'PROD-2026-0000009';
UPDATE productos SET stock_actual = 12 WHERE sku = 'PROD-2026-0000010';