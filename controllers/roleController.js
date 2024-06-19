const Role = require('../models/role');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).json({ message: 'Rol creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  const roleId = req.params.id;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};

// Actualizar un rol por ID
exports.updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { name } = req.body;

  try {
    const role = await Role.findByIdAndUpdate(
      roleId,
      { name },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// Eliminar un rol por ID
exports.deleteRole = async (req, res) => {
  const roleId = req.params.id;

  try {
    const role = await Role.findByIdAndRemove(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json({ message: 'Rol eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};
