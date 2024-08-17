import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css';
import NavBar from '../components/NavBar';

interface PokemonDetail {
    name: string;
    image: string;
    height: number;
    weight: number;
    abilities: string[];
    types: string[];
}

const PokemonDetail = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedEmail = localStorage.getItem('email');
        const savedFavorite = localStorage.getItem('favorite');
        if (savedToken) {
            setToken(savedToken);
            setIsFavorite(savedFavorite === name);
        } else {
            setError('No token found.');
            setLoading(false);
            return;
        }

        if (savedEmail) {
            setEmail(savedEmail);
        } else {
            setError('No email found.');
            setLoading(false);
            return;
        }

        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`${apiUrl}/pokemon/${name}`, {
                    params: { email },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const pokemonData = response.data;

                if (pokemonData) {
                    setPokemon({
                        name: pokemonData.name,
                        image: pokemonData.image,
                        height: pokemonData.height,
                        weight: pokemonData.weight,
                        abilities: pokemonData.abilities,
                        types: pokemonData.types,
                    });
                }
            } catch (err) {
                console.error('Error fetching Pokémon details:', err);
                setError('Error fetching Pokémon details.');
            } finally {
                setLoading(false);
            }
        };
        if (token) {
            fetchPokemon();
        }

    }, [token, name, apiUrl]);

    const handleFavorite = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email'); 
    
        if (!email) {
            console.error('No email found in localStorage');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/favorite/${encodeURIComponent(name)}`, 
            { email }, 
            {
                params: { name: encodeURIComponent(name) }, 
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            );
            const isNowFavorite = response.data.isFavorite;
            setIsFavorite(isNowFavorite);

            if (isNowFavorite) {
                localStorage.setItem('favorite', name);
            } else {
                localStorage.removeItem('favorite');
            }
            
        } catch (err) {
            console.error('Error updating favorite Pokémon:', err);
            setError('Error updating favorite Pokémon.');
        }
    };

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <div>
            <NavBar />
            <div className="pokemon-detail">
                {pokemon && (
                    <>
                        <div className="pokemon-detail-image">
                            <img src={pokemon.image} alt={pokemon.name} />
                        </div>
                        <div className="pokemon-detail-info">
                            <h1>{pokemon.name}</h1>
                            <p><strong>Height:</strong> {pokemon.height} decimetres</p>
                            <p><strong>Weight:</strong> {pokemon.weight} hectograms</p>
                            <p><strong>Abilities:</strong> {pokemon.abilities.join(', ')}</p>
                            <p><strong>Types:</strong> {pokemon.types.join(', ')}</p>
                        </div>
                        <button onClick={handleFavorite} className="favorite-button">
                            {isFavorite ? 'Es tu favorito ❤️' : 'Marcar como Favorito ❤️'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PokemonDetail;
