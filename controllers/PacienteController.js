// pacienteController.js
const Paciente = require('../models/Paciente');

// Create a new Paciente
const createPaciente = async (req, res) => {
  try {
    // Check if a patient with the same CiP or nroHistorial already exists
    const existingPaciente = await Paciente.findOne({
      $or: [{ nroHistorial: req.body.nroHistorial }],
    });

    if (existingPaciente) {
      return res.status(400).json({ error: 'Paciente con el mismo Ci o nroHistorial ya existe.' });
    }

    const nuevoPaciente = new Paciente(req.body);
    const paciente = await nuevoPaciente.save();
    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Pacientes
const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find().populate('familia');
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Paciente by ID
const getPacienteById = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id).populate('familia');
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Paciente by ID
const updatePacienteById = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Paciente by ID
const deletePacienteById = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndRemove(req.params.id);
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar Paciente por criterios
const buscarPaciente = async (req, res) => {
  try {
    const { nroHistorial, nroSus, ApellidoPP, ApellidoMP, CiP } = req.body;

    const query = {};

    if (nroHistorial) {
      query.nroHistorial = nroHistorial;
    }

    if (nroSus) {
      query.nroSus = nroSus;
    }

    if (ApellidoPP) {
      query.ApellidoPP = { $regex: new RegExp(ApellidoPP, 'i') };
    }

    if (ApellidoMP) {
      query.ApellidoMP = { $regex: new RegExp(ApellidoMP, 'i') };
    }

    if (CiP) {
      query.CiP = CiP;
    }

    const pacientesEncontrados = await Paciente.find(query).populate('familia');

    res.json(pacientesEncontrados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePacienteById,
  deletePacienteById,
  buscarPaciente,
};
