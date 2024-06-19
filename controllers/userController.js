const User = require('../models/user');
const user = require('../models/user');

// Crear un nuevo usuario
exports.createUserAA = async (req, res) => {
  try {
    const { nombre , apellidoP , apellidoM , Ci, Especilidad, email, Telefono, username, password, role } = req.body;
    const user = new User({nombre, apellidoP, apellidoM, Ci, Especilidad, email, Telefono, username, password, role });
    await user.save();
    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      nombre,
      apellidoP,
      apellidoM,
      Ci,
      Especilidad,
      email,
      Telefono,
      username,
      password,
      role,
    } = req.body;

    // Crea un nuevo usuario utilizando el modelo User
    const user = new User({
      nombre,
      apellidoP,
      apellidoM,
      Ci,
      Especilidad,
      email,
      Telefono,
      username,
      password,
      role,
    });

    // Guarda el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
      // Utiliza el método `find` para buscar todos los usuarios en la base de datos
      const users = await User.find().populate('role');;
  
      // Responde con la lista de usuarios en formato JSON
      res.json(users);
    } catch (error) {
      // Si se produce un error, responde con un mensaje de error y un código de estado 500 (Error interno del servidor)
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  };
  exports.getDoctors = async (req, res) => {
    try {
      // Utiliza el método `find` para buscar usuarios con el rol "doctor"
      const doctors = await User.find({ 'role.name': 'admin' });
  
      // Responde con la lista de usuarios con el rol "doctor" en formato JSON
      res.json(doctors);
    } catch (error) {
      // Si se produce un error, responde con un mensaje de error y un código de estado 500 (Error interno del servidor)
      res.status(500).json({ error: 'Error al obtener usuarios con rol "doctor"' });
    }
  };
  
  exports.getAdminUsers = async (req, res) => {
    try {
      const adminUsers = await User.aggregate([
        {
          $lookup: {
            from: 'roles', 
            localField: 'role',
            foreignField: '_id',
            as: 'roleInfo',
          },
        },
        {
          $match: {
            'roleInfo.name': 'doctor',
          },
        },
        {
          $project: {
            username: 1,
            role: {
              $arrayElemAt: ['$roleInfo', 0],
            },
          },
        },
      ]);
  
      res.json(adminUsers);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios con campo "name" igual a "admin"' });
    }
  };

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('role');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, password, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, password, role },
      { new: true }
    ).populate('role');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

////////////////LISTAR USUAURIOS
exports.listUsers = async (req, res) => {
  try {
    const users = await user.find(); // Encuentra todos los usuarios en la base de datos

    res.status(200).json(users); // Devuelve la lista de usuarios en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
  }
};
