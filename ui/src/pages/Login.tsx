import React, { useState, useEffect } from 'react';
import axios, {AxiosError} from 'axios';
import NavBar from '../components/NavBar';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL; 
    const history = useHistory(); 
    const [error, setError] = useState("")
    
    const handleSignIn = async () => {
       
        try {
            const response = await axios.post(`${apiUrl}/signin`, {
                email,
                password,
            });

            if (response.status === 200) {
                const { token, favorite } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('favorite', JSON.stringify(favorite)); 
                history.push('/pokemon'); 
            } else {
                setError('Error en la autenticación. Por favor, verifica tus credenciales.');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message); // Mostrar mensaje del backend
                } else if (error.request) {
                    setError('No se recibió respuesta del servidor. Inténtalo de nuevo.');
                } else {
                    setError('Ocurrió un error en la solicitud. Inténtalo de nuevo.');
                }
            } else {
                setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
            }
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${apiUrl}/signup`, {
                email,
                password,
            });
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
            } else {
                setError('Error en la autenticación')
            }
        }  catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message);
                } else if (error.request) {
                    setError('No se recibió respuesta del servidor. Inténtalo de nuevo.');
                } else {
                    setError('Ocurrió un error en la solicitud. Inténtalo de nuevo.');
                }
            } else {
                setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-background">
              <NavBar />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                <h1 className="mb-6 text-xl">Iniciar Sesión</h1>
                <p className="mb-6">Ingrese su nombre de usuario y contraseña</p>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="mb-4 p-2 border rounded w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="mb-4 p-2 border rounded w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="mt-4 bg-primary text-white p-2 rounded w-full"
                    onClick={handleSignIn}
                >
                    Iniciar sesión
                </button>
                <button
                    className="mt-2 bg-secondary text-white p-2 rounded w-full"
                    onClick={handleSignUp}
                >
                    Registrarse
                </button>
            </div>
            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
};

export default LoginPage;
