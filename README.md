# semana9-api-rest
API REST con Node.js, Express y SQLite – Taller de plataformas web

# API REST - Clientes | Semana 9

API REST desarrollada con Node.js, Express y SQLite que implementa operaciones CRUD sobre la entidad `cliente`.

## Requisitos

- Node.js v18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución

```bash
node index.js
```

La API quedará disponible en `http://localhost:3000`

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /clientes | Obtener todos los clientes |
| GET | /clientes/:id | Obtener cliente por ID |
| POST | /clientes | Crear nuevo cliente |
| PUT | /clientes/:id | Actualizar cliente |
| DELETE | /clientes/:id | Eliminar cliente |

## Seguridad

Todas las consultas utilizan parámetros preparados para prevenir inyección SQL.

## Pruebas

Importar el archivo `postman_collection.json` en Postman para ejecutar todas las pruebas.