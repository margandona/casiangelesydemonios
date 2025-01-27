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
const functions = require('firebase-functions'); // Import Firebase functions

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
const allowedOrigins = [
  'https://casiangelesydemonios.firebaseapp.com',
  'https://casiangelesydemonios.web.app',
  'https://www.sexyangeles.cl',
  'http://localhost:3000',
  'http://127.0.0.1:5501'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir métodos HTTP específicos
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir encabezados específicos
};

// Middleware
app.use(cors(corsOptions)); // Usa el middleware cors con las opciones configuradas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Use form routes
app.use('/api', formRoutes);

// Use user routes
app.use('/api', userRoutes);

// Use auth routes
app.use('/api/auth', authRoutes);

// Use message routes
app.use('/api', messageRoutes);

// Use publicidad routes
app.use('/api/publicidad', publicidadRoutes);

// Use report routes
app.use('/api/reports', reportRoutes); // Ensure the correct path for report routes

// Use Firebase functions routes
const functionsRoutes = require('./functions/index');
app.use('/api/functions', functionsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app for Firebase functions
module.exports = app;