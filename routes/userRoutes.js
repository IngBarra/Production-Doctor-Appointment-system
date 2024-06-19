const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userMiddlerware = require('../middlewares/usermiddlerware');
const UserController = require('../controllers/userController');
const router = express.Router();


// Middleware de autenticación JWT para rutas de usuarios getDoctorUsers
//router.use(authMiddleware);

// Rutas para CRUD de usuarios

router.get('/listar', UserController.listUsers);

router.get('/', userController.getAllUsers); 
router.get('/doctors', authMiddleware, userMiddlerware('admin'), userController.getAdminUsers);
router.get('/:id', userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id',  userController.deleteUser);

module.exports = router;
