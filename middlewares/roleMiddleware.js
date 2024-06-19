const Role = require('../models/role');
const User = require('../models/user'); // Asegúrate de importar el modelo User

module.exports = (requiredRole) => {
  return async (req, res, next) => {
    const username = req.user.username;

    try {
      const user = await User.findOne({ username }).populate('role');

      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      const userRole = user.role.name;

      if (userRole === requiredRole) {
        next();
      } else {
        res.status(403).json({ error: 'Acceso no autorizado para este rol' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error en la validación de roles' });
    }
  };
};
