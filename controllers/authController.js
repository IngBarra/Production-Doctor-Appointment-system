const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require('../models/role');

// Registro de usuarios
exports.register = async (req, res) => {
    try {
      const { nombre,
        apellidoP,
        apellidoM,
        Ci,
        Especilidad,
        email,
        Telefono, username, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({    nombre,
        apellidoP,
        apellidoM,
        Ci,
        Especilidad,
        email,
        Telefono, username, password: hashedPassword, role });
      await user.save();
  
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      console.error('Error al registrar al usuario:', error);
      res.status(500).json({ error: 'Error al registrar al usuario' });
    }
  };
  

// Inicio de sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Busca el rol del usuario por su _id
    const role = await Role.findById(user.role);

    if (!role) {
      return res.status(401).json({ error: 'Rol no encontrado' });
    }

    const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Include the _id, role name, and full name in the response
    res.json({ 
      token, 
      _id: user._id, 
      role: role.name, 
      nombre: user.nombre, 
      apellidoP: user.apellidoP, 
      apellidoM: user.apellidoM 
    });
    console.log('_id of the user:', user._id);

  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error en la autenticación' });
  }
};