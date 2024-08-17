import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

interface Pokemon {
    name: string;
    url: string;
    image: string;
}

const Pokemon = () => {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [customPokemons, setCustomPokemons] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pokemonsPerPage] = useState<number>(20);
    const [offset, setOffset] = useState<number>(0);
    const [pageGroup, setPageGroup] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [email, setEmail] = useState("")

    const fetchCustomPokemons = async () => {
        if (!token || !email) return;
        try {
            const response = await axios.post(`${apiUrl}/customPokemons`, { email }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setCustomPokemons(response.data.customPokemons);
        } catch (err) {
            setError('Error fetching custom Pokémon.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPokemons = async (offset: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/pokemonList?offset=${offset}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const pokemonList = response.data.pokemons;

            const detailedPokemons = await Promise.all(pokemonList.map(async (pokemon: { url: string }) => {
                const pokemonResponse = await axios.get(pokemon.url);
                const pokemonData = pokemonResponse.data;

                return {
                    name: pokemonData.name,
                    url: pokemon.url,
                    image: pokemonData.sprites.front_default,
                };
            }));

            setPokemons(prevPokemons => [...prevPokemons, ...detailedPokemons]);
        } catch (err) {
            console.error('Error fetching Pokémon:', err);
            setError('Error fetching Pokémon.');
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        if (token) {
            fetchCustomPokemons();
            fetchPokemons(offset);
        }
    }, [token, offset]);

    useEffect(() => {
        if (currentPage * pokemonsPerPage > pokemons.length) {
            const newOffset = offset + 100;
            setOffset(newOffset);
        }
    }, [currentPage]);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const totalPages = Math.ceil((pokemons.length + customPokemons.length) / pokemonsPerPage); 
    const maxPageGroup = Math.ceil(totalPages / 5);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const nextPageGroup = () => {
        if (pageGroup < maxPageGroup - 1) {
            setPageGroup(pageGroup + 1);
            setCurrentPage((pageGroup + 1) * 5 + 1);
        }
    };

    const prevPageGroup = () => {
        if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
            setCurrentPage(pageGroup * 5);
        }
    };

    const filteredPokemons = [...customPokemons, ...pokemons].filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <NavBar/>
            <h1>Pokémon List</h1>
            <SearchBar query={searchQuery} onSearch={setSearchQuery} />
            <Link to="/createPokemon">Crear tu Pokemon</Link>
            <div className="pokemon-grid">
                {currentPokemons.map((pokemon, index )=> (
                     <div key={`${pokemon.name}-${index}`} className="pokemon-item">
                     <Link to={`/pokemon/${pokemon.name}`}>
                         <img src={pokemon.image} alt={pokemon.name} />
                     </Link>
                     <span>{pokemon.name}</span>
                 </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageGroup={pageGroup}
                onPageChange={paginate}
                onPrevGroup={prevPageGroup}
                onNextGroup={nextPageGroup}
            />
        </div>
    );
};

export default Pokemon;
