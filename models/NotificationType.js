const mongoose = require('mongoose');

const notificationTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['registro de paciente', 'mensaje', 'carga examen de laboratorio'],
    unique: true
  },
  description: String // Descripción opcional del tipo de notificación
});

module.exports = mongoose.model('NotificationType', notificationTypeSchema);
