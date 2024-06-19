const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  apellidoP: String,
  apellidoM: String,
  Ci: String,
  Especilidad: String,
  email: String,
  Telefono: String,
  username: {
    type: String,
    required: true,
    unique: true, // Esto asegura que el campo sea único
  },
  password: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  // Agregando los campos que faltaban
  profilePicture: String, // Ruta de la imagen de perfil
  coverPicture: String, // Ruta de la imagen de portada
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Lista de seguidores (IDs de usuarios)
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Lista de seguidos (IDs de usuarios)
  isAdmin: Boolean, // Indica si el usuario es administrador
  desc: String, // Descripción del usuario
  city: String, // Ciudad del usuario
  from: String, // Lugar de origen del usuario
  relationship: Number, // Nivel de relación (1, 2 o 3)
});

module.exports = mongoose.model('User', userSchema);

