const { Usuario } = require('../models');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({ status: 200, data: usuarios });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener usuario por ID
const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }
        res.json({ status: 200, data: usuario });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener usuario', error: error.message });
    }
};

// Crear nuevo usuario
const createUsuario = async (req, res) => {
    const { nombre, email, edad } = req.body;
    try {
        if (!nombre || !email || !edad) {
            return res.status(400).json({ status: 400, message: 'Faltan campos obligatorios' });
        }

        const nuevoUsuario = await Usuario.create({ nombre, email, edad });
        res.status(201).json({ status: 201, data: nuevoUsuario, message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear usuario', error: error.message });
    }
};

// Editar usuario (solo rol, y solo admin)
const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }

        // Solo admin puede cambiar rol
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ status: 403, message: 'No tienes permisos para cambiar roles' });
        }

        const { rol } = req.body;
        if (!rol) {
            return res.status(400).json({ status: 400, message: 'Debe especificar un rol' });
        }

        usuario.rol = rol;
        await usuario.save();

        res.status(200).json({ status: 200, message: 'Rol actualizado correctamente', data: usuario });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar rol', error: error.message });
    }
};



// Eliminar usuario
const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }

        await usuario.destroy();

        res.status(200).json({ status: 200, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
