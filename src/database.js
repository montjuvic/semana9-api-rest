// conexion y configuración de la base de datos SQLite
const Database = require('better-sqlite3');

const db = new Database('clientes.db');

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre     VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    telefono   VARCHAR(20),
    created_at DATETIME DEFAULT (datetime('now'))
  )
`);

module.exports = db;