const axios = require('axios');
const User = require('../models/User');

module.exports = {
    handlePokemonList: async (req, res) => {
        const { offset = 0, limit = 100 } = req.query;
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

            const pokemonList = response.data.results;

            res.status(200).json({ pokemons: pokemonList });
        } catch (error) {
            console.error('Error al obtener la lista de Pokémon:', error);
            res.status(500).json({ message: 'Error al obtener la lista de Pokémon' });
        }
    },
    handlePokemonDetail: async (req, res) => {
        const { name } = req.params;

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = response.data;

            res.status(200).json({
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types.map(type => type.type.name),
                abilities: pokemonData.abilities.map(ability => ability.ability.name)
            });
        } catch (error) {
            console.error(`Error al obtener los detalles del Pokémon ${name}:`, error);
            res.status(500).json({ message: 'Error al obtener los detalles del Pokémon' });
        }
    },
    handleFavorite: async (req, res) => {
        const { email } = req.body;
        const {name} = req.query

        if (!name) {
            return res.status(400).json({ message: 'Pokémon name is required' });
        }

        try {
            const user = await User.findOneAndUpdate(
                { email },
                { favorite: name },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json({ isFavorite: user.favorite === name });
        } catch (error) {
            console.error('Error updating favorite Pokémon:', error);
            res.status(500).json({ message: 'Error al actualizar el Pokémon favorito' });
        }
    }
}
