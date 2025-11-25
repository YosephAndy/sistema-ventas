const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const clientesRoutes = require('./routes/clientes.routes');
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const ventasRoutes = require('./routes/ventas.routes');

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ventas', ventasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});