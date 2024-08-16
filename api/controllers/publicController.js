const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
    handleLogin: async (req, res) => {
        const { email, password } = req.body;
        const SECRET_KEY = process.env.JWT_SECRET
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            const favorite = user?.favorite ? user?.favorite : null

            res.json({ token, favorite });
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).json({ message: 'Error en el inicio de sesión' });
        }
    },
    handleRegister: async (req, res) => {
        const { email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error('Error en el registro de usuario:', error);
            res.status(500).json({ message: 'Error en el registro de usuario' });
        }
    },
    handlePokemonList: async (req, res) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado' });
        }

        try {
            const verified = jwt.verify(token, SECRET_KEY);
            res.json({ message: 'Datos protegidos', user: verified });
        } catch (err) {
            res.status(401).json({ message: 'Token no válido' });
        }
    },
}
