// familia.js
const mongoose = require('mongoose');

const familiaSchema = new mongoose.Schema({
  nombre: String,
  ApellidoP: String,
  ApellidoM: String,
  Cedula: Number,
  fechaNacimiento: Date,
  sexo: String,
  Domicilio: String,
  Telefono: Number,
  ocupacionF: String,
  EstadoCivil: String,
  
});

module.exports = mongoose.model('familiar', familiaSchema);
