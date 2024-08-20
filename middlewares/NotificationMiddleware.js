const Notification = require('../models/Notification');
const NotificationType = require('../models/NotificationType');
const User = require('../models/user');

// Middleware para crear una nueva notificación
exports.createNotification = async (req, res) => {
  try {
    const { type, receiver, status, text, message, paciente } = req.body;

    // Validar el tipo de notificación
    const notificationType = await NotificationType.findById(type);
    if (!notificationType) {
      return res.status(400).json({ message: 'Tipo de notificación no válido' });
    }

    // Validar el receptor
    const user = await User.findById(receiver);
    if (!user) {
      return res.status(400).json({ message: 'Receptor no válido' });
    }

    const newNotification = new Notification({
      type,
      receiver,
      status,
      text, message, paciente
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware para obtener todas las notificaciones
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('type').populate('receiver');
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware para obtener una notificación por ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate('type').populate('receiver');
    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware para actualizar una notificación
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('type').populate('receiver');
    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware para eliminar una notificación
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    res.status(200).json({ message: 'Notificación eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
