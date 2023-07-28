import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import API from '../../utils/api/api';
import './SignIn.scss';

export default function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, updateUser } = useContext(AppContext);



    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        API.auth.signin(email, password).then((response) => {
            // et on stock la réponse renvoyée
            const tokenReceived = response.data.token;

            if (tokenReceived) {
                updateUser({ ...user, token: tokenReceived });


            }

        }).finally(() => {
            navigate('/dashboard');

        });
    };



    return (
        <main className='signin'>

            <div className='signin-container'>

                <h2>Connectez-vous et accéder à votre tableau de bord</h2>
                <form className="signin-form" onSubmit={handleSubmit}>
                    <input
                        className="signin-form-input"
                        name="email"
                        type="email"
                        placeholder="Adresse email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        className="signin-form-input"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <button className="signin-form-button" type="submit">
                        Se connecter
                    </button>
                </form>
            </div>
        </main>
    )
}