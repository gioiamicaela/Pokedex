import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';

const CreatePokemonPage = () => {
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [abilities, setAbilities] = useState('');
    const [types, setTypes] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL; 
    const history = useHistory();
    const [error, setError] = useState('');
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedEmail = localStorage.getItem('email');
        if (savedToken) {
            setToken(savedToken);
        } else {
            setError('No token found.');
            setLoading(false);
            return;
        }
        if (savedEmail) {
            setEmail(savedEmail)
        } else {
            setError('Email not found.');
            setLoading(false);
            return;
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const abilitiesArray = abilities.split(',').map((ability) => ability.trim());
        const typesArray = types.split(',').map((type) => type.trim());

        const newPokemon = {
            name,
            height: parseInt(height),
            weight: parseInt(weight),
            abilities: abilitiesArray,
            types: typesArray,
            email
        };

        try {
            const response = await axios.post(
                `${apiUrl}/pokemonList`,
                newPokemon,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                history.push('/pokemon'); 
            } else {
                setError('Error al crear el Pokémon. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al crear el Pokémon:', error);
            setError('Ocurrió un error. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <NavBar />
            <h1 className="text-2xl font-bold mb-6">Crear un Nuevo Pokémon</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Pikachu"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                        Altura (decímetros):
                    </label>
                    <input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Ej: 4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                        Peso (hectogramos):
                    </label>
                    <input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Ej: 60"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="abilities">
                        Habilidades (separadas por comas):
                    </label>
                    <input
                        id="abilities"
                        type="text"
                        value={abilities}
                        onChange={(e) => setAbilities(e.target.value)}
                        placeholder="Ej: Static, Lightning Rod"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="types">
                        Tipos (separados por comas):
                    </label>
                    <input
                        id="types"
                        type="text"
                        value={types}
                        onChange={(e) => setTypes(e.target.value)}
                        placeholder="Ej: Electric"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Crear Pokémon
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePokemonPage;
