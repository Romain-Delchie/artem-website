import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import API from '../../utils/api/api';
import './SignIn.scss';

export default function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, updateUser } = useContext(AppContext);

    useEffect(() => {
        updateUser({ token: "", email: "", firstname: "", lastname: "" });
    }, [])

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
            navigate('/dashboard')
        }).catch((error) => {

            if (error.response.status === 404) {
                alert('Cette adresse email ne correspond à aucun compte. Veuillez vérifier votre adresse email et réessayer.')
            }

            if (error.response.status === 401) {
                alert('Mot de passe incorrect. Veuillez vérifier votre mot de passe et réessayer.')
            }

        })
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
                    <Link className='forgot-link' to="/forgot-password">Mot de passe oublié ?</Link>

                    <button className="signin-form-button" type="submit">
                        Se connecter
                    </button>
                </form>
            </div>
        </main>
    )
}