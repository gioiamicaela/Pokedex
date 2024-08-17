import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import NavBar from '../components/NavBar';
import { useHistory } from 'react-router-dom';
import './Login.css'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;
    const history = useHistory();
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

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

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${apiUrl}/signup`, {
                email,
                password,
            });
            if (response.status === 201) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                setMessage('Debe iniciar sesión')
            } else {
                setError('Error en la autenticación')
            }
        } catch (error: unknown) {
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
        <div className="container">
          <div className="form-container">
            <h1 className="mb-6 text-xl">Iniciar Sesión</h1>
            <p className="mb-6">Ingrese su email y contraseña</p>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-primary"
              onClick={handleSignIn}
            >
              Iniciar sesión
            </button>
            <button
              className="bg-secondary"
              onClick={handleSignUp}
            >
              Registrarse
            </button>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
          </div>
        </div>
      );
    };

export default LoginPage;
