const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/users.controller');

// Todas las rutas requieren estar logueado
router.get('/', verifyToken, getUsuarios);
router.get('/:id', verifyToken, getUsuarioById);

// Crear usuario → si querés que se registre alguien, deberías usar /auth/register en vez de acá
// router.post('/', verifyToken, createUsuario);

// Solo admin puede cambiar rol
router.put('/:id', verifyToken, updateUsuario);

// Nadie puede borrar usuarios → eliminamos la ruta
// router.delete('/:id', verifyToken, deleteUsuario);

module.exports = router;
