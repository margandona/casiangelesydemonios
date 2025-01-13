const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const { admin, db } = require('./database/firebaseconfig'); // Importa la configuración de Firebase

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Usa el middleware cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Handle form submission
app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await db.collection('contactsCAD').add({
      name,
      email,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).send('Mensaje enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el mensaje: ', error);
    res.status(500).send('Error al enviar el mensaje');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
