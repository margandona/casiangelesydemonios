const { admin, db } = require('../../database/firebaseconfig');

const submitForm = async (req, res) => {
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
};

module.exports = { submitForm };
