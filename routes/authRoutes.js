const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rutas para registro e inicio de sesión
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
