const { db } = require('../../database/firebaseconfig');

const submitForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const formData = {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    console.log('Submitting form data:', formData); // Add logging

    await db.collection('forms').add(formData);

    console.log('Form data submitted successfully'); // Add logging

    res.status(201).send('Formulario enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el formulario:', error.message);
    res.status(500).send(`Error al enviar el formulario: ${error.message}`);
  }
};

module.exports = { submitForm };
