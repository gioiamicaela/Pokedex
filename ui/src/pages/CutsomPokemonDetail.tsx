import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './PokemonDetail.css';
import NavBar from '../components/NavBar';

const CustomPokemonDetail = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedPokemon, setEditedPokemon] = useState<any>(null);
    const [email, setEmail] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedEmail = localStorage.getItem('email');
        const savedFavorite = localStorage.getItem('favorite');
        if (savedToken) {
            setToken(savedToken);
            setIsFavorite(savedFavorite === id);
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

        const fetchCustomPokemon = async () => {
            try {
                const response = await axios.get(`${apiUrl}/customPokemon/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPokemon(response.data);
            } catch (err) {
                console.error('Error fetching custom Pokémon details:', err);
                setError('Error fetching custom Pokémon details.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCustomPokemon();
        }
    }, [id, token]);

    const handleFavorite = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (!email) {
            console.error('No email found in localStorage');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/favorite/${encodeURIComponent(id)}`,
                { email },
                {
                    params: { name: encodeURIComponent(id) },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const isNowFavorite = response.data.isFavorite;
            setIsFavorite(isNowFavorite);

            if (isNowFavorite) {
                localStorage.setItem('favorite', id);
            } else {
                console.log("hola")
                localStorage.removeItem('favorite');
            }

        } catch (err) {
            console.error('Error updating favorite Pokémon:', err);
            setError('Error updating favorite Pokémon.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/customPokemon/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            history.push('/pokemon');
        } catch (err) {
            console.error('Error deleting Pokémon:', err);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPokemon((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`${apiUrl}/customPokemon/${id}`, editedPokemon, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setPokemon(editedPokemon);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating Pokémon:', err);
        }
    };

    const handleCancel = () => {
        setEditedPokemon(pokemon); 
        setIsEditing(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <NavBar />
            <h1>Pokémon Custom Detail</h1>
            <div>
                <h2>{pokemon?.name}</h2>
                <img src={pokemon?.image} alt={pokemon?.name} />

                {isEditing ? (
                    <div>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="name"
                                value={editedPokemon?.name !== undefined ? editedPokemon.name : pokemon?.name || ''}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Altura:
                            <input
                                type="number"
                                name="height"
                                value={editedPokemon?.height !== undefined ? editedPokemon.height : pokemon?.height || ''}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Peso:
                            <input
                                type="number"
                                name="weight"
                                value={editedPokemon?.weight !== undefined ? editedPokemon.weight : pokemon?.weight || ''}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Habilidades:
                            <input
                                type="text"
                                name="abilities"
                                value={editedPokemon?.abilities?.length ? editedPokemon.abilities?.join(', ') : pokemon?.abilities?.join(', ') || ''}
                                onChange={(e) =>
                                    handleEditChange({
                                        target: {
                                            name: 'abilities',
                                            value: e.target.value.split(',').map((a) => a.trim()),
                                        },
                                    } as any)
                                }
                            />
                        </label>
                        <label>
                            Tipos:
                            <input
                                type="text"
                                name="types"
                                value={editedPokemon?.types?.length ? editedPokemon.types?.join(', ') : pokemon?.types?.join(', ') || ''}
                                onChange={(e) =>
                                    handleEditChange({
                                        target: {
                                            name: 'types',
                                            value: e.target.value.split(',').map((t) => t.trim()),
                                        },
                                    } as any)
                                }
                            />
                        </label>
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={handleCancel}>Cancelar</button>
                    </div>
                ) : (
                    <div>
                        <p>Altura: {pokemon?.height}</p>
                        <p>Peso: {pokemon?.weight}</p>
                        <p>Habilidades: {pokemon?.abilities?.join(', ')}</p>
                        <p>Tipos: {pokemon?.types?.join(', ')}</p>
                        <button onClick={() => setIsEditing(true)}>Editar</button>
                    </div>
                )}
            </div>

            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default CustomPokemonDetail;