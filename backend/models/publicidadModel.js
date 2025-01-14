const mongoose = require('mongoose');

const publicidadSchema = new mongoose.Schema({
    nombreEmpresa: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    fechaYHora: {
        type: Date,
        required: true
    },
    categoria: {
        type: String,
        enum: ['top', 'head', 'heroe', 'aside', 'body', 'footer'],
        required: true
    },
    prioridad: {
        type: String,
        enum: ['sin', 'baja', 'media', 'alta', 'maxima'],
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        required: true
    },
    userUid: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Publicidad = mongoose.model('Publicidad', publicidadSchema);

module.exports = Publicidad;
