// Punto de entrada de la API REST
const express = require('express');
const app     = express();
const PORT    = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
const clientesRouter = require('./src/clientes');
app.use('/clientes', clientesRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'API REST funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});