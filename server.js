require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const formRoutes = require('./backend/rutas/formRoutes'); // Importa las rutas del formulario
const userRoutes = require('./backend/rutas/userRoutes'); // Importa las rutas de usuarios
const authRoutes = require('./backend/rutas/authRoutes'); // Importa las rutas de autenticación

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
