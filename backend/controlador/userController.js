const { admin, db } = require('../../database/firebaseconfig');

const isAdmin = async (uid) => {
  const userDoc = await db.collection('users').doc(uid).get();
  return userDoc.exists && userDoc.data().role === 'admin';
};

const createUser = async (req, res) => {
  const { email, password, role = 'user', name, birthdate } = req.body;
  const { uid, role: requesterRole } = req.user;

  if (requesterRole !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const userData = {
      email,
      role,
      name,
      birthdate,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    res.status(201).json({ uid: userRecord.uid, ...userData });
  } catch (error) {
    console.error('Error al crear el usuario:', error.message);
    res.status(500).send(`Error al crear el usuario: ${error.message}`);
  }
};

const getUser = async (req, res) => {
  const { uid } = req.params;
  const { role } = req.user;

  if (role !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error('Error al obtener el usuario:', error.message);
    res.status(500).send(`Error al obtener el usuario: ${error.message}`);
  }
};

const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { email, password, role, name, birthdate } = req.body;
  const { uid: requesterUid, role: requesterRole } = req.user;

  if (uid !== requesterUid && requesterRole !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }

  try {
    const updateData = {};
    if (email) {
      await admin.auth().updateUser(uid, { email });
      updateData.email = email;
    }
    if (password) {
      await admin.auth().updateUser(uid, { password });
    }
    if (role) {
      updateData.role = role;
    }
    if (name) {
      updateData.name = name;
    }
    if (birthdate) {
      updateData.birthdate = birthdate;
    }

    await db.collection('users').doc(uid).update(updateData);

    res.status(200).send('Usuario actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error.message);
    res.status(500).send(`Error al actualizar el usuario: ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  const { uid } = req.params;
  const { uid: requesterUid } = req.user;

  if (!await isAdmin(requesterUid)) {
    return res.status(403).send('Acceso denegado');
  }

  try {
    await admin.auth().deleteUser(uid);
    await db.collection('users').doc(uid).delete();

    res.status(200).send('Usuario eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el usuario:', error.message);
    res.status(500).send(`Error al eliminar el usuario: ${error.message}`);
  }
};

const getMe = async (req, res) => {
  const { uid } = req.user;

  try {
    console.log('Obteniendo datos del usuario:', uid);
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      console.log('Usuario no encontrado:', uid);
      return res.status(404).send('Usuario no encontrado');
    }

    console.log('Datos del usuario obtenidos:', userDoc.data());
    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error.message);
    res.status(500).send(`Error al obtener los datos del usuario: ${error.message}`);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    res.status(500).send(`Error al obtener los usuarios: ${error.message}`);
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser, getMe, getAllUsers };
