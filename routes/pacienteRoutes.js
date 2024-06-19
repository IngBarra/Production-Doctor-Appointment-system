// routes.js
const express = require('express');
const familiaController = require('../controllers/familiaController');
const pacienteController = require('../controllers/PacienteController');

const router = express.Router();

// Familia routes
router.post('/familias', familiaController.createFamilia);
router.get('/familias', familiaController.getAllFamilias);
router.get('/familias/:id', familiaController.getFamiliaById);
router.put('/familias/:id', familiaController.updateFamiliaById);
router.delete('/familias/:id', familiaController.deleteFamiliaById);


// Paciente routes
router.post('/pacientes', pacienteController.createPaciente);
router.get('/pacientes', pacienteController.getAllPacientes);
router.get('/pacientes/:id', pacienteController.getPacienteById);
router.put('/pacientes/:id', pacienteController.updatePacienteById);
router.delete('/pacientes/:id', pacienteController.deletePacienteById);
router.post('/pacientes/buscar', pacienteController.buscarPaciente);

module.exports = router;
