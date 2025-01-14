const { db } = require('../database/firebaseconfig');

const getMessages = async (req, res) => {
  try {
    const messagesSnapshot = await db.collection('forms').orderBy('submittedAt', 'desc').get();
    const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error.message);
    res.status(500).send(`Error al obtener los mensajes: ${error.message}`);
  }
};

const getMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const messageDoc = await db.collection('forms').doc(id).get();
    if (!messageDoc.exists) {
      return res.status(404).send('Mensaje no encontrado');
    }

    res.status(200).json({ id: messageDoc.id, ...messageDoc.data() });
  } catch (error) {
    console.error('Error al obtener el mensaje:', error.message);
    res.status(500).send(`Error al obtener el mensaje: ${error.message}`);
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('forms').doc(id).delete();
    res.status(200).send('Mensaje eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el mensaje:', error.message);
    res.status(500).send(`Error al eliminar el mensaje: ${error.message}`);
  }
};

const archiveMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('forms').doc(id).update({ archived: true });
    res.status(200).send('Mensaje archivado con éxito');
  } catch (error) {
    console.error('Error al archivar el mensaje:', error.message);
    res.status(500).send(`Error al archivar el mensaje: ${error.message}`);
  }
};

const prioritizeMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('forms').doc(id).update({ priority: true });
    res.status(200).send('Mensaje marcado como prioritario con éxito');
  } catch (error) {
    console.error('Error al marcar el mensaje como prioritario:', error.message);
    res.status(500).send(`Error al marcar el mensaje como prioritario: ${error.message}`);
  }
};

module.exports = { getMessages, getMessageById, deleteMessage, archiveMessage, prioritizeMessage };
