import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL; 
    const history = useHistory(); 
    
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
                console.error('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${apiUrl}/signup`, {
                email,
                password,
            });
console.log(response.data)
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
            } else {
                console.error('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
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
        </div>
    );
};

export default LoginPage;
