const express = require('express');
const publicRouter = express.Router();

const { handleLogin, handleRegister } = require('../controllers/publicController');

publicRouter.post('/signin', handleLogin);
publicRouter.post('/signup', handleRegister);

module.exports = publicRouter;
