# 📦 Sistema de Inventario Full Stack

Este repositorio consiste en un sistema de inventario para una prueba tecnica
el cual utiliza docker para el frontend, para el backend y para la base de datos

## 🚀 Stack Tecnológico

*   **Backend:** Java 17 y Spring Boot 3.x.
*   **Frontend:** React 18.
*   **Base de Datos:** PostgreSQL
*   **Contenedores:** Docker

## 📁 Estructura del Proyecto

*   `sistema_inventario_api/`: Backend desarrollado con Spring Boot y arquitectura en capas.
*   `sistema_inventario_web/`: Frontend desarrollado con React 
*   `sql/`: Scripts de inicialización de la base de datos con datos de prueba.

# 📦 GUÍA DE COMANDOS DE DOCKER PARA EL SISTEMA DE INVENTARIO

## 📝 Notas Previas
⚠️Extremadamente Importante

- Los comandos para la base de datos se ingresan desde el **CMD**.
- Los comandos para el backend con **Spring Boot**  se ingresan desde el directorio raiz de  `sistema_inventario_api/` usando el **CMD**. 
- Los comandos para el frontend con **React** se ingresan desde el directorio raiz de  `sistema_inventario_web/` usando el **CMD**.

---

# 🗄️ 1. COMANDOS BASE DE DATOS PostgreSQL



---
⚠️ Muy Importante:  se tiene que copiar la ruta donde esta el archivo ComandosSqlConRegistros.sql para asignarlo con el set

El archivo ComandosSqlConRegistros.sql  crea las tablas y los registros de pruebas en la base de datos PostgreSQL
en mi caso lo puse en el directorio raiz de mi laptop.

este archivo cuenta con 10 productos de prueba y 10 movimientos de inventarios de prueba



##  ✅ PASO 1 — Asignar en una variable la ruta donde esta el ComandosSqlConRegistros.sql

```cmd

set RUTA_SQL=C:\sql\ComandosSqlConRegistros.sql

```


## ✅ PASO 2 — Crear la base de datos PostgreSQL en Docker

```cmd


docker run --name bd_sistema_inventario ^
  -e POSTGRES_PASSWORD=12345678 ^
  -e POSTGRES_DB=BD_sistema_inventario ^
  -v "%RUTA_SQL%:/docker-entrypoint-initdb.d/init.sql" ^
  -p 5432:5432 ^
  -d postgres


```

---

# ☕ 2. COMANDOS BACKEND Spring Boot


---

## ✅ PASO 1 — Crear la imagen de Docker

```cmd

docker build -t sistema-inventario-api .

```

---

## ✅ PASO 2 — Consultar la lista de imágenes para verificar que se creó (Optativo)

```cmd

docker images

```

---

## ✅ PASO 3 — Ejecutar el proyecto de Spring Boot usando la conexión explícita a Docker

```cmd

docker run -p 8080:8080 --name sistema-inventario-backend ^
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/BD_sistema_inventario ^
  -e SPRING_DATASOURCE_USERNAME=postgres ^
  -e SPRING_DATASOURCE_PASSWORD=12345678 ^
  sistema-inventario-api

```

---

## ✅ PASO 4 — Detener contenedor

```cmd

docker rm -f sistema-inventario-api

```

---

# 🌐 3. COMANDOS FRONTEND

---

## ✅ PASO 1 — Crear la imagen del frontend

```cmd

docker build -t sistema-inventario-web .

```

---

## ✅ PASO 2 — Consultar las imágenes (Optativo)

```cmd

docker images

```

---

## ✅ PASO 3 — Ejecutar el contenedor del frontend

```cmd

docker run -p 5173:5173 --name sistema-inventario-frontend sistema-inventario-web

```

---

## ✅ PASO 4 — Detener contenedor

```cmd
docker rm -f sistema-inventario-frontend
```

---

