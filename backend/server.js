require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const formRoutes = require('./backend/routes/formRoutes'); // Importa las rutas del formulario
const userRoutes = require('./backend/routes/userRoutes'); // Importa las rutas de usuarios
const authRoutes = require('./backend/routes/authRoutes'); // Importa las rutas de autenticación
const messageRoutes = require('./backend/routes/messageRoutes'); // Importa las rutas de mensajes
const publicidadRoutes = require('./backend/routes/publicidad'); // Importa las rutas de publicidad
const reportRoutes = require('./backend/routes/reportRoutes'); // Importa las rutas de reportes

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Usa el middleware cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Use form routes
app.use('/api', formRoutes);

// Use user routes
app.use('/api', userRoutes);

// Use auth routes
app.use('/api', authRoutes);

// Use message routes
app.use('/api', messageRoutes);

// Use publicidad routes
app.use('/api/publicidad', publicidadRoutes);

// Use report routes
app.use('/api', reportRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
