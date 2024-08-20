const NotificationType = require('../models/NotificationType');

exports.createNotificationType = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!['registro de paciente', 'mensaje', 'carga examen de laboratorio'].includes(name)) {
      return res.status(400).json({ message: 'Tipo de notificación no válido' });
    }

    const newType = new NotificationType({ name, description });
    await newType.save();

    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllNotificationTypes = async (req, res) => {
  try {
    const types = await NotificationType.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotificationTypeById = async (req, res) => {
  try {
    const type = await NotificationType.findById(req.params.id);
    if (!type) {
      return res.status(404).json({ message: 'Tipo de notificación no encontrado' });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNotificationType = async (req, res) => {
  try {
    const type = await NotificationType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!type) {
      return res.status(404).json({ message: 'Tipo de notificación no encontrado' });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotificationType = async (req, res) => {
  try {
    const type = await NotificationType.findByIdAndDelete(req.params.id);
    if (!type) {
      return res.status(404).json({ message: 'Tipo de notificación no encontrado' });
    }
    res.status(200).json({ message: 'Tipo de notificación eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
