// familiaController.js
const Familia = require('../models/Familiar');

// Create a new Familia
const createFamilia = async (req, res) => {
  try {
    const nuevaFamilia = new Familia(req.body);
    const familia = await nuevaFamilia.save();
    res.status(201).json(familia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Familias
const getAllFamilias = async (req, res) => {
  try {
    const familias = await Familia.find();
    res.json(familias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Familia by ID
const getFamiliaById = async (req, res) => {
  try {
    const familia = await Familia.findById(req.params.id);
    res.json(familia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Familia by ID
const updateFamiliaById = async (req, res) => {
  try {
    const familia = await Familia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(familia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Familia by ID
const deleteFamiliaById = async (req, res) => {
  try {
    const familia = await Familia.findByIdAndRemove(req.params.id);
    res.json(familia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFamilia,
  getAllFamilias,
  getFamiliaById,
  updateFamiliaById,
  deleteFamiliaById,
};
