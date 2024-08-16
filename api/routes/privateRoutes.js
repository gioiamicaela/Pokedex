const express = require('express');
const privateRouter = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");

const {  handlePokemonList, handlePokemonDetail, handleFavorite } = require('../controllers/privateController');

privateRouter.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

privateRouter.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Token no válido o ausente. Por favor, proporciona un token válido.' });
    }
    next(err);
  });

privateRouter.get('/pokemonList', handlePokemonList);
privateRouter.get('/pokemon/:name', handlePokemonDetail);
privateRouter.post('/favorite/:name', handleFavorite);

module.exports = privateRouter;
