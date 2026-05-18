// Rutas CRUD para la entidad cliente
const express = require('express');
const router  = express.Router();
const db      = require('./database');

// GET /clientes - Obtener todos los clientes
router.get('/', (req, res) => {
  const clientes = db.prepare('SELECT * FROM cliente').all();
  res.status(200).json(clientes);
});

// GET /clientes/:id - Obtener un cliente por ID
router.get('/:id', (req, res) => {
  const cliente = db.prepare('SELECT * FROM cliente WHERE id_cliente = ?').get(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
  res.status(200).json(cliente);
});

// POST /clientes - Crear un nuevo cliente
router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email) return res.status(400).json({ error: 'Nombre y email son obligatorios' });

  // Verificar email duplicado
  const existe = db.prepare('SELECT id_cliente FROM cliente WHERE email = ?').get(email);
  if (existe) return res.status(409).json({ error: 'El email ya está registrado' });

  const result = db.prepare(
    'INSERT INTO cliente (nombre, email, telefono) VALUES (?, ?, ?)'
  ).run(nombre, email, telefono || null);

  res.status(201).json({ id_cliente: result.lastInsertRowid, nombre, email, telefono });
});

// PUT /clientes/:id - Actualizar un cliente
router.put('/:id', (req, res) => {
  const { nombre, email, telefono } = req.body;
  const cliente = db.prepare('SELECT * FROM cliente WHERE id_cliente = ?').get(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

  db.prepare(
    'UPDATE cliente SET nombre = ?, email = ?, telefono = ? WHERE id_cliente = ?'
  ).run(nombre || cliente.nombre, email || cliente.email, telefono || cliente.telefono, req.params.id);

  res.status(200).json({ mensaje: 'Cliente actualizado correctamente' });
});

// DELETE /clientes/:id - Eliminar un cliente
router.delete('/:id', (req, res) => {
  const cliente = db.prepare('SELECT * FROM cliente WHERE id_cliente = ?').get(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

  db.prepare('DELETE FROM cliente WHERE id_cliente = ?').run(req.params.id);
  res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
});

module.exports = router;