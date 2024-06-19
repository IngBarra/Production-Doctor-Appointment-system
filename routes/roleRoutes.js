const express = require('express');
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Rutas para CRUD de roles getDoctorUsers
router.post('/', roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.put('/:id',  roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
