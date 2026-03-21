# T38 - Proyectos de clase

Repositorio que agrupa los proyectos desarrollados durante el periodo universitario para la clase de **Desarrollo de Aplicaciones Web I**. Incluye ejercicios introductorios con Node.js y Express, ejemplos de persistencia en archivos JSON, prácticas de asincronía y una solución full stack compuesta por backend en Express y frontend en Angular.

## Tecnologías utilizadas

- Node.js
- Express
- Angular
- JavaScript
- MySQL
- HTML y SCSS

## Estructura del repositorio

| Proyecto | Tipo | Descripción |
| --- | --- | --- |
| `MiPrimerProyecto` | Backend Express | API básica para gestión de usuarios en memoria. |
| `PersistenciaConJson` | Backend Express | API de productos con persistencia en archivo JSON. |
| `EjemploAsincronia` | Backend Express | API con lectura y escritura asíncrona de archivos JSON. |
| `PautaExamenI` | Backend Express | Ejercicio de examen para registrar libros en memoria. |
| `LibreriaConBD` | Backend Express + MySQL | API con autenticación JWT y consultas a base de datos. |
| `T38-frontend` | Frontend Angular | Cliente web que consume el backend de `LibreriaConBD`. |

## Requisitos generales

Antes de compilar o ejecutar cualquier proyecto, tener instalado:

- Node.js 18 o superior
- npm 9 o superior
- MySQL 8 o superior, solo para `LibreriaConBD`
- Angular CLI opcional. En este repositorio puede usarse `npm start` sin instalar Angular globalmente

La instalación de dependencias se realiza por proyecto, ya que cada carpeta tiene su propio `package.json`.

## Proyectos

### 1. MiPrimerProyecto

Ejemplo introductorio de una API REST con Express. Los datos se almacenan en memoria, por lo que se reinician al apagar el servidor.

**Funcionalidades**

- Listar usuarios con `GET /usuarios`
- Registrar usuarios con `POST /usuarios`
- Actualizar usuarios con `PUT /usuarios/:nombre`
- Eliminar usuarios con `DELETE /usuarios/:usuario`

**Cómo ejecutar**

```bash
cd MiPrimerProyecto
npm install
node app.js
```

Servidor disponible en `http://localhost:3000`.

### 2. PersistenciaConJson

Proyecto de Express que introduce persistencia local mediante el archivo `productos.json`.

**Funcionalidades**

- Listar productos almacenados en archivo con `GET /productos`
- Registrar nuevos productos con `POST /productos`
- Base preparada para completar `PUT` y `DELETE`
- Uso de `fs.readFileSync` y `fs.writeFileSync` para lectura y escritura del JSON

**Cómo ejecutar**

```bash
cd PersistenciaConJson
npm install
node app.js
```

Servidor disponible en `http://localhost:3000`.

### 3. EjemploAsincronia

Ejemplo de APIs REST usando operaciones asíncronas con `fs/promises` y manejo de rutas con `path`.

**Funcionalidades**

- Listar productos desde `data/productos.json` con `GET /productos`
- Registrar productos con `POST /productos`
- Listar fabricantes desde `data/fabricantes.json` con `GET /fabricantes`
- Base preparada para completar operaciones `PUT` y `DELETE` para productos y fabricantes
- Demostración de lectura y escritura asíncrona de archivos JSON

**Cómo ejecutar**

```bash
cd EjemploAsincronia
npm install
node app.js
```

Servidor disponible en `http://localhost:3000`.

### 4. PautaExamenI

Ejercicio de evaluación enfocado en la creación de una API sencilla para libros.

**Funcionalidades**

- Listar libros con `GET /libros`
- Registrar libros con `POST /libros`
- Validación básica de campos requeridos
- Manejo de datos en memoria

**Cómo ejecutar**

```bash
cd PautaExamenI
npm install
node app.js
```

Servidor disponible en `http://localhost:3000`.

### 5. LibreriaConBD

Backend principal del repositorio. Aunque en la solicitud se menciona `LibreriaBD`, en este repositorio la carpeta se encuentra como `LibreriaConBD`. Este proyecto trabaja con Express, MySQL, JWT y `bcrypt`.

**Funcionalidades**

- Inicio de sesión con `POST /api/login`
- Generación de token JWT para proteger rutas
- Consulta de usuarios con `GET /api/usuario`
- Consulta de libros con `GET /api/libros`
- Consulta de libros por autor con `GET /api/libros/:AutorId`
- Registro de libros en base de datos con `POST /api/libros`
- Script SQL de creación de base de datos en `LibreriaConBD/sql/DDL.sql`

**Variables de entorno requeridas**

Crear un archivo `.env` dentro de `LibreriaConBD` con valores como los siguientes:

```env
PORT=3000
JWT_SECRET_KEY=tu_clave_secreta
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=Libreria
```

**Preparación de base de datos**

1. Crear la base de datos ejecutando el script `LibreriaConBD/sql/DDL.sql`.
2. Verificar que MySQL esté activo.
3. Confirmar que las credenciales del `.env` coincidan con la instancia local.

**Cómo ejecutar**

```bash
cd LibreriaConBD
npm install
node app.js
```

Servidor disponible en `http://localhost:3000`.

### 6. T38-frontend

Frontend desarrollado con Angular. Este proyecto funciona como cliente del backend `LibreriaConBD`, por lo que ambos deben ejecutarse juntos para probar el flujo principal.

**Funcionalidades**

- Pantalla de inicio de sesión
- Consumo de `POST /api/login`
- Almacenamiento del token en `localStorage`
- Navegación protegida visualmente mediante menú luego del inicio de sesión
- Consulta y visualización de usuarios desde `GET /api/usuario`
- Pantallas base para `home`, `product`, `vehiculos` y `fabricante`

**Cómo compilar**

```bash
cd T38-frontend
npm install
npm run build
```

El resultado de compilación se genera en `dist/`.

**Cómo ejecutar en desarrollo**

```bash
cd T38-frontend
npm install
npm start
```

Aplicación disponible en `http://localhost:4200`.

## Solución full stack: LibreriaConBD + T38-frontend

Estos dos proyectos forman una sola aplicación:

- `LibreriaConBD` es el backend con Express, autenticación JWT y acceso a MySQL.
- `T38-frontend` es el frontend Angular que consume las APIs del backend.

### Orden recomendado para levantar la solución

1. Iniciar MySQL.
2. Crear la base de datos con `LibreriaConBD/sql/DDL.sql`.
3. Configurar el archivo `.env` en `LibreriaConBD`.
4. Levantar el backend:

```bash
cd LibreriaConBD
npm install
node app.js
```

5. En otra terminal, levantar el frontend:

```bash
cd T38-frontend
npm install
npm start
```

6. Abrir `http://localhost:4200`.

## Observaciones

- La mayoría de proyectos backend usan el puerto `3000`, por lo que deben ejecutarse uno a la vez.
- Algunos proyectos contienen endpoints o pantallas base pendientes de completar como parte de la práctica académica.
- `T38-frontend` depende de que el backend esté disponible en `http://localhost:3000/api`.
