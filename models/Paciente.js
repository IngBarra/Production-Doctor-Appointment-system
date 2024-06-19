// paciente.js
const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  // Reference to Familia Schema
  familia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Familiar',
  },
  // Datos del paciente
  nroHistorial: Number,
  nroSus: Number,
  nombreP: String,
  ApellidoPP: String,
  ApellidoMP: String,
  CiP: String,
  fechaNacimientoP: Date,
  sexoP: String,
  idiomaP: String,
  ocupacionP: String,
  direccionP: String,
  estadoCivilP: String,
  escolaridadP: String,
  grupoSanguineoP: String,
  factorRHP: String,
  otroP: String,// Exámenes de laboratorio
  laboratorio: {
    coproparasitologicoSimple: Boolean,
    coproparasitologicoSeriado: Boolean,
    creatininaSerica: Boolean,
    examenGeneralOrina: Boolean,
    glicemia: Boolean,
    haiChagas: Boolean,
    hemoglobinaHematocrito: Boolean,
    hemogramaCompleto: Boolean,
    pruebaRapidaVIH: Boolean,
    rprSifilisVdrl: Boolean,
  },
  // Resultado Clínico
  resultadoClinico: {
    tipo: String, // Puede ser pdf, documento, foto, etc.
    archivo: String, // Ruta o nombre del archivo
  },
  // Examen Clínico de Emergencia
  examenClinicoEmergencia: {
    realizado: Boolean,
    notificacionEnviada: Boolean,
  },
  // Nombre del médico
  nombreMedico: String,
});

module.exports = mongoose.model('Paciente', pacienteSchema);

