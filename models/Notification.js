const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
      type: String,
      required: true,
      enum: ['registro de paciente', 'mensaje', 'carga examen de laboratorio'] // Enum para tipos de notificaciones
  },
  receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  status: {
      type: Number,
      required: true
  },
  text: {
      type: String,
      required: true
  },
  message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mensajes',
      required: false
  },
  paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pacientes',
      required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
