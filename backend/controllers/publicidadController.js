const { db } = require('../../database/firebaseconfig');

// Crear nueva publicidad
const crearPublicidad = async (req, res) => {
    try {
        const nuevaPublicidad = {
            ...req.body,
            userUid: req.user.uid
        };
        const docRef = await db.collection('publicidades').add(nuevaPublicidad);
        res.status(201).json({ id: docRef.id, ...nuevaPublicidad });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las publicidades
const obtenerPublicidades = async (req, res) => {
    try {
        const snapshot = await db.collection('publicidades').get();
        const publicidades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(publicidades);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener publicidad por ID
const obtenerPublicidadPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection('publicidades').doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Publicidad no encontrada' });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener publicidades por estado
const obtenerPublicidadesPorEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        const snapshot = await db.collection('publicidades').where('estado', '==', estado).get();
        const publicidades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(publicidades);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener publicidades por categoria
const obtenerPublicidadesPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const snapshot = await db.collection('publicidades').where('categoria', '==', categoria).get();
        const publicidades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(publicidades);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener publicidades por prioridad
const obtenerPublicidadesPorPrioridad = async (req, res) => {
    try {
        const { prioridad } = req.params;
        const snapshot = await db.collection('publicidades').where('prioridad', '==', prioridad).get();
        const publicidades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(publicidades);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar publicidad
const editarPublicidad = async (req, res) => {
    try {
        const { id } = req.params;
        const publicidadActualizada = req.body;
        await db.collection('publicidades').doc(id).update(publicidadActualizada);
        res.status(200).json({ id, ...publicidadActualizada });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Archivar publicidad
const archivarPublicidad = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('publicidades').doc(id).update({ estado: 'inactivo' });
        res.status(200).json({ id, estado: 'inactivo' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar publicidad
const eliminarPublicidad = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('publicidades').doc(id).delete();
        res.status(200).json({ message: 'Publicidad eliminada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    crearPublicidad,
    obtenerPublicidades,
    obtenerPublicidadPorId,
    obtenerPublicidadesPorEstado,
    obtenerPublicidadesPorCategoria,
    obtenerPublicidadesPorPrioridad,
    editarPublicidad,
    archivarPublicidad,
    eliminarPublicidad
};
