const Notification = require('../models/Notification');
const NotificationType = require('../models/NotificationType');
const User = require('../models/user');

exports.createNotification = async (req, res) => {
  try {
      const { type, receiver,sender, status, text , message, paciente} = req.body;

      // Validaciones simples
      if (!type || !receiver || !sender || status === undefined || !text) {
        return res.status(400).json({ message: 'Faltan datos en la solicitud' });
      }

      // Crear la notificación
      const newNotification = new Notification({
          type,
          receiver,
          sender,
          status,
          text, message, paciente
      });

      // Guardar en la base de datos
      await newNotification.save();

      res.status(201).json(newNotification);
  } catch (error) {
      console.error('Error al crear notificación:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('type').populate('receiver');
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.getNotificationsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ receiver: userId })
      .sort({ createdAt: -1 }) // Ordena por fecha en orden descendente
      .populate('type')
      .populate('receiver');

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'No se encontraron notificaciones para este usuario' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSenderByNotificationId = async (req, res) => {
  try {
      const notificationId = req.params.id;

      // Buscar la notificación por ID
      const notification = await Notification.findById(notificationId).populate('sender');

      if (!notification) {
          return res.status(404).json({ message: 'Notificación no encontrada' });
      }

      // Devolver el sender de la notificación
      res.json({ sender: notification.sender });
  } catch (error) {
      console.error('Error al obtener el sender:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
};

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

exports.getNotificationCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const count = await Notification.countDocuments({ receiver: userId });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching notification count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

