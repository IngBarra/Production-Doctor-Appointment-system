const NotificationType = require('../models/NotificationType');

// Middleware para crear un nuevo tipo de notificación
exports.createNotificationType = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validar que el nombre sea uno de los valores permitidos
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

// Middleware para obtener todos los tipos de notificaciones
exports.getAllNotificationTypes = async (req, res) => {
  try {
    const types = await NotificationType.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware para obtener un tipo de notificación por ID
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

// Middleware para actualizar un tipo de notificación
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

// Middleware para eliminar un tipo de notificación
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
